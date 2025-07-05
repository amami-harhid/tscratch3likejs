import { Libs } from "../controls/libs";
import { Env } from "../env";
import { Image2Svg } from "./image2Svg";
/**
 * ImageLoader
 */
export class ImageLoader {
    static libs: Libs;
    /**
     * REGEX_DATA_IMAGE_URL
     * image data の判定のRegExpを返す
     * @returns {RegExp}
     */
    static get REGEX_DATA_IMAGE_URL(): RegExp {
        return /^data:image\\/;
    }
    /**
     * REGEX_SVG_DATA_IMAGE_URL
     * svg data の判定のRegExpを返す
     * @returns {RegExp}
     */
    static get REGEX_SVG_DATA_IMAGE_URL(): RegExp {
        return /^<svg\s/;
    }
    static get REGEX_DATA_IMAGE_SVG (): RegExp {
        return /^data:image\/svg\+xml/;
    }

    /**
     * REGEX_SVG_DATA_IMAGE_FILE
     * svg file 名 の判定のRegExpを返す
     * @returns {RegExp}
     */
    static get REGEX_SVG_DATA_IMAGE_FILE(): RegExp {
        return /^.+\.svg$/;
    }
    /**
     * 与えた文字列がSVGデータであるか否かを判定する
     * @param {string} image 
     * @returns {boolean}
     */
    static isSVG(image: string) : boolean {
        if(typeof image === 'string') {
            const dataImageUrl = image;
            if(dataImageUrl.match(ImageLoader.REGEX_SVG_DATA_IMAGE_URL)){
                return true;
            }
        }
        return false;
    }
    /**
     * イメージをロードする
     * @param {string} image 
     * @param {string} name 
     * @param {{x:number,y:number}} translate 
     * @return {Promise<{name:string,data: any}>} 
     */
    static async loadImage(image:string, name:string, translate:{x:number,y:number}={x:0,y:0}
            ): Promise<{name:string,data: string|HTMLImageElement}> {
        if(image) {
            if(typeof image === 'string') {
                if(image.match(ImageLoader.REGEX_SVG_DATA_IMAGE_FILE) ||
                    image.match(ImageLoader.REGEX_DATA_IMAGE_SVG)){
                    let _text = await ImageLoader._svgText(image);
                    if(_text == "ERROR"){
                        throw "ローディングエラー。SVG画像データの指定を確認してください。("+image+")";
                    }
                    const libs = ImageLoader.libs;
                    const parser = libs.svgParser;
                    const svgDoc = parser.parseFromString(_text);
                    const size = parser.getSize();
                    if(size.w > Env.StageSize.W && size.h > Env.StageSize.H) {
                        const changed = parser.sizeChange(svgDoc,Env.StageSize.W, Env.StageSize.H,translate);
                        return {name:name, data: changed};    
                    }else{
                        return {name:name, data: _text};    
                    }
                }else{
                    // <image>タグを入れたSVGにする
                    const localUrl = image;
                    const svgStr = await Image2Svg.createSvg(localUrl);
                    console.log(svgStr)
                    const rtn = {name: name, data: svgStr};
                    return rtn;
                }
            }
        }
        throw "イメージローディングエラー。画像データの指定を確認してください。";
    }
    /**
     * 指定したアドレス(src)をもとにイメージを読み込み返す。
     * エラーが起きたときは文字列("ERROR")を返す。
     * @param {string} src
     * @returns Promise<HTMLImageElement>
     */
    static async _loadImage(src: string) : Promise<HTMLImageElement|string>{
        return new Promise((resolve) => {
            const img:HTMLImageElement = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => resolve(img);
            img.onerror = (e) => {
                //reject(e);
                resolve("ERROR");
            }    
            img.src = src;
        });
    }
    /**
     * 与えたアドレスをもとにイメージを取り出し返す。
     * エラーが起きたときは文字列("ERROR")を返す。
     * @param {string} image 
     * @returns Promise<string>
     */
    static async _svgText(image: string) :Promise<string>{
        let svg: Response = await fetch(image);
        let _text: string = await svg.text();
        if(_text.substring(0,4) != "<svg"){
            return "ERROR";
        }
        return _text;
    }

};
