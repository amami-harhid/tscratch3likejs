/**
 * Type ThreadObj
 */
import { Entity } from "../entity/entity";
export type TThreadObj = {
    f: AsyncGenerator<any, void, any>|null,
    originalF: CallableFunction|null,
    done: boolean, 
    status: string,
    forceExit: boolean,
    threadId: string|null,
    entityId: string|null,
    childObj: TThreadObj|null, 
    parentObj: TThreadObj|null,
    entity: Entity|null,
    doubleRunable: boolean,

}