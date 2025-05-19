import type {S3RotationStyle} from '../../types/scratchjs/s3Libs'
export class ImageEffective {
    /**
     * 色の効果
     */
    static get COLOR () {
        return 'color';
    }
    /**
     * 魚眼レンズの効果
     */
    static get FISHEYE () {
        return 'fisheye';
    }
    /**
     * 渦巻きの効果
     */
    static get WHIRL () {
        return 'whirl';
    }
    /**
     * ピクセル化の効果
     */
    static get PIXELATE () {
        return 'pixelate';
    }
    // モザイクの効果
    static get MOSAIC () {
        return 'mosaic';
    }
    // 明るさの効果
    static get BRIGHTNESS () {
        return 'brightness';
    }
    // 幽霊の効果
    static get GHOST () {
        return 'ghost';
    }
};

export class SoundOption {
    static get VOLUME (){
        return "volume";
    }
    static get PITCH () {
        return "pitch";
    }
}
export const RotationStyle : S3RotationStyle = {
    
    LEFT_RIGHT : 'left-right',
    
    DONT_ROTATE : 'do-not-rotate',
    
    ALL_AROUND : 'all-around',

};