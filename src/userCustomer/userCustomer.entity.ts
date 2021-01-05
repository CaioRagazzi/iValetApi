import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Customer } from 'src/customer/customer.entity';

@Entity()
export class UserCustomer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => User,
    user => user.companies,
  )
  user: User;

  @OneToOne(() => Customer)
  customer: Customer;
}