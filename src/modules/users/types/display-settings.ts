import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DisplaySettings {
  @Field(() => Boolean)
  emailConfirmed: boolean;
}
