import { ArgsType, Field } from '@nestjs/graphql';
import { Matches, MaxLength, MinLength } from 'class-validator';

@ArgsType()
export class UpdateUsernameArgs {
  @Field()
  @Matches(/^[a-zA-Z0-9\-_]+$/)
  @MinLength(3)
  @MaxLength(32)
  username: string;
}
