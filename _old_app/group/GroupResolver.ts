import { IResolvers } from '@graphql-tools/utils';
import {
  Parent, Context, GroupId,
} from '../types';
import { authenticate } from '../utils/authenticate';
import { GroupModel } from './GroupModel';
import { groupsByManagerIdLoader } from './GroupLoader';

interface CreateGroupArgs {
  title: string
  type: string
}

interface UpdateGroupArgs {
  id: GroupId
  title?: string
  type?: string
}

interface DeleteGroupArgs {
  id: GroupId
}

export const groupResolver: IResolvers = {
  Query: {

    async groups(_: Parent, __: void, context: Context) {
      const token = authenticate(context);
      return groupsByManagerIdLoader.load(token.userId);
    },

  },
  Mutation: {

    async createGroup(_: Parent, args: CreateGroupArgs, context: Context) {
      const token = authenticate(context);
      await GroupModel.create({
        title: args.title,
        type: args.type,
        managerId: token.userId,
      });
      return groupsByManagerIdLoader.load(token.userId);
    },

    async updateGroup(_: Parent, args: UpdateGroupArgs, context: Context) {
      const token = authenticate(context);
      await GroupModel.findByIdAndUpdate(args.id, {
        ...args.title && { title: args.title },
        ...args.type && { type: args.type },
      }).exec();
      return groupsByManagerIdLoader.load(token.userId);
    },

    async deleteGroup(_: Parent, args: DeleteGroupArgs, context: Context) {
      const token = authenticate(context);
      await GroupModel.findByIdAndDelete(args.id);
      return groupsByManagerIdLoader.load(token.userId);
    },

  },
};
