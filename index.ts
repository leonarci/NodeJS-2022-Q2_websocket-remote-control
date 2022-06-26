import { httpServer } from './src/http_server/index.js';
import { wss } from './src/ws_server/wsServer';



const HTTP_PORT = 3000;
console.log(`Start static http server on the ${HTTP_PORT} port!`);
const websocketInfo = wss.address();
if (websocketInfo instanceof Object) {
  console.log(`WebSocket info: address: ${websocketInfo.address}, family: ${websocketInfo.family}, port: ${websocketInfo.port}`);

}
httpServer.listen(HTTP_PORT);

process.on('exit', () => {
  wss.close();
  httpServer.close();
  console.log('websocket server was closed');
});

process.on('SIGINT', () => {
  process.exit();
});
