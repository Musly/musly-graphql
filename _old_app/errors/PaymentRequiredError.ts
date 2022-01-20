import { BaseError } from './BaseError';

export class PaymentRequiredError extends BaseError {
  constructor(message: string, customCode?: string) {
    super(message, customCode);
    this.statusCode = 402;
    this.code = customCode || 'E_PAYMENT_REQUIRED';
  }
}
