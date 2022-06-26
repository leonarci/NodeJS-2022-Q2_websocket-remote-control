import robot from 'robotjs';

export function drawCirle(radius: number, circleCenter: { a: number, b: number; }) {
  //findYPlus calculates Y value above x axis
  let findYPlus = (cx: number, circleCenter: { a: number, b: number; }): number => Math.round(circleCenter.b - Math.sqrt(radius ** 2 - (cx - circleCenter.a) ** 2));
  //findYMinus calculates Y value below x axis
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
