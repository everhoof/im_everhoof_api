import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class ConfirmEmailArgs {
  @Field()
  token: string;
}
