function svg_stripes() {
    var angle =  -45;
    var strokecolor = "#4f4f4f";
    var strokewidth = 25;
    var svgString = '<svg xmlns="http://www.w3.org/2000/svg" width="400%" height="400%"><defs><pattern id="pinstripe" patternUnits="userSpaceOnUse" width="50" height="50" patternTransform="rotate('+angle+')"><line x1="25" y="0" x2="25" y2="50" stroke="'+strokecolor+'" stroke-width="'+strokewidth+'" /></pattern></defs><rect width="100%" height="100%" fill="url(#pinstripe)" /></svg>';
    var encodedData = window.btoa(svgString);
    var url = 'data:image/svg+xml;base64,' + encodedData;
    document.body.style.backgroundImage = "url("+url+")";
}
svg_stripes();