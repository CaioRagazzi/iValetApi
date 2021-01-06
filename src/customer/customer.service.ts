import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { InsertResult, Repository } from "typeorm";
import { Customer } from "./customer.entity";

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
      ) {}

    async createCustomer(customer: Customer): Promise<InsertResult>{
    const customerInst = new Customer();
    customerInst.name = customer.name;

    return this.customerRepository.insert(customerInst);
    }

    async findByPlate(plate: string): Promise<Customer>{
      const customer = await this.customerRepository.findOne({ where: { placa: plate } })

      return customer;
    }

    async findById(customerId: number): Promise<Customer>{
      const customer = await this.customerRepository.findOne(customerId);

      if (!customer) {
        throw new Error(`Customer with id ${customerId} does not exists!`);
      }

      return customer;
    }
}