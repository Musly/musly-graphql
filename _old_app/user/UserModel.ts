import { model, Schema } from 'mongoose';
import { User } from '../types';

export const UserModel = model<User>('users', new Schema<User>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  emailToken: {
    type: String,
    default: null,
  },
  firstName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    default: null,
  },
  displayName: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
}, {
  timestamps: true,
}));
