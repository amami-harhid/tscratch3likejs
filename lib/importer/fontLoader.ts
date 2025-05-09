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
};