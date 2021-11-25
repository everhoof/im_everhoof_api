import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

@ArgsType()
export class UpdateMessageArgs {
  @Field(() => Int)
  @IsInt()
  messageId: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @MaxLength(2000)
  @IsOptional()
  content?: string;
}
