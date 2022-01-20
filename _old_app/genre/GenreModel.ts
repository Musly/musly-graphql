import { model, Schema } from 'mongoose';
import { Genre } from '../types';

export const GenreModel = model<Genre>('genres', new Schema<Genre>({
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
