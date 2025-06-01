/**
 * Keyboard
 */

export enum KEYBOARD_KEYS {
    SPACE = 'Space',
    LEFT = 'LeftArrow',
    UP = 'UpArrow',
    RIGHT = 'RightArrow',
    DOWN = 'DownArrow',
    ENTER = 'Enter',
    ESCAPE = 'Escape',
};

type EnumKeys = keyof typeof KEYBOARD_KEYS;
type EnumKeyFields = {[key in EnumKeys]:string};
export type I_KEYBOARD_KEYS = EnumKeyFields

export interface IKeyboard {

    /**
     * キーが押されているかを判定する
     * @param  {string|number} keyArg key argument.
     * @return {boolean} Is the specified key down?
     */
    keyIsDown (keyArg: string|number) :boolean;
}