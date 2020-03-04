declare module "@telenotify/node" {
  interface TelenotifyClientSettings {
    server: string;
    key: string;
  }

  interface TelenotifyClient {
    send(message: string): Promise<any>;
  }

  interface TelenotifyClientConstructable {
    new (settings: TelenotifyClientSettings): TelenotifyClient;
  }

  export default TelenotifyClientConstructable;
}
