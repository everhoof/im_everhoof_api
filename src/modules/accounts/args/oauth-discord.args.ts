import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class OAuthDiscordArgs {
  @Field()
  code: string;
}
