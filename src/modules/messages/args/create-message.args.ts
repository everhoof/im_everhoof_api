import { ArgsType, Field, Int } from '@nestjs/graphql';
import { ArrayMaxSize, IsArray, IsInt, IsString, MaxLength } from 'class-validator';

@ArgsType()
export class CreateMessageArgs {
  @Field()
  @IsString()
  @MaxLength(2000)
  content: string;

  @Field(() => [Int], { defaultValue: [] })
  @IsArray()
  @IsInt({ each: true })
  @ArrayMaxSize(32)
  pictures: number[];
}
