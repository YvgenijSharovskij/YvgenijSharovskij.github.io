var imagemin = require("imagemin"),     // imagemin module.
  webp = require("imagemin-webp"),      // imagemin's WebP plugin
  outputFolder = "./img",               // output dir
  PNGImages = "./img/*.png",            // PNG images
  JPEGImages = "./img/*.jpg";           // JPEG images

imagemin([PNGImages], outputFolder, {
  plugins: [webp({
      lossless: true  // losslessly encode images
  })]
}).then(() => {
    console.log('PNGImages encoded');
});

imagemin([JPEGImages], outputFolder, {
  plugins: [webp({
    quality: 65       // quality setting from 0 to 100
  })]
}).then(() => {
    console.log('JPEGImages encoded');
});