import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Manager, Socket } from 'socket.io-client';

class SocketService {
  public socket: Socket | null = null;

  public connect(
    url: string,
    token: string
    // fcmToken: string | null
  ): Promise<Socket<DefaultEventsMap, DefaultEventsMap>> {
    if (!!!this.socket) {
      return new Promise((rs, rj) => {
        const clientManager = new Manager(url, {
          extraHeaders: {
            Authorization: `Bearer ${token}`,
          },
          // transports: ['websocket', 'polling'],
          secure: true,
          reconnection: true,
          rejectUnauthorized: true,
          query: {
            secret: 'appfake@waodate.com',
            authorization: `Bearer ${token}`,
          },
        });
        const optionAuth: {
          auth: {
            authorization: string;
            fcmToken?: string;
          };
        } = {
          auth: {
            authorization: `Bearer ${token}`,
          },
        };

        // if (fcmToken) {
        //   optionAuth.auth.fcmToken = fcmToken;
        // }
        this.socket = clientManager.socket('/', optionAuth);

        if (!this.socket) return rj();

        this.socket.on('connect', () => {
          console.log('connect');
          rs(this.socket as Socket);
        });

        this.socket.on('connect_error', (err) => {
          rj(err);
        });
      });
    }
    return new Promise((rs, rj) => {
      console.log('connected', rs, rj);
      rs(this.socket as Socket);
    });
  }

  //   public sendDevice(payload: Partial<DEVICE_APP_MODEL>) {
  //     this.socket?.emit('SEND_INFO_DEVICE_CSS', payload);
  //   }

  public disconnect() {
    this.socket?.disconnect();
  }
}

export default new SocketService();
