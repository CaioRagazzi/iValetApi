import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyService } from 'src/company/company.service';
import { CustomerService } from 'src/customer/customer.service';
import { MonthlyPricesService } from 'src/monthlyPrices/monthlyPrices.service';
import { Repository } from 'typeorm';
import { MonthlyCustomerAnonymousCreateDto } from './dto/monthlyCustomerAnonymousCreate.dto';
import { MonthlyCustomerCreateDto } from './dto/monthlyCustomerCreate.dto';
import { MonthlyCustomer } from './monthlyCustomer.entity';

@Injectable()
export class MonthlyCustomerService {
    constructor(
        @InjectRepository(MonthlyCustomer)
        private monthlyCustomerRepository: Repository<MonthlyCustomer>,
        private companyService: CompanyService,
        private monthlyPriceService: MonthlyPricesService,
        private customerService: CustomerService,
      ) {}


    async getByCompanyId(companyId: number): Promise<MonthlyCustomer[]>{
        const company = await this.companyService.findOneById(companyId);

        const monthlyCustomers = await this.monthlyCustomerRepository.find({ where: { company } })

        return monthlyCustomers;
    }

    async GetByCompanyMonthlyCustomerPlate(companyId: number, monthlyCustomerPlate: string): Promise<MonthlyCustomer[]>{
        const company = await this.companyService.findOneById(companyId);
        const monthlyCustomers = await this.monthlyCustomerRepository.find({ where: { company, plateAnonymousCustomer:monthlyCustomerPlate } })

        return monthlyCustomers;
    }

    async createAnonymousMonthlyCustomer(monthlyCustomer: MonthlyCustomerAnonymousCreateDto): Promise<MonthlyCustomer>{
        const monthlyCustomerToAdd = new MonthlyCustomer();

        const company = await this.companyService.findOneById(monthlyCustomer.companyId);
        
        const price = await this.monthlyPriceService.getById(monthlyCustomer.priceId);

        monthlyCustomerToAdd.nameAnonymousCustomer = monthlyCustomer.name;
        monthlyCustomerToAdd.emailAnonymousCustomer = monthlyCustomer.email;
        monthlyCustomerToAdd.telefoneAnonymousCustomer = monthlyCustomer.telefone;
        monthlyCustomerToAdd.marcaAnonymousCustomer = monthlyCustomer.marca;
        monthlyCustomerToAdd.modeloAnonymousCustomer = monthlyCustomer.modelo;
        monthlyCustomerToAdd.plateAnonymousCustomer = monthlyCustomer.placa;
        monthlyCustomerToAdd.company = company;
        monthlyCustomerToAdd.price = price[0];

        const monthlyCustomerCreated = await this.monthlyCustomerRepository.save(monthlyCustomerToAdd);

        return monthlyCustomerCreated;
    }

    async createMonthlyCustomer(monthlyCustomerDto: MonthlyCustomerCreateDto): Promise<MonthlyCustomer>{
        const monthlyCustomerToAdd = new MonthlyCustomer();

        const company = await this.companyService.findOneById(monthlyCustomerDto.companyId);
        const price = await this.monthlyPriceService.getById(monthlyCustomerDto.priceId);
        const customer = await this.customerService.findById(monthlyCustomerDto.customerId);

        monthlyCustomerToAdd.company = company;
        monthlyCustomerToAdd.price = price[0];
        monthlyCustomerToAdd.customer = customer

        this.monthlyCustomerRepository.save(monthlyCustomerToAdd);

        return monthlyCustomerToAdd;
    }

}