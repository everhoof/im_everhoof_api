import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsISO8601, IsOptional, Max, Min } from 'class-validator';

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
  lastId: number | null;

  @Field(() => String, { nullable: true })
  @IsISO8601()
  @IsOptional()
  fromDateTime: string | null;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  reverse: boolean;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  poll: boolean;
}
