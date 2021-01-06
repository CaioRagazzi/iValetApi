import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { getManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCustomer } from './userCustomer.entity';
import { UserCustomerInsertRequestDto } from './dto/userCustomerInsertRequest.dto';
import { Customer } from 'src/customer/customer.entity';

@Injectable()
export class UserCustomerService {
  constructor(
    @InjectRepository(UserCustomer)
    private userCustomerRepository: Repository<UserCustomer>,
    private userService: UserService,
  ) {}

  async findOneById(userCustomerId: number): Promise<UserCustomer> {
    return await this.userCustomerRepository.findOne(userCustomerId);
  }

  async findOneByUserId(userId: number): Promise<UserCustomer[]> {
    return await this.userCustomerRepository.find({
      where: { user: userId },
      loadRelationIds: true
    });
  }

  async createUserCustomer(userDto: UserCustomerInsertRequestDto): Promise<User> {
    const duplicateUser = await this.userService.findOneByEmail(userDto.email);

    if (duplicateUser) {
      throw new Error(`User with email ${userDto.email} already exists`);
    }

    const user = new User();
    user.name = userDto.name;
    user.email = userDto.email;
    user.password = this.userService.hashPassword(userDto.password);
    user.perfil = userDto.perfil;
    user.createdAt = new Date();
    user.updatedAt = new Date();

    let createdUser: User;

    await getManager().transaction(async transaction => {
      const customer = new Customer();
      customer.name = userDto.name;
      customer.createdAt = new Date();
      customer.updatedAt = new Date();
      customer.placa = userDto.plate;
      customer.email = userDto.email;
      const createdCustomer = await transaction.save<Customer>(customer);
      createdUser = await transaction.save<User>(user);
      const userCustomer = new UserCustomer();
      userCustomer.user = createdUser;
      userCustomer.customer = createdCustomer;
      await transaction.save<UserCustomer>(userCustomer);
    });

    return createdUser;
  }
}
