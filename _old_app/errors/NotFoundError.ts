import { BaseError } from './BaseError';

export class NotFoundError extends BaseError {
  constructor(message: string, customCode?: string) {
    super(message, customCode);
    this.statusCode = 404;
    this.code = customCode || 'E_NOT_FOUND';
  }
}
