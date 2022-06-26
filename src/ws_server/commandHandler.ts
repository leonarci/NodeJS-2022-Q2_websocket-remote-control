import robot, { screen } from 'robotjs';
import Jimp from 'jimp';

export async function handleCommand(command: any, args: number[]) {
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
      const bitmap = screen.capture(x, y, 200, 200);
      const image = new Jimp({ data: bitmap.image, width: bitmap.width, height: bitmap.height });
      const base64 = await image.getBase64Async('image/png');
      result = base64;
      return result;
  }
}


function drawCirle(radius: any, circleCenter: any) {
  let findYPlus = (cx: number, circleCenter: any): number => Math.round(circleCenter.b - Math.sqrt(radius ** 2 - (cx - circleCenter.a) ** 2));
  let findYMinus = (cx: number, circleCenter: any): number => Math.round(circleCenter.b + Math.sqrt(radius ** 2 - (cx - circleCenter.a) ** 2));
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
