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
    static async fontLoad(url: string, name: string): Promise<FontFace>{
        if(url) {
            const font = new FontFace(name, `url(${url})`);
            const _font = await font.load();
            return _font;
        }
        // 例外を起こすべきところ。
        throw('Scratch3LikeJS loadFont: empty url')
    }
    static async makeEmbeddedFontdata(src: string): Promise<string>{

        const response = await fetch(src);
        const blob = await response.blob();
        const fontData = await FontLoader.blobToBase64(blob);
        return fontData;

    }
    /**
     * BlobをBase64へ変換
     * 例: data:font/woff2;base64,～
     * @param blob 
     * @returns 
     */
    static async blobToBase64(blob: Blob): Promise<string> {
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