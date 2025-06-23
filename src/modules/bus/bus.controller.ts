import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BusService } from './bus.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { PaginationDto } from '@/common';

@Controller('bus')
export class BusController {
  constructor(private readonly busService: BusService) {}

  @Post()
  create(@Body() createBusDto: CreateBusDto) {
    return this.busService.create(createBusDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.busService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.busService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusDto: UpdateBusDto) {
    return this.busService.update(id, updateBusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.busService.remove(id);
  }
}

