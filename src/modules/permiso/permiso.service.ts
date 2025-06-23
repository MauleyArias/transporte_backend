import { PaginationDto } from '@/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PermisoService {

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const totalPages = await this.prisma.permiso.count({
      where: { activo: true },
    });
    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: await this.prisma.permiso.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { activo: true },
      }),
      meta: { total: totalPages, page, lastPage },
    };
  }
}
