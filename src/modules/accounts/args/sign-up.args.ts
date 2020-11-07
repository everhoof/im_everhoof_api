import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';

@ArgsType()
export class SignUpArgs {
  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @Matches(/^[a-zA-Z0-9\-_]+$/)
  @MinLength(3)
  @MaxLength(32)
  @IsOptional()
  username?: string;

  @Field()
  @MinLength(5)
  @MaxLength(255)
  password: string;
}
