import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { PaginationDto } from '@/common';

@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Post()
  create(@Body() createRolDto: CreateRolDto) {
    return this.rolService.create(createRolDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.rolService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRolDto: UpdateRolDto) {
    return this.rolService.update(id, updateRolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolService.remove(id);
  }
}

