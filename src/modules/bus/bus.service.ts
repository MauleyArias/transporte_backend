import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { PaginationDto } from '@/common';

@Injectable()
export class BusService {

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(createBusDto: CreateBusDto) {
    return await this.prisma.bus.create({
      data: {
        ...createBusDto
      }
    });
    }

    async findAll(paginationDto: PaginationDto) {
      const { page = 1, limit = 10 } = paginationDto;
      const totalPages = await this.prisma.bus.count({
        // where: {  },
      });
      const lastPage = Math.ceil(totalPages / limit);
  
      return {
        data: await this.prisma.bus.findMany({
          skip: (page - 1) * limit,
          take: limit,
          // where: { activo: true },
        }),
        meta: { total: totalPages, page, lastPage },
      };
    }

    async findOne(id: string) {
      const bus = await this.prisma.bus.findUnique({
        where: { id },
      });
  
      if (!bus) {
        throw new NotFoundException(`Bus with id #${id} not found`);
      }
  
      return bus;
    }

  async update(id: string, updateBusDto: UpdateBusDto) {
    await this.findOne(id);

    return this.prisma.bus.update({
      where: { id },
      data: updateBusDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.bus.update({
      where: { id },
      data: {
        // activo: false,
      },
    });
  }
}
