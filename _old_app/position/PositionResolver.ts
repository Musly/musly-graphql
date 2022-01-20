import { IResolvers } from '@graphql-tools/utils';
import { PositionModel } from './PositionModel';
import { authenticate } from '../utils/authenticate';
import {
  Parent, Context, PositionId, GroupId, UserId, Group,
} from '../types';
import { positionsByGroupIdLoader } from './PositionLoader';

interface PositionsArgs {
  groupId: GroupId
}

interface CreatePositionArgs {
  title: string
  groupId: GroupId
  userId?: UserId
}

interface UpdatePositionArgs {
  positionId: PositionId
  title: string
  userId?: UserId
}

interface DeletePositionArgs {
  positionId: PositionId
}

export const positionResolver: IResolvers = {
  Query: {

    async positions(_: Parent, args: PositionsArgs, context: Context) {
      authenticate(context);
      return positionsByGroupIdLoader.load(args.groupId);
    },

  },
  Mutation: {

    async createPosition(_: Parent, args: CreatePositionArgs, context: Context) {
      authenticate(context);
      await PositionModel.create({
        title: args.title,
        groupId: args.groupId,
        ...args.userId && { userId: args.userId },
      });
      return positionsByGroupIdLoader.load(args.groupId);
    },

    async updatePosition(_: Parent, args: UpdatePositionArgs, context: Context) {
      authenticate(context);
      const updatedPosition = await PositionModel.findByIdAndUpdate(args.positionId, {
        title: args.title,
        ...args.userId && { userId: args.userId },
      }, { new: true }).exec();
      return positionsByGroupIdLoader.load(updatedPosition.groupId);
    },

    async deletePosition(_: Parent, args: DeletePositionArgs, context: Context) {
      authenticate(context);
      const deletedPosition = await PositionModel.findByIdAndDelete(args.positionId);
      return positionsByGroupIdLoader.load(deletedPosition.groupId);
    },

  },
  Group: {

    async positions(parent: Group, _, context: Context) {
      authenticate(context);
      return positionsByGroupIdLoader.load(parent.id);
    },

  },
};
