import { model, Schema } from 'mongoose';
import { Key } from '../types';

export const KeyModel = model<Key>('keys', new Schema<Key>({
  title: {
    type: String,
    required: true,
  },
  groupId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'groups',
  },
}, {
  timestamps: true,
}));
