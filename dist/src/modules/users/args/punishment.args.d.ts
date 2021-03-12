export declare enum PunishmentTypes {
    ban = "ban",
    mute = "mute"
}
export declare class PunishmentArgs {
    userId: number;
    type: PunishmentTypes;
    reason: string;
    duration?: number;
}
