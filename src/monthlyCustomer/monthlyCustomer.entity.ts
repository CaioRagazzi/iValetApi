import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
  import { Company } from '../company/company.entity';
import { Customer } from 'src/customer/customer.entity';
  
  @Entity()
  export class MonthlyCustomer {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(
      () => Company,
      company => company.id,
      { nullable: false, eager:true },
    )
    company: Company;

    @ManyToOne(
      () => Customer,
      user => user.id,
      { eager: true }
    )
    customer: Customer;

    @ApiProperty()
    @Column({ length: 100, nullable: true })
    plateAnonymousCustomer: string;
  }
  