import { createWebSocketStream, WebSocketServer } from 'ws';
import { parseCommand } from './commandParser';
import { handleCommand } from './commandHandler';

export const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', function connection(ws) {
  console.log('Connection successfull');
  const wsStream = createWebSocketStream(ws);
  ws.on('message', async function message(data) {
    console.log('\x1b[31m<\x1b[0m- %s', data.toString());

    try {
      const { command, argsNums } = await parseCommand(data);
      const commandResult = await handleCommand(command, argsNums);
      if (commandResult) {
        if (command === 'prnt_scrn') {
          ws.send(`${command} ${commandResult.slice(commandResult.indexOf(',') + 1)}\0`);
          console.log(`-\x1b[31m>\x1b[0m ${command} {base64 string (png buf)}`);
        } else if (command === 'mouse_position') {
          ws.send(`${command} ${commandResult}\0`);
          console.log(`-\x1b[31m>\x1b[0m ${command} ${commandResult}`);
        }
      } else {
        ws.send(`${command}\0`);
        console.log('success');
      }
    } catch (error) {
      console.log('error');
    }
  });
  ws.on('close', () => {
    console.log('Connection closed');
  });

});

wss.on('close', () => {
  console.log('websocket server was closed');
});
