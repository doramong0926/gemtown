export const resize = (file, maxWidth, maxHeight, parity, quality, fn) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event) {
        var dataUrl = event.target.result;

        var image = new Image();
        image.src = dataUrl;
        image.onload = function () {
            var resizedDataUrl = resizeImage(image, maxWidth, maxHeight, parity, quality);
            fn(resizedDataUrl);
        };
    };
}

export const  resizeImage = (image, maxWidth, maxHeight, parity, quality) => {
    var canvas = document.createElement('canvas');

    var width = image.width;
    var height = image.height;

    if (parity === "width") {
        height = Math.round(height * maxWidth / width);
        width = maxWidth;
    } else if (parity === "height") {
        width = Math.round(width * maxHeight / height);
        height = maxHeight;
    } else {
        if (width > height) {
            if (width > maxWidth) {
                height = Math.round(height * maxWidth / width);
                width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                width = Math.round(width * maxHeight / height);
                height = maxHeight;
            }
        }
    }

    canvas.width = width;
    canvas.height = height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg", quality);
}