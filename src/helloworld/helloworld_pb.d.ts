export class HelloRequest {
  constructor ();
  getName(): string;
  setName(a: string): void;
  toObject(): HelloRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => HelloRequest;
}

export namespace HelloRequest {
  export type AsObject = {
    name: string;
  }
}

export class HelloReply {
  constructor ();
  getMessage(): string;
  setMessage(a: string): void;
  getRegion(): string;
  setRegion(a: string): void;
  toObject(): HelloReply.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => HelloReply;
}

export namespace HelloReply {
  export type AsObject = {
    message: string;
    region: string;
  }
}

