import { Controller, Get, HttpException, HttpStatus, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CustomerService } from "./customer.service";

@Controller('customer')
export class CustomerController {
    constructor(
        private customerService: CustomerService,
      ) {}

    @UseGuards(AuthGuard('jwt'))
    @Get(':plate')
    async GetByPlate(@Param('plate') plate: string): Promise<any> {
        try {
        const customer = await this.customerService.findByPlate(plate);

        return customer;
        } catch (error) {
        if (error.sqlMessage === 'User not found') {
            throw new HttpException(error.sqlMessage, HttpStatus.NO_CONTENT);
        } else {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
        }
    }
}