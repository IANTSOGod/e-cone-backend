import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessageDTO } from './dto/message.dto';
import { ChatService } from './chat/chat.service';

@WebSocketGateway(8001, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;
  constructor(private readonly chatService: ChatService) {}
  handleConnection(client: Socket) {
    console.log('Client connected', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected', client.id);
  }

  @SubscribeMessage('joinRoom')
  handlejoinRoom(client: Socket, room: string) {
    client.join(room);
    this.server.to(room).emit(client.id, 'joined', room);
  }

  @SubscribeMessage('leaveRoom')
  handleleaveRoom(client: Socket, room: string) {
    client.leave(room);
    this.server.to(room).emit(client.id, 'left', room);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: MessageDTO) {
    this.chatService.CreateMessage(message);
    this.server.emit('message', message);
  }
}
