import { model, Schema } from 'mongoose';
import { Position } from '../types';

export const PositionModel = model<Position>('positions', new Schema<Position>({
  groupId: {
    type: Schema.Types.ObjectId,
    ref: 'groups',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
}));
