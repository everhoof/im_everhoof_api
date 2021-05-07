import { Strategy } from 'passport-discord';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AccountsService } from '@modules/accounts/accounts.service';
import { Token } from '@modules/accounts/entities/tokens.entity';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(private readonly accountsService: AccountsService) {
    super({
      clientID: process.env.DISCORD_OAUTH_CLIENT_ID,
      clientSecret: process.env.DISCORD_OAUTH_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_OAUTH_CALLBACK_URL,
      scope: ['identify', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Record<string, unknown>): Promise<Token> {
    return this.accountsService.validateUserByDiscord(accessToken, refreshToken, profile);
  }
}
