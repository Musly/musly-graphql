import { BaseError } from './BaseError';

export class RequestTimeoutError extends BaseError {
  constructor(message: string, customCode?: string) {
    super(message, customCode);
    this.statusCode = 406;
    this.code = customCode || 'E_REQUEST_TIMEOUT';
  }
}
