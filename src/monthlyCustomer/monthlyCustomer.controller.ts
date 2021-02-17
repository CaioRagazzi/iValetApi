import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MonthlyCustomerAnonymousCreateDto } from './dto/monthlyCustomerAnonymousCreate.dto';
import { MonthlyCustomerCreateDto } from './dto/monthlyCustomerCreate.dto';
import { MonthlyCustomer } from './monthlyCustomer.entity';
import { MonthlyCustomerService } from './monthlyCustomer.service';

@Controller('MonthlyCustomer')
@UseGuards(AuthGuard('jwt'))
export class MonthlyCustomerController {
    constructor(
        private monthlyCustomerService: MonthlyCustomerService
    ) { }

    @Get(':companyId')
    async GetByCompanyId(@Param('companyId') companyId: number,): Promise<MonthlyCustomer[]> {
        try {
            const monthlyCustomers = this.monthlyCustomerService.getByCompanyId(companyId);

            return monthlyCustomers;
        } catch (error) {
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('Anonymous')
    async createAnonymous(@Body() monthlyCustomerAnonymous: MonthlyCustomerAnonymousCreateDto ): Promise<MonthlyCustomer>{
        try {            
            const monthlyCustomer = await this.monthlyCustomerService.createAnonymousMonthlyCustomer(monthlyCustomerAnonymous);   

            return monthlyCustomer;
        } catch (error) {
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async create(@Body() monthlyCustomer: MonthlyCustomerCreateDto ): Promise<MonthlyCustomer>{
        try {
            const monthlyCustomerResponse = await this.monthlyCustomerService.createMonthlyCustomer(monthlyCustomer);   

            return monthlyCustomerResponse;
        } catch (error) {
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('company/:companyId/monthlyCustomer/:monthlyCustomerPlate')
    async GetByCompanyMonthlyCustomerId(@Param('companyId') companyId: number,@Param('monthlyCustomerPlate') monthlyCustomerPlate: string,): Promise<MonthlyCustomer[]> {
        try {
            console.log(companyId);
            console.log(monthlyCustomerPlate);
            
            const monthlyCustomers = this.monthlyCustomerService.GetByCompanyMonthlyCustomerPlate(companyId, monthlyCustomerPlate);

            return monthlyCustomers;
        } catch (error) {
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }
}