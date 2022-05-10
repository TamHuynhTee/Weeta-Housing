// import { MESSAGE_MODEL } from 'models/Messages.model';
import { MESSAGE_MODEL } from '@/models/Messages.model';
import { Socket } from 'socket.io-client';
import { SOCKET_EVENTS } from '../events.socket';

class SendMessageSocket {
  public async joinRoomCSS(
    socket: Socket,
    payload: { senderId: string; receiverId: string }
  ) {
    socket.emit(SOCKET_EVENTS.JOIN_ROOM_CSS, payload);
  }
  public async onJoinRoomSSC(socket: Socket, listener: (data: any) => void) {
    socket.on(SOCKET_EVENTS.JOIN_ROOM_SSC, listener);
  }

  public async sendMessageCSS(socket: Socket, payload: MESSAGE_MODEL) {
    socket.emit(SOCKET_EVENTS.SEND_MESSAGE_CSS, payload);
  }
  public async onSendMessageSSC(socket: Socket, listener: (data: any) => void) {
    socket.on(SOCKET_EVENTS.SEND_MESSAGE_SSC, listener);
  }

  public async editMessageCSS(socket: Socket, payload: MESSAGE_MODEL) {
    socket.emit(SOCKET_EVENTS.UPDATE_MESSAGE_CSS, payload);
  }
  public async onEditMessageSSC(socket: Socket, listener: (data: any) => void) {
    socket.on(SOCKET_EVENTS.UPDATE_MESSAGE_SSC, listener);
  }

  public async removeMessageCSS(socket: Socket, payload: MESSAGE_MODEL) {
    socket.emit(SOCKET_EVENTS.REMOVE_MESSAGE_CSS, payload);
  }
  public async onRemoveMessageSSC(
    socket: Socket,
    listener: (data: any) => void
  ) {
    socket.on(SOCKET_EVENTS.REMOVE_MESSAGE_SSC, listener);
  }
  //   public async leaveRoomCSS(
  //     socket: Socket,
  //     payload: { conversationID: string; receiverId: string }
  //   ) {
  //     socket.emit(SOCKET_EVENTS.END_CALL_CSS, payload);
  //   }
  //   public async onLeaveRoomSSC(socket: Socket, listener: (data: any) => void) {
  //     socket.on(SOCKET_EVENTS.END_CALL_SSC, listener);
  //   }
}

export default new SendMessageSocket();
