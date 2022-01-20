import { model, Schema } from 'mongoose';
import { Song } from '../types';

export const SongModel = model<Song>('songs', new Schema<Song>({
  groupId: {
    type: Schema.Types.ObjectId,
    ref: 'groups',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  genreId: {
    type: Schema.Types.ObjectId,
    ref: 'genres',
    default: null,
  },
  artistId: {
    type: Schema.Types.ObjectId,
    ref: 'artists',
    default: null,
  },
  keyId: {
    type: Schema.Types.ObjectId,
    ref: 'keys',
    default: null,
  },
  duration: {
    type: Number,
    default: null,
  },
}, {
  timestamps: true,
}));
