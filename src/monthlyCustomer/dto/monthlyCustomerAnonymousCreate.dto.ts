import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class MonthlyCustomerAnonymousCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    placa: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    telefone: string;

    @ApiProperty()
    @IsString()
    marca: string;

    @ApiProperty()
    @IsString()
    modelo: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    companyId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    priceId: number;
}