import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BalanceService } from './balance.service';

@Controller('balance')
@ApiTags('Balance')
export class BalanceController {
  constructor(private balanceService: BalanceService) {}
}
