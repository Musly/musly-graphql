import { model, Schema } from 'mongoose';
import { Line } from '../types';

export const LineModel = model<Line>('lines', new Schema<Line>({
  sectionId: {
    type: Schema.Types.ObjectId,
    ref: 'sections',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
}));
