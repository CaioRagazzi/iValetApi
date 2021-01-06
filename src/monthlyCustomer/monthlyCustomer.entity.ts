import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
  import { Company } from '../company/company.entity';
import { Customer } from 'src/customer/customer.entity';
import { MonthlyPrices } from 'src/monthlyPrices/monthlyPrices.entity';
  
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

    @ManyToOne(
      () => MonthlyPrices,
      monthlyPrices => monthlyPrices.id,
      { eager: true }
    )
    price: MonthlyPrices;

    @ApiProperty()
    @Column({ length: 100, nullable: true })
    nameAnonymousCustomer: string;

    @ApiProperty()
    @Column({ length: 100, nullable: true })
    emailAnonymousCustomer: string;

    @ApiProperty()
    @Column({ length: 100, nullable: true })
    telefoneAnonymousCustomer: string;

    @ApiProperty()
    @Column({ length: 100, nullable: true })
    marcaAnonymousCustomer: string;

    @ApiProperty()
    @Column({ length: 100, nullable: true })
    modeloAnonymousCustomer: string;

    @ApiProperty()
    @Column({ length: 100, nullable: true })
    plateAnonymousCustomer: string;
  }
  