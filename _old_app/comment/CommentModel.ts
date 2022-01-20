import { model, Schema } from 'mongoose';
import { Comment } from '../types';

export const CommentModel = model<Comment>('comments', new Schema<Comment>({
  comment: {
    type: String,
    required: true,
  },
  lineId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'songSectionLines',
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
}, {
  timestamps: true,
}));
