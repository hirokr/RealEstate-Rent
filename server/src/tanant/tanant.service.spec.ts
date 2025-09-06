import { Test, TestingModule } from '@nestjs/testing';
import { TanantService } from './tanant.service';

describe('TanantService', () => {
  let service: TanantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TanantService],
    }).compile();

    service = module.get<TanantService>(TanantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
