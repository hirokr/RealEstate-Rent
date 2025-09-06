import { Injectable } from '@nestjs/common';
import { CreateTanantDto } from './dto/create-tanant.dto';
import { UpdateTanantDto } from './dto/update-tanant.dto';

@Injectable()
export class TanantService {
  create(createTanantDto: CreateTanantDto) {
    return 'This action adds a new tanant';
  }

  findAll() {
    return `This action returns all tanant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tanant`;
  }

  update(id: number, updateTanantDto: UpdateTanantDto) {
    return `This action updates a #${id} tanant`;
  }

  remove(id: number) {
    return `This action removes a #${id} tanant`;
  }
}
