export class BaseError extends Error {
  name: string;

  statusCode: number;

  code?: string;

  constructor(message: string, customCode?: string) {
    super(message);

    this.statusCode = 500;
    this.code = customCode;
  }
}
