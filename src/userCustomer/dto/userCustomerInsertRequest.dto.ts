import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsString,
    MinLength,
  } from 'class-validator';
  import { Perfil } from 'src/perfil/perfil.entity';
  
  export class UserCustomerInsertRequestDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @MinLength(6)
    password: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    plate: string;
  
    @IsNumber()
    @IsNotEmpty()
    perfil: Perfil;
  }
  