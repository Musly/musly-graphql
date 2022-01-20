import { IResolvers } from '@graphql-tools/utils';
import { authenticate } from '../utils/authenticate';
import { NotFoundError } from '../errors';
import {
  Parent, Context, SectionId, SongId, Song,
} from '../types';
import { SectionModel } from './SectionModel';
import { sectionBySongIdsLoader } from './SectionLoader';

interface SectionsArgs {
  songId: SongId
}

interface CreateSectionArgs {
  title: string
  songId: SongId
}

interface UpdateSectionArgs {
  id: SectionId
  title: string
}

interface DeleteSectionArgs {
  id: SectionId
}

export const sectionResolver: IResolvers = {
  Query: {

    async sections(_: Parent, args: SectionsArgs, context: Context) {
      authenticate(context);
      return sectionBySongIdsLoader.load(args.songId);
    },

  },
  Mutation: {

    async createSection(_: Parent, args: CreateSectionArgs, context: Context) {
      authenticate(context);
      await SectionModel.create({
        title: args.title,
        songId: args.songId,
      });
      return sectionBySongIdsLoader.load(args.songId);
    },

    async updateSection(_: Parent, args: UpdateSectionArgs, context: Context) {
      authenticate(context);
      const updatedSection = await SectionModel.findByIdAndUpdate(args.id, {
        title: args.title,
      }).exec();

      if (!updatedSection) {
        throw new NotFoundError('Section could not be found!');
      }

      return sectionBySongIdsLoader.load(updatedSection.songId);
    },

    async deleteSection(_: Parent, args: DeleteSectionArgs, context: Context) {
      authenticate(context);
      const deletedSection = await SectionModel.findByIdAndDelete(args.id);

      if (!deletedSection) {
        throw new NotFoundError('Section could not be found!');
      }

      return sectionBySongIdsLoader.load(deletedSection.songId);
    },

  },
  Song: {

    async sections(parent: Song) {
      return sectionBySongIdsLoader.load(parent.id);
    },

  },
};
