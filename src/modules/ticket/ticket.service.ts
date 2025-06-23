import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { PaginationDto } from '@/common';
import { TicketEntity } from './entities/ticket.entity';

@Injectable()
export class TicketService {

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(createTicketDto: CreateTicketDto) {
    return await this.prisma.ticket.create({
      data: {
        ...createTicketDto
      }
    });
    }

    async findAll(paginationDto: PaginationDto) {
      const { page = 1, limit = 10 } = paginationDto;
      const totalPages = await this.prisma.ticket.count({
        // where: {  },
      });
      const lastPage = Math.ceil(totalPages / limit);
  
      return {
        data: await this.prisma.ticket.findMany({
          skip: (page - 1) * limit,
          take: limit,
          // where: { activo: true },
          select: TicketEntity
        }),
        meta: { total: totalPages, page, lastPage },
      };
    }

    async findOne(id: string) {
      const ticket = await this.prisma.ticket.findUnique({
        where: { id },
      });
  
      if (!ticket) {
        throw new NotFoundException(`Ticket with id #${id} not found`);
      }
  
      return ticket;
    }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    await this.findOne(id);

    return this.prisma.ticket.update({
      where: { id },
      data: updateTicketDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.ticket.update({
      where: { id },
      data: {
        // activo: false,
      },
    });
  }
}
