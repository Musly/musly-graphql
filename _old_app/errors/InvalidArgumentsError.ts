import { BaseError } from './BaseError';

export class InvalidArgumentsError extends BaseError {
  constructor(message: string, customCode?: string) {
    super(message, customCode);
    this.statusCode = 409;
    this.code = customCode || 'E_INVALID_ARGUMENTS';
  }
}
