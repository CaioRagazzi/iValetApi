import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany,
    Unique,
  } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { MonthlyCustomer } from 'src/monthlyCustomer/monthlyCustomer.entity';
import { UserCustomer } from 'src/userCustomer/userCustomer.entity';
import { IsDate, IsNotEmpty } from 'class-validator';
  
  @Entity()
  @Unique(["placa"])
  export class Customer {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ length: 100, nullable: true })
    name: string;

    @ApiProperty()
    @Column({ length: 100, nullable: true })
    phoneNumber: string;

    @ApiProperty()
    @Column({ length: 100, nullable: true })
    placa: string;

    @ApiProperty()
    @Column({ length: 100, nullable: true })
    marca: string;

    @ApiProperty()
    @Column({ length: 100, nullable: true })
    modelo: string;

    @ApiProperty()
    @Column({ length: 100, nullable: true })
    email: string;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updatedAt: Date;

    @OneToMany(() => UserCustomer, userCustomer => userCustomer.customer)
    userCustomer: UserCustomer[];

    @OneToMany(() => MonthlyCustomer, monthlyCustomer => monthlyCustomer.customer)
    monthlyCustomer: MonthlyCustomer[];

  }
  