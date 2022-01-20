import { BaseError } from './BaseError';

export class InvalidCredentialsError extends BaseError {
  constructor(message: string, customCode?: string) {
    super(message, customCode);
    this.statusCode = 401;
    this.code = customCode || 'E_INVALID_CREDENTIALS';
  }
}
