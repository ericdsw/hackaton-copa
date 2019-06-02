declare global {
  interface Global { fetch: any; }
}

declare module NodeJS {
  interface Global {
    fetch: any;
  }
}

global.fetch = global.fetch || {};
