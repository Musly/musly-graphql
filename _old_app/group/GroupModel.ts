import { model, Schema } from 'mongoose';
import { Group } from '../types';

export const GroupModel = model<Group>('groups', new Schema<Group>({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  managerId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
}, {
  timestamps: true,
}));
