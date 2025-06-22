
export class ImageToBase64Util {

    /**
     * 指定したURLを読み込み、ロード後の情報を返す
     * イメージデータを前提とする。
     * 他のデータのロードは結果を保証しない。
     * @param url 
     * @returns 
     */
    public static async getLoadInfo(url: string): Promise<{data:string, size:{width:number,heigth:number}}> {

        return new Promise<{data:string, size:{width:number,heigth:number}}>(async resolve=>{
            const response = await fetch(url);
            const blob = await response.blob();
            const base64Url = await ImageToBase64Util.blobToBase64(blob);
            const image = new Image();
            image.onload = ()=>{
                const w = image.width;
                const h = image.height;
                const rtn = {data: base64Url, size:{width:w, heigth:h}};
                resolve(rtn);
            }
            image.src = base64Url;
        });

    }

    /**
     * BlobをBase64へ変換
     * 例: data:font/woff2;base64,～
     * @param blob 
     * @returns 
     */
    public static async blobToBase64(blob: Blob): Promise<string> {
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
}