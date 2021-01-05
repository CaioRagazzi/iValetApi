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
}