import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from 'src/company/company.module';
import { CustomerModule } from 'src/customer/customer.module';
import { MonthlyPricesModule } from 'src/monthlyPrices/monthlyPrices.module';
import { MonthlyCustomerController } from './monthlyCustomer.controller';
import { MonthlyCustomer } from './monthlyCustomer.entity';
import { MonthlyCustomerService } from './monthlyCustomer.service';

@Module({
  imports: [TypeOrmModule.forFeature([MonthlyCustomer]), CompanyModule, MonthlyPricesModule, CustomerModule],
  controllers: [MonthlyCustomerController],
  providers: [MonthlyCustomerService],
  exports: [],
})
export class MonthlyCustomerModule {}
