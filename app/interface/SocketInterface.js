// interface ServerConfig {
//     defaultLogLength: number;
//     serverUrl: string;
//   }

//   interface Options {
//     logGuid: string;
//     bufferLength: number;
//     serverConfig: ServerConfig;
//     worker: boolean;
//     maxConcurrency: number;
//   }

export default class SocketInterface {
  options;
  binded_f;
  socket;
  room_;

  constructor(room) {
    this.options = {
      logGuid: "mock",
      bufferLength: 50,
      serverConfig: {
        defaultLogLength: 300,
        //TODO
        serverUrl: `ws://??/ws/chat/${room}/`,
      },
      worker: true,
      maxConcurrency: 10,
    };
    this.binded_f = {};
    this.socket = null;
    this.room_ = room;
  }

  get room() {
    return this.room_;
  }

  connect() {
    this.socket = new WebSocket(this.options.serverConfig.serverUrl);
  }

  registerEvent(key, f, pointer) {
    this.binded_f[key] = pointer ? f.bind(pointer) : f;
    this.socket?.addEventListener(key, this.binded_f[key]);
  }

  send(message) {
    this.socket?.send(message);
  }
}
