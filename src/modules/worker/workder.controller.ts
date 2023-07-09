import { Controller, Get } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('worker')
@ApiTags('Worker')
export class WorkerController {
  constructor(private workerService: WorkerService) {}

  @Get('')
  async findAll() {
    return this.workerService.findAll();
  }
}
