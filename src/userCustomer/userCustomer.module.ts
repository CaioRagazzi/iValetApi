import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { UserCustomerController } from './userCustomer.controller';
import { UserCustomer } from './userCustomer.entity';
import { UserCustomerService } from './userCustomer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserCustomer]),
    forwardRef(() => UserModule),
  ],
  controllers: [UserCustomerController],
  providers: [UserCustomerService],
  exports: [UserCustomerService],
})
export class UserCustomerModule {}
