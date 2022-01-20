import { BaseError } from './BaseError';

export class UnsupportedMediaTypeError extends BaseError {
  constructor(message: string, customCode?: string) {
    super(message, customCode);
    this.statusCode = 415;
    this.code = customCode || 'E_UNSUPPORTED_MEDIA_TYPE';
  }
}
