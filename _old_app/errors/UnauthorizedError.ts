import { BaseError } from './BaseError';

export class UnauthorizedError extends BaseError {
  constructor(message: string, customCode?: string) {
    super(message, customCode);
    this.statusCode = 401;
    this.code = customCode || 'E_UNAUTHORIZED';
  }
}
