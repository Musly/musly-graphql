import { BaseError } from './BaseError';

export class ForbiddenError extends BaseError {
  constructor(message: string, customCode?: string) {
    super(message, customCode);
    this.statusCode = 403;
    this.code = customCode || 'E_FORBIDDEN';
  }
}
