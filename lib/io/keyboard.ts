/**
 * Keyboard
 */
import { Cast } from '../util/cast';
import { Runtime } from '../engine/runtime';

declare type POST_DATA = {
    isDown: boolean,
    key : string,
};

/**
 * Names used internally for keys used in scratch, also known as "scratch keys".
 * @enum {string}
 */
export const KEY_NAME = {
    SPACE: 'Space',
    LEFT: 'LeftArrow',
    UP: 'UpArrow',
    RIGHT: 'RightArrow',
    DOWN: 'DownArrow',
    ENTER: 'Enter',
    ESCAPE: 'Escape',
};

/**
 * An array of the names of scratch keys.
 * @type {string[]}
 */
const KEY_NAME_LIST:string[] = Object.keys(KEY_NAME).map(name => KEY_NAME[name]);

export class Keyboard {
    /** スペースキー */
    static get SPACE() :string{
        return KEY_NAME.SPACE;
    }
    /** 左矢印キー */
    static get LEFT() :string{
        return KEY_NAME.LEFT;
    }
    /** 右矢印キー */
    static get RIGHT() :string{
        return KEY_NAME.RIGHT;
    }
    /** 上向き矢印キー */
    static get UP() :string{
        return KEY_NAME.UP;
    }
    /** 下向き矢印キー */
    static get DOWN() :string{
        return KEY_NAME.DOWN;
    }
    /** エスケープキー */
    static get ESCAPE() :string{
        return KEY_NAME.ESCAPE;
    }
    private _keysPressed: string[];
    private _runtime: Runtime;
    private _spaceStopPropagation: boolean;
    /**
     * 
     * @param runtime {Runtime}
     */
    constructor (runtime: Runtime) {
        /** 押されているキーのリスト */
        this._keysPressed = [];
        /** 自身のRuntime */
        this._runtime = runtime;

        const me = this;
        document.addEventListener('keydown', (e:KeyboardEvent) => {
            const data: POST_DATA = {
                isDown: true,
                key : e.key,
            };
            me.postData(data);
            if(me._spaceStopPropagation === true){
                if( data.key == ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                }    
            }
        })
        document.addEventListener('keyup', (e:KeyboardEvent) => {
            const data : POST_DATA = {
                isDown: false,
                key : e.key,
            };
            me.postData(data);
            if(me._spaceStopPropagation === true){
                if( data.key == ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        })

        this._spaceStopPropagation = true;
    }
    /**
     * Convert from a keyboard event key name to a Scratch key name.
     * @param  {string} keyString the input key string.
     * @return {string} the corresponding Scratch key, or an empty string.
     */
    _keyStringToScratchKey (keyString: string) : string {
        keyString = Cast.toString(keyString);
        // Convert space and arrow keys to their Scratch key names.
        //console.log('keyString', keyString);
        switch (keyString) {
        case ' ': return KEY_NAME.SPACE;
        case 'ArrowLeft':return KEY_NAME.LEFT;
        case 'Left': return KEY_NAME.LEFT;
        case 'ArrowUp':return KEY_NAME.UP;
        case 'Up': return KEY_NAME.UP;
        case 'Right': return KEY_NAME.RIGHT;
        case 'ArrowRight': return KEY_NAME.RIGHT;
        case 'Down': return KEY_NAME.DOWN;
        case 'ArrowDown': return KEY_NAME.DOWN;
        case 'Enter': return KEY_NAME.ENTER;
        case 'Escape': return KEY_NAME.ESCAPE;
        }
        // 上記以外の ２文字以上のキーは空文字に変える
        if (keyString.length > 1) {
            return '';
        }
        // 上記以外の １文字のキーは大文字にする
        return keyString.toUpperCase();
    }

    /**
     * Convert from a block argument to a Scratch key name.
     * 
     * @param  {string|number} keyArg the input arg.
     * @return {string} the corresponding Scratch key.
     */
    _keyArgToScratchKey (keyArg: string|number) : string {
        // If a number was dropped in, try to convert from ASCII to Scratch key.
        if (typeof keyArg === 'number') {
            // Check for the ASCII range containing numbers, some punctuation,
            // and uppercase letters.
            if (keyArg >= 48 && keyArg <= 90) {
                return String.fromCharCode(keyArg);
            }
            switch (keyArg) {
            case 32: return KEY_NAME.SPACE;
            case 37: return KEY_NAME.LEFT;
            case 38: return KEY_NAME.UP;
            case 39: return KEY_NAME.RIGHT;
            case 40: return KEY_NAME.DOWN;
            }
        }

        keyArg = Cast.toString(keyArg);

        // If the arg matches a special key name, return it.
        if (KEY_NAME_LIST.includes(keyArg)) {
            return keyArg;
        }

        // Use only the first character.
        if (keyArg.length > 1) {
            keyArg = keyArg[0];
        }

        // Check for the space character.
        if (keyArg === ' ') {
            return KEY_NAME.SPACE;
        }

        return keyArg.toUpperCase();
    }

    /**
     * Keyboard DOM event handler.
     * @param  {POST_DATA} data Data from DOM event.
     */
    postData (data: POST_DATA) : void {
        if (!data.key) return;
        const scratchKey = this._keyStringToScratchKey(data.key);
        if (scratchKey === '') return;
        const index = this._keysPressed.indexOf(scratchKey);
        if (data.isDown) {
            this._runtime.emit('KEY_PRESSED', scratchKey);
            // If not already present, add to the list.
            if (index < 0) {
                this._keysPressed.push(scratchKey);
            }
        } else if (index > -1) {
            // If already present, remove from the list.
            this._keysPressed.splice(index, 1);
        }
    }

    /**
     * キーが押されているかを判定する
     * @param  {string|number} keyArg key argument.
     * @return {boolean} Is the specified key down?
     */
    keyIsDown (keyArg: string|number) :boolean{
        if (!keyArg || keyArg === 'any') {
            return this._keysPressed.length > 0;
        }
        const scratchKey = this._keyArgToScratchKey(keyArg);
        return this._keysPressed.indexOf(scratchKey) > -1;
    }

};