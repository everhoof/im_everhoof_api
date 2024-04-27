import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class SearchUsersArgs {
  @Field(() => String)
  @IsString()
  query: string;
}
