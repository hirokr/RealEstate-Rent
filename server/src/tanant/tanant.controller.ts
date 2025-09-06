import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TanantService } from './tanant.service';
import { CreateTanantDto } from './dto/create-tanant.dto';
import { UpdateTanantDto } from './dto/update-tanant.dto';

@Controller('tanant')
export class TanantController {
  constructor(private readonly tanantService: TanantService) {}

  @Post()
  create(@Body() createTanantDto: CreateTanantDto) {
    return this.tanantService.create(createTanantDto);
  }

  @Get()
  findAll() {
    return this.tanantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tanantService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTanantDto: UpdateTanantDto) {
    return this.tanantService.update(+id, updateTanantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tanantService.remove(+id);
  }
}
