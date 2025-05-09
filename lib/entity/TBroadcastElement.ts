import { Entity } from "./entity";
export declare type TBroadcastElementFunc = {
    func: CallableFunction,
    threadId: string,
    target: Entity,
}
export declare type TBroadcastElement = {
    "eventId": string, 
    "funcArr": TBroadcastElementFunc[],
}