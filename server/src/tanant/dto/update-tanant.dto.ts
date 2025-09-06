import { PartialType } from '@nestjs/mapped-types';
import { CreateTanantDto } from './create-tanant.dto';

export class UpdateTanantDto extends PartialType(CreateTanantDto) {}
