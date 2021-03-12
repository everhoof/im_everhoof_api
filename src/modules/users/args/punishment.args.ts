import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsInt, IsString, MaxLength, Min } from 'class-validator';

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

  @Field(() => PunishmentTypes)
  @IsEnum(PunishmentTypes)
  type: PunishmentTypes;

  @Field(() => String)
  @IsString()
  @MaxLength(200)
  reason: string;

  @Field(() => Number, { nullable: true })
  @IsInt()
  @Min(1)
  duration?: number;
}
