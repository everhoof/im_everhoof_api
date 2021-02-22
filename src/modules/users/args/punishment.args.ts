import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsInt, IsISO8601, IsString, MaxLength } from 'class-validator';

export enum PunishmentTypes {
  ban = 'ban',
  mute = 'mute',
}
registerEnumType(PunishmentTypes, { name: 'PunishmentTypes' });

@ArgsType()
export class PunishmentArgs {
  @Field(() => Int)
  @IsInt()
  userId: number;

  @Field(() => Date)
  @IsEnum(PunishmentTypes)
  type: PunishmentTypes;

  @Field(() => String)
  @IsString()
  @MaxLength(200)
  reason: string;

  @Field(() => String, { nullable: true })
  @IsISO8601()
  cancelAt?: string;
}
