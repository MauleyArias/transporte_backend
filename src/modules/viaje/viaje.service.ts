import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateViajeDto } from './dto/create-viaje.dto';
import { UpdateViajeDto } from './dto/update-viaje.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { PaginationDto } from '@/common';
import { ViajeEntity } from './entities/viaje.entity';

@Injectable()
export class ViajeService {

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(createViajeDto: CreateViajeDto) {
    return await this.prisma.viaje.create({
      data: {
        ...createViajeDto
      }
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const totalPages = await this.prisma.viaje.count({
      // where: {  },
    });
    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: await this.prisma.viaje.findMany({
        skip: (page - 1) * limit,
        take: limit,
        // where: { activo: true },
        select: ViajeEntity,
      }),
      meta: { total: totalPages, page, lastPage },
    };
  }

  async findOne(id: string) {
    const viaje = await this.prisma.viaje.findUnique({
      where: { id },
      select: ViajeEntity,
    });

    if (!viaje) {
      throw new NotFoundException(`Viaje with id #${id} not found`);
    }

    return viaje;
  }

  async update(id: string, updateViajeDto: UpdateViajeDto) {
    await this.findOne(id);

    return this.prisma.viaje.update({
      where: { id },
      data: updateViajeDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.viaje.update({
      where: { id },
      data: {
        // activo: false,
      },
    });
  }
}
