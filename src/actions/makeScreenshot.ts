import { screen } from 'robotjs';
import Jimp from 'jimp';

export async function makeScreenshot(x: number, y: number) {
  const bitmap = screen.capture(x - 100, y - 100, 200, 200);
  const image = new Jimp(bitmap.width, bitmap.height);
  let pos = 0;
  // scan helper function is used to transfer correct color values
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, index) => {
    const color = bitmap.colorAt(x, y);
    const red = parseInt(color[0] + color[1], 16);
    const green = parseInt(color[2] + color[3], 16);
    const blue = parseInt(color[4] + color[5], 16);

    image.bitmap.data[index + 0] = Number(red);
    image.bitmap.data[index + 1] = Number(green);
    image.bitmap.data[index + 2] = Number(blue);
    image.bitmap.data[index + 3] = 255;
  });
  const base64 = await image.getBase64Async('image/png');
  const imageBase64PngBuffer: string = base64.slice(base64.indexOf(',') + 1);
  return imageBase64PngBuffer;
}
