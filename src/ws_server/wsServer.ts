import { createWebSocketStream, WebSocketServer } from 'ws';
import { parseCommand } from './commandParser';
import { handleCommand } from './commandHandler';
import { buffer } from 'stream/consumers';

export const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', function connection(ws) {
  console.log('Connection successfull');
  const wsStream = createWebSocketStream(ws, { decodeStrings: false });
  wsStream.on('data', async function message(data) {
    console.log('\x1b[31m<\x1b[0m- %s', data.toString());

    try {
      const { command, argsNums } = await parseCommand(data);
      const commandResult = await handleCommand(command, argsNums);
      let buf1 = Buffer;
      if (commandResult) {
        if (command === 'prnt_scrn') {
          wsStream.write(`${command} ${commandResult}\0`);
          console.log(`-\x1b[31m>\x1b[0m ${command} {imageBase64PngBuffer: ${commandResult.slice(0, 30)}...}`);
        } else if (command === 'mouse_position') {
          wsStream.write(`${command} ${commandResult}\0`);
          console.log(`-\x1b[31m>\x1b[0m ${command} ${commandResult}`);
        }
      } else {
        wsStream.write(`${command}\0`);
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
