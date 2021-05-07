import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetTokenByDiscordIdArgs {
  @Field()
  id: string;
}
