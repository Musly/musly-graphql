import { IResolvers } from '@graphql-tools/utils';
import { authenticate } from '../utils/authenticate';
import {
  Parent, Context, GroupId, Group, Attendee, EventId,
} from '../types';
import { NotFoundError } from '../errors';
import { EventModel } from './EventModel';
import { eventsByGroupIdsLoader } from './EventLoader';

interface EventsArgs {
  groupId: GroupId
}

interface EventBaseData {
  attendees: Attendee[],
  subject: string
  startDateTime: number
  endDateTime: number
  description?: string
}

interface CreateEventArgs extends EventBaseData {
  groupId: GroupId
}

interface UpdateEventArgs extends EventBaseData {
  id: EventId
}

interface DeleteEventArgs {
  id: EventId
}

interface DeleteManyEventsArgs {
  ids: EventId[]
}

export const eventResolver: IResolvers = {
  Query: {

    async events(_: Parent, args: EventsArgs, context: Context) {
      authenticate(context);
      return eventsByGroupIdsLoader.load(args.groupId);
    },

  },
  Mutation: {

    async createEvent(_: Parent, args: CreateEventArgs, context: Context) {
      const token = authenticate(context);
      await EventModel.create({
        groupId: args.groupId,
        creator: token.userId,
        attendees: args.attendees,
        subject: args.subject,
        startDateTime: args.startDateTime,
        endDateTime: args.endDateTime,
        description: args.description,
      });
      return eventsByGroupIdsLoader.load(args.groupId);
    },

    async updateEvent(_: Parent, args: UpdateEventArgs, context: Context) {
      authenticate(context);
      const updatedEvent = await EventModel.findByIdAndUpdate(args.id, {
        attendees: args.attendees,
        subject: args.subject,
        startDateTime: args.startDateTime,
        endDateTime: args.endDateTime,
        description: args.description,
      });

      if (!updatedEvent) {
        throw new NotFoundError(`Event not found: Event ID: ${args.id}`);
      }

      return eventsByGroupIdsLoader.load(updatedEvent.groupId);
    },

    async deleteEvent(_: Parent, args: DeleteEventArgs, context: Context) {
      authenticate(context);
      const deletedEvent = await EventModel.findByIdAndDelete(args.id);

      if (!deletedEvent) {
        throw new NotFoundError(`Event not found: Event ID: ${args.id}`);
      }

      return eventsByGroupIdsLoader.load(deletedEvent.groupId);
    },

    async deleteManyEvents(_: Parent, args: DeleteManyEventsArgs, context: Context) {
      authenticate(context);
      const deletedEvents = await EventModel.deleteMany({ _id: { $in: args.ids } });
      return (deletedEvents.deletedCount === args.ids.length);
    },

  },
  Group: {

    async events(parent: Group) {
      return eventsByGroupIdsLoader.load(parent.id);
    },

  },
};
