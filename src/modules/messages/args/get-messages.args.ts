import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

@ArgsType()
export class GetMessagesArgs {
  @Field(() => Int, { defaultValue: 100 })
  @IsInt()
  @Max(200)
  @Min(1)
  @IsOptional()
  count: number;

  @Field(() => Int, { defaultValue: 1 })
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @Min(1)
  @IsOptional()
  lastId: number;
}
