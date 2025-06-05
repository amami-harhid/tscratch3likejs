/**
 * ImageLoader
 */
import { Libs } from "../controls/libs";
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
                    if(size.w > 480 && size.h > 360) {
                        const changed = parser.sizeChange(svgDoc,480,360,translate);
                        return {name:name, data: changed};    
                    }else{
                        return {name:name, data: _text};    
                    }
                }else{
                    const localUrl = image;
                    let _img = await ImageLoader._loadImage(localUrl);
                    if(_img == "ERROR"){
                        throw "イメージローディングエラー。画像データの指定を確認してください。("+localUrl+")";
                    }
                    return {name:name,data:_img};
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
                console.log(e);
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
        console.log('iamge',image);
        let svg: Response = await fetch(image);
        console.log('svg',svg);
        let _text: string = await svg.text();
        if(_text.substring(0,4) != "<svg"){
            return "ERROR";
        }
        return _text;
    }

};
