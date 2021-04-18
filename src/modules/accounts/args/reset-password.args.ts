import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

@ArgsType()
export class RequestPasswordResetArgs {
  @Field()
  @IsEmail()
  email: string;
}

@ArgsType()
export class ResetPasswordArgs {
  @Field()
  token: string;

  @Field()
  @MinLength(5)
  @MaxLength(255)
  password: string;
}
