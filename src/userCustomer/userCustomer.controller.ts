import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserCompanyInsertResponseDto } from 'src/userCompany/dto/userInsertResponse.dto';
import { UserCustomerInsertRequestDto } from './dto/userCustomerInsertRequest.dto';
import { UserCustomerInsertResponseDto } from './dto/userCustomerInsertResponse.dto';
import { UserCustomerService } from './userCustomer.service';

@Controller('usercustomer')
export class UserCustomerController {
  constructor(private userCustomerService: UserCustomerService) {}

  @Post('createUserCustomer')
  async create(
    @Body() user: UserCustomerInsertRequestDto,
  ): Promise<UserCustomerInsertResponseDto> {
    try {
      const userCreated = await this.userCustomerService.createUserCustomer(user);
      const userDtoResponse = new UserCustomerInsertResponseDto();
      userDtoResponse.email = userCreated.email;
      userDtoResponse.name = userCreated.name;
      userDtoResponse.perfil = userCreated.perfil;

      return userDtoResponse;
    } catch (error) {
      console.log(error);
      
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}