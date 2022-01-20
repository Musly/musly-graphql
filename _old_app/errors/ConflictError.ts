import { BaseError } from './BaseError';

export class ConflictError extends BaseError {
  constructor(message: string, customCode?: string) {
    super(message, customCode);
    this.statusCode = 409;
    this.code = customCode || 'E_CONFLICT';
  }
}
