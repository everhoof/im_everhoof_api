import { Controller, Get, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@UseFilters(HttpExceptionFilter)
@Controller('oauth')
export class OAuthController {
  @Get('discord')
  @UseGuards(AuthGuard('discord'))
  oauthDiscord(@Req() req: Request, @Res() res: Response): void {
    return res.redirect(process.env.PUBLIC_URL || '');
  }
}
