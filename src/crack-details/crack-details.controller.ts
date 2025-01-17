import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CrackDetailsService } from './crack-details.service';
import { CreateCrackDetailDto } from './dto/create-crack-detail.dto';
import { UpdateCrackDetailDto } from './dto/update-crack-detail.dto';

@Controller('crack-details')
export class CrackDetailsController {
  constructor(private readonly crackDetailsService: CrackDetailsService) {}

  @Post()
  create(@Body() createCrackDetailDto: CreateCrackDetailDto) {
    return this.crackDetailsService.create(createCrackDetailDto);
  }

  @Get()
  findAll() {
    return this.crackDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crackDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCrackDetailDto: UpdateCrackDetailDto,
  ) {
    return this.crackDetailsService.update(+id, updateCrackDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crackDetailsService.remove(+id);
  }
}
