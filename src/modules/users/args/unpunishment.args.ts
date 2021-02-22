import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@ArgsType()
export class UnpunishmentArgs {
  @Field(() => Int)
  @IsInt()
  userId: number;
}
