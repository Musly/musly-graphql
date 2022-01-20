import { IResolvers } from '@graphql-tools/utils';
import { authenticate } from '../utils/authenticate';
import { NotFoundError } from '../errors';
import {
  Parent, Context, GroupId, KeyId, Group, Song,
} from '../types';
import { KeyModel } from './KeyModel';
import { keysByGroupIdsLoader, keyByIdLoader } from './KeyLoader';

interface KeysArgs {
  groupId: GroupId
}

interface CreateKeyArgs {
  title: string
  groupId: GroupId
}

interface UpdateKeyArgs {
  title: string
  id: KeyId
}

interface DeleteKeyArgs {
  id: KeyId
}

interface DeleteManyKeysArgs {
  ids: KeyId[]
}

export const keyResolver: IResolvers = {
  Query: {

    async keys(_: Parent, args: KeysArgs, context: Context) {
      authenticate(context);
      return keysByGroupIdsLoader.load(args.groupId);
    },

  },
  Mutation: {

    async createKey(_: Parent, args: CreateKeyArgs, context: Context) {
      authenticate(context);
      await KeyModel.create({ title: args.title, groupId: args.groupId });
      return keysByGroupIdsLoader.load(args.groupId);
    },

    async updateKey(_: Parent, args: UpdateKeyArgs, context: Context) {
      authenticate(context);
      const updatedKey = await KeyModel.findByIdAndUpdate(args.id, { title: args.title }).exec();

      if (!updatedKey) {
        throw new NotFoundError('Key does not exist');
      }

      return keysByGroupIdsLoader.load(updatedKey.groupId);
    },

    async deleteKey(_: Parent, args: DeleteKeyArgs, context: Context) {
      authenticate(context);
      const deletedKey = await KeyModel.findByIdAndDelete(args.id);

      if (!deletedKey) {
        throw new NotFoundError('Key does not exist');
      }

      return keysByGroupIdsLoader.load(deletedKey.groupId);
    },

    async deleteManyKeys(_: Parent, args: DeleteManyKeysArgs, context: Context) {
      authenticate(context);
      const deletedKeys = await KeyModel.deleteMany({ _id: { $in: args.ids } });
      return (deletedKeys.deletedCount === args.ids.length);
    },
  },
  Song: {
    async key(parent: Song) {
      const [key] = await keyByIdLoader.load(parent.keyId);
      return key || null;
    },
  },
  Group: {

    async keys(parent: Group) {
      return keysByGroupIdsLoader.load(parent.id);
    },

  },
};
