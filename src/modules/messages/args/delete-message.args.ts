import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@ArgsType()
export class DeleteMessageArgs {
  @Field(() => Int)
  @IsInt()
  messageId: number;
}
