/**
 * <br>,<br/>で行をわけて配列を作り変える
 * @param texts 
 * @returns 
 */
export const lineBeaker = function (texts: string[]): string[] {
    const lineBreakArr: string[] = [];
    for( const text of texts) {
        const t = text.replaceAll('<br>', '<br/>').split('<br/>');
        for( const _t of t ) {
            lineBreakArr.push(_t);
        }
    }
    return lineBreakArr;
}