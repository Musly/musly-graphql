import { BaseError } from './BaseError';

export class MissingParameterError extends BaseError {
  constructor(message: string, customCode?: string) {
    super(message, customCode);
    this.statusCode = 409;
    this.code = customCode || 'E_MISSING_PARAMETER';
  }
}
