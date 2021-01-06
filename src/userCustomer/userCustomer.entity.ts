import { Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Customer } from 'src/customer/customer.entity';

@Entity()
export class UserCustomer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => User,
  )
  user: User;

  @ManyToOne(() => Customer)
  customer: Customer;
}