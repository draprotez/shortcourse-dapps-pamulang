import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { GetEventsDto } from './dto/get-events.dto';

@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}
  
   // GET /blockchain/value
  @Get("value")
  async getValue() {
    return this.blockchainService.getLatestValue();
  }

  // GET /blockchain/events
  @Get('events')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getEvents(@Query() query: GetEventsDto) {

    const from = query.fromBlock ?? 50605638;
    const to = query.toBlock ?? 50606638;

    return await this.blockchainService.getValueUpdatedEvents(from, to);
  }
}
