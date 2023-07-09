import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkerEntity } from 'src/common/entities/worker.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkerService {
  constructor(
    @InjectRepository(WorkerEntity)
    private workderRepo: Repository<WorkerEntity>,
  ) {}

  async findAll() {
    return this.workderRepo.find();
  }
}
