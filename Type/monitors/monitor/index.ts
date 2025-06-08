import { TPosition, TScale } from "@Type/common/typeCommon";

/**
 * Monitor
 */
export interface IMonitor {
    get monitorId(): string;
    get position(): TPosition;
    set position(_position: TPosition)
    get scale(): TScale;
    set scale(_scale:TScale)
    show (): void;
    hide (): void;
    /**
     * 文字列型
     */    
    get text (): string;
    /**
     * 文字列型
     */    
    set text( _text: string )
    /**
     * 数値型
     */    
    get value (): number;
    /**
     * 数値型
     */    
    set value( _value: number )
}
