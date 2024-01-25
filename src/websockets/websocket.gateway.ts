import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('mensaje')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    console.log(data);
    // this.server.emit('mensajeserver', data);
    client.broadcast.emit('mensajeserver', data);
  }

  @SubscribeMessage('onNewUser')
  handleNewUser(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    console.log(data);

    // Connect to database
    // Save user
    // Read users

    // this.server.emit('mensajeserver', data);
    client.broadcast.emit('onNewUser', data);
  }
}
