# RSSchool NodeJS websocket task
## Installation
1. `git clone https://github.com/leonarci/NodeJS-2022-Q2_websocket-remote-control.git`
2. `git checkout development` 
3. `npm install`

## Usage
1. **Development mode**

    `npm run start:dev`
    `http://localhost:3000` staring app with nodemon and ts-node

2. **Production mode**

    `npm run start`
    `http://localhost:3000` build with webpack and starting app with node

3. **Commands on front:**
   1. **Important!** *Pressed on keyboard (check if ENG language selected))*
   2. **Important!** Check if tab with opened `front` is selected and active in Browser.
   3. **Note!** All actions are performed on websocket server computer.
   4. `p` to request mouse position
   5. `c` to draw a sircle
   6. `r` to draw a rectangle
   7. `s` to draw a square
   8. `ctrl + p` to get a part of a screen around cursor
   9. use `arrows ← ↑ → ↓` to move cursor
