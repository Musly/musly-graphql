import { BaseError } from './BaseError';

export class MethodNotAllowedError extends BaseError {
  constructor(message: string, customCode?: string) {
    super(message, customCode);
    this.statusCode = 405;
    this.code = customCode || 'E_METHOD_NOT_ALLOWED';
  }
}
