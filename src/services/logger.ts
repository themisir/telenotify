class Logger {
  serviceName: string;

  constructor(serviceName) {
    this.serviceName = serviceName;
  }

  debug(...args: any[]) {
    console.log(`[${this.serviceName}]`, ...args);
  }

  info(...args: any[]) {
    console.info(`[${this.serviceName}]`, ...args);
  }

  error(...args: any[]) {
    console.error(`[${this.serviceName}]`, ...args);
  }
}

export default Logger;