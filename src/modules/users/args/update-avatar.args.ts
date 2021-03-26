import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@ArgsType()
export class UpdateAvatarArgs {
  @Field(() => Int)
  @IsInt()
  pictureId: number;
}
