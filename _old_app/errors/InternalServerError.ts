import { BaseError } from './BaseError';

export class InternalServerError extends BaseError {
  constructor(message: string, customCode?: string) {
    super(message, customCode);
    this.statusCode = 500;
    this.code = customCode || 'E_INTERNAL_SERVER_ERROR';
  }
}
