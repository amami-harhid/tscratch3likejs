import type {ISkin} from './ISkin';
export declare interface ISvgSkin extends ISkin {
    _context: CanvasRenderingContext2D|null;
    _svgImage: HTMLImageElement;
}