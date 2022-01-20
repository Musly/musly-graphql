import { IResolvers } from '@graphql-tools/utils';
import { authenticate } from '../utils/authenticate';
import {
  Parent, Context, GroupId, GenreId, Group, Song,
} from '../types';
import { NotFoundError } from '../errors';
import { GenreModel } from './GenreModel';
import { genresByGroupIdsLoader, genreByIdsLoader } from './GenreLoader';

interface GenresArgs {
  groupId: GroupId
}

interface CreateGenreArgs {
  title: string
  groupId: GroupId
}

interface UpdateGenreArgs {
  title: string
  id: GenreId
}

interface DeleteGenreArgs {
  id: GenreId
}

interface DeleteManyArgs {
  ids: GenreId[]
}

export const genreResolver: IResolvers = {
  Query: {

    async genres(_: Parent, args: GenresArgs, context: Context) {
      authenticate(context);
      return genresByGroupIdsLoader.load(args.groupId);
    },

  },
  Mutation: {

    async createGenre(_: Parent, args: CreateGenreArgs, context: Context) {
      authenticate(context);
      await GenreModel.create({
        title: args.title,
        groupId: args.groupId,
      });
      return genresByGroupIdsLoader.load(args.groupId);
    },

    async updateGenre(_: Parent, args: UpdateGenreArgs, context: Context) {
      authenticate(context);
      const updatedGenre = await GenreModel.findByIdAndUpdate(args.id, {
        title: args.title,
      }, { new: true }).exec();

      if (!updatedGenre) {
        throw new NotFoundError(`Genre not found: Genre ID: ${args.id}`);
      }

      return genresByGroupIdsLoader.load(updatedGenre.groupId);
    },

    async deleteGenre(_: Parent, args: DeleteGenreArgs, context: Context) {
      authenticate(context);

      const deletedGenre = await GenreModel.findByIdAndDelete(args.id);

      if (!deletedGenre) {
        throw new NotFoundError(`Genre not found: Genre ID: ${args.id}`);
      }

      return genresByGroupIdsLoader.load(deletedGenre.groupId);
    },

    async deleteManyGenres(_: Parent, args: DeleteManyArgs, context: Context) {
      authenticate(context);
      const deletedGenres = await GenreModel.deleteMany({ _id: { $in: args.ids } });
      return (deletedGenres.deletedCount === args.ids.length);
    },

  },
  Song: {
    async genre(parent: Song) {
      return genreByIdsLoader.load(parent.genreId);
    },
  },
  Group: {

    async genres(parent: Group) {
      return genresByGroupIdsLoader.load(parent.id);
    },

  },
};
