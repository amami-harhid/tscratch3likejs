/**
 * FontLoader
 */
export class FontLoader {
    /**
     * フォントをロードする
     * @param url {string}
     * @param name {string}
     * @returns {Promise<FontFace>}
     */
    static async fontFaceLoad(url: string, name: string): Promise<FontFace>{
        if(url) {
            const font = new FontFace(name, `url(${url})`);
            const _font = await font.load();
            return _font;
        }
        // 例外を起こすべきところ。
        throw('Scratch3LikeJS loadFont: empty url')
    }
    /**
     * フォントをロードする
     * @param url {string} - fontの URL
     * @param name {string} - BlobをBase64化した文字列( data:font/～;base64,～)
     * @returns {Promise<string>}
     */
    public static async fontLoad(url: string, name: string): Promise<{name:string, data:string[] }>{
        const datas = await FontLoader.makeEmbeddedFontdata(url);
        const fontDatas: string[] = []
        for(const data of datas){
            await FontLoader.makeFontFace(data, name);
            fontDatas.push(data);
        }
        return {name: name, data: fontDatas};

    }
    private static async makeFontFace(url:string, name:string): Promise<void> {
        const fontFaceUrl = `url(${url})`;
        const fontFace = new FontFace(name, fontFaceUrl);
        await fontFace.load();
        document.fonts.add(fontFace);
    }
    private static async makeEmbeddedFontdata(url: string): Promise<string[]>{
        const response = await fetch(url);
        const blob = await response.blob();
        const cssFontFace = await blob.text();
        const matchUrls = cssFontFace.match(/url\(.+?\)/g);
        if(matchUrls){
            const fontDatas:string[] = [];
            for(const _url of matchUrls){
                const _url2 = _url.replace(/^url\(/,'').replace(/\)/,'');
                const _response = await fetch(_url2);
                const blob = await _response.blob();
                const fontData = await FontLoader.blobToBase64(blob);
                fontDatas.push(fontData);
            }
            return fontDatas;
        }else{
            const fontData = await FontLoader.blobToBase64(blob);
            return [fontData];
        }

    }
    /**
     * BlobをBase64へ変換
     * 例: data:font/woff2;base64,～
     * @param blob 
     * @returns 
     */
    private static async blobToBase64(blob: Blob): Promise<string> {
        const reader = new FileReader();
        return new Promise<string>(resolve=>{
            reader.onloadend = () => {
                const base64 = reader.result;
                resolve(base64 as string);
            };
            reader.onerror = (e) => {
                console.error('blobToBase64 blob', blob);
                console.error('blobToBase64 error', e.target?.error?.message);
                throw e;
            }
            reader.readAsDataURL(blob);
        });
    }
};