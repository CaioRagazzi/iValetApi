import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ObjectLiteral } from 'typeorm';
import { Caixa } from './caixa.entity';
import { CaixaService } from './caixa.service';
import { OpenCloseCaixaDto } from './dto/open-close-caixa.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('caixa')
export class CaixaController {
  constructor(private caixaService: CaixaService) {}

  @Post('openCaixa')
  async openCaixa(
    @Query() openCaixa: OpenCloseCaixaDto,
  ): Promise<ObjectLiteral> {
    try {
      const result = await this.caixaService.openCaixa(openCaixa.companyId);

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('closeCaixa')
  async closeCaixa(
    @Query() openCaixa: OpenCloseCaixaDto,
  ): Promise<ObjectLiteral> {
    try {
      const result = await this.caixaService.closeCaixa(openCaixa.companyId);

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('openedCaixa/:companyId')
  async getOpenedCaixa(@Param('companyId') companyId: number): Promise<Caixa> {
    try {
      const caixa = await this.caixaService.getOpenedCaixaByCompany(companyId);

      if (caixa) {
        return caixa;
      } else {
        throw new HttpException(
          'Theres no opened Caixa',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('closedCaixa/:companyId')
  async getClosedCaixas(
    @Param('companyId') companyId: number,
    @Query('page') page: number
  ): Promise<Caixa[]> {
    try {
      const caixas = await this.caixaService.getClosedCaixaByCompanyId(companyId, page);
      
      if (caixas) {
        return caixas;
      } else {
        throw new HttpException(
          'Theres no opened Caixa',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
