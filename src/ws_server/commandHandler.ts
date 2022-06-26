import robot, { screen } from 'robotjs';
import Jimp from 'jimp';

export async function handleCommand(command: string, args: number[]) {
  let { x, y } = robot.getMousePos();
  let result: string;
  switch (command) {
    case 'mouse_up':
      robot.moveMouse(x, y - args[0]);
      break;
    case 'mouse_down':
      robot.moveMouse(x, y + args[0]);
      break;
    case 'mouse_left':
      robot.moveMouse(x - args[0], y);
      break;
    case 'mouse_right':
      robot.moveMouse(x + args[0], y);
      break;
    case 'draw_square':
      const length = args[0];
      drawRectangle(length, length, x, y);
      break;
    case 'draw_circle':
      const radius = args[0];
      let circleCenter = { a: x + radius, b: y };
      drawCirle(radius, circleCenter);
      break;
    case 'draw_rectangle':
      let [width, height] = args;
      drawRectangle(width, height, x, y);
      break;
    case 'mouse_position':
      result = `${x},${y}`;
      return result;
    case 'prnt_scrn':
      result = await makeScreenshot(x, y);
      return result;
  }
}


function drawCirle(radius: number, circleCenter: { a: number, b: number; }) {
  let findYPlus = (cx: number, circleCenter: { a: number, b: number; }): number => Math.round(circleCenter.b - Math.sqrt(radius ** 2 - (cx - circleCenter.a) ** 2));
  let findYMinus = (cx: number, circleCenter: { a: number, b: number; }): number => Math.round(circleCenter.b + Math.sqrt(radius ** 2 - (cx - circleCenter.a) ** 2));
  robot.mouseClick();
  robot.mouseToggle('down', 'left');
  let cx = circleCenter.a - radius;
  let cy = circleCenter.b;
  for (let i = 0; i < radius * 2; i++) {
    cx++;
    cy = findYPlus(cx, circleCenter);
    robot.moveMouse(cx, cy);
  }
  for (let i = 0; i < radius * 2; i++) {
    cx--;
    cy = findYMinus(cx, circleCenter);
    robot.moveMouse(cx, cy);
  }

  robot.mouseToggle('up', 'left');
}

function drawRectangle(width: number, height: number, x: number, y: number) {
  let posX = x;
  let posY = y;
  robot.mouseClick();
  robot.mouseToggle('down', 'left');
  for (posX; posX <= x + width; posX++) {
    robot.moveMouse(posX, posY);
  }
  for (posY; posY <= y + height; posY++) {
    robot.moveMouse(posX, posY);
  }
  for (posX; posX >= x; posX--) {
    robot.moveMouse(posX, posY);
  }
  for (posY; posY >= y; posY--) {
    robot.moveMouse(posX, posY);
  }
  robot.mouseToggle('up', 'left');
}

async function makeScreenshot(x: number, y: number) {
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
