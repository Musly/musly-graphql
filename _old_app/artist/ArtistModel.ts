import { model, Schema } from 'mongoose';
import { Artist } from '../types';

export const ArtistModel = model<Artist>('artists', new Schema<Artist>({
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
