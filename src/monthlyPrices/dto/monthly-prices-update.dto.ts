import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class MonthlyPricesUpdateDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  price: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
}
