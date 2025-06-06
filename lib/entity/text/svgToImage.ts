export const svgToImage = function(svg: SVGSVGElement) {
    return new Promise<ImageData>(resolve=>{
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        canvas.width = svg.width.baseVal.value;
        canvas.height = svg.height.baseVal.value;

        const ctx = canvas.getContext('2d');
        if(ctx) {
            const image = new Image();
            image.onload = function() {
                ctx.drawImage(image,0,0);
                const imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
                resolve(imageData);
            };
            image.onerror = function(error) {
                throw error;
            }
            image.src = 'data:image/svg+xml;charset=utf-8;base64,'
                + btoa(encodeURIComponent(svgData));
        }
    });

}