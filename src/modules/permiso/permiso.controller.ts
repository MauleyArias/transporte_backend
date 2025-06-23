import { Controller, Get, Query } from '@nestjs/common';
import { PermisoService } from './permiso.service';
import { PaginationDto } from '@/common';

@Controller('permiso')
export class PermisoController {
  constructor(private readonly permisoService: PermisoService) {}


  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.permisoService.findAll(paginationDto);
  }
}
