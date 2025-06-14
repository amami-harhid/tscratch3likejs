export type TS3CSS = {
    documentCss: string,
    flagCss: string,
    scratch3Header: string,
    canvasCss: string,
    textCanvasCss: string,
    mainTmpCss: string,
    askCss: string,

}
// static interface
export interface IStaticS3Element {

    insertCss(S3CSS: TS3CSS) : void;
    init(): Promise<HTMLElement>;

};