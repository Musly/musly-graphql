import { model, Schema } from 'mongoose';
import { Section } from '../types';

export const SectionModel = model<Section>('sections', new Schema<Section>({
  title: {
    type: String,
    required: true,
  },
  songId: {
    type: Schema.Types.ObjectId,
    ref: 'songs',
    required: true,
  },
}, {
  timestamps: true,
}));
