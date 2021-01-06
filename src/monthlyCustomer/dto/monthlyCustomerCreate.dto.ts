import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class MonthlyCustomerCreateDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    customerId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    companyId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    priceId: number;
}