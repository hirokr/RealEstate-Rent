import { Test, TestingModule } from '@nestjs/testing';
import { TanantController } from './tanant.controller';
import { TanantService } from './tanant.service';

describe('TanantController', () => {
  let controller: TanantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TanantController],
      providers: [TanantService],
    }).compile();

    controller = module.get<TanantController>(TanantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
