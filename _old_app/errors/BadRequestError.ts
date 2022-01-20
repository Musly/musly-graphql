import { BaseError } from './BaseError';

export class BadRequestError extends BaseError {
  constructor(message: string, customCode?: string) {
    super(message, customCode);
    this.statusCode = 400;
    this.code = customCode || 'E_BAD_REQUEST';
  }
}
