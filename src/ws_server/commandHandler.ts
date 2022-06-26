import robot from 'robotjs';
import { drawCirle } from '../actions/drawCirle';
import { drawRectangle } from '../actions/drawRectangle';
import { makeScreenshot } from '../actions/makeScreenshot';

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
