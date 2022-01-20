import { model, Schema } from 'mongoose';
import { Event } from '../types';

export const EventModel = model<Event>('events', new Schema<Event>({
  groupId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'groups',
  },
  creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  attendees: [
    {
      email: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      optional: {
        type: Boolean,
        default: false,
      },
    },
  ],
  subject: {
    type: String,
    required: true,
  },
  startDateTime: {
    type: Number,
    required: true,
  },
  endDateTime: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
}));
