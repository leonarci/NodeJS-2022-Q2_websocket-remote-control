import robot from 'robotjs';

export function drawRectangle(width: number, height: number, x: number, y: number) {
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
