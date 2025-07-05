import { Env } from '../env'
import { ImageToBase64Util } from "../util/base64Util";
/**
 * Imageを梱包するSVGを作る
 */
export class Image2Svg {
    /**
     * <image>を含むSVGテキストを返す
     * @param url 
     * @returns 
     */
    public static async createSvg(url:string) : Promise<string> {
        const imageInfo = await ImageToBase64Util.getLoadInfo(url);
        const w = imageInfo.size.width;
        const h = imageInfo.size.heigth;
        const dataUrl = imageInfo.data;
        if(w > Env.StageSize.W && h > Env.StageSize.H){
            const svg = Image2Svg.toSvg(dataUrl,Env.StageSize.W,Env.StageSize.H);
            return svg;
        }else{
            const svg = Image2Svg.toSvg(dataUrl,w,h);
            return svg;
        }
    }

    private static toSvg(dataUrl:string, width: number, height: number): string {
        const svg = 
`<svg width="${width}" height="${height}" viewBox="0,0,${width},${height}" xmlns="http://www.w3.org/2000/svg">
    <image href="${dataUrl}" width="${width}" height="${height}" />
</svg>`;
        return svg;
    }
}