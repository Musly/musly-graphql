import { IResolvers } from '@graphql-tools/utils';
import { authenticate } from '../utils/authenticate';
import { NotFoundError } from '../errors';
import {
  Parent, Context, GroupId, GenreId, ArtistId, SongId, Group, KeyId,
} from '../types';
import { SongModel } from './SongModel';
import { songByGroupIdsLoader } from './SongLoader';

interface SongsArgs {
  groupId: GroupId
}

interface CreateSongArgs {
  groupId: GroupId,
  title: string,
  genreId?: GenreId,
  artistId: ArtistId,
  keyId?: KeyId,
  duration?: number
}

interface UpdateSongArgs extends CreateSongArgs {
  id: SongId
}

interface DeleteSongArgs {
  id: SongId
}

export const songResolver: IResolvers = {
  Query: {

    async songs(_: Parent, args: SongsArgs, context: Context) {
      authenticate(context);
      return songByGroupIdsLoader.load(args.groupId);
    },

  },
  Mutation: {

    async createSong(_: Parent, args: CreateSongArgs, context: Context) {
      authenticate(context);
      await SongModel.create({
        groupId: args.groupId,
        title: args.title,
        genreId: args.genreId || null,
        artistId: args.artistId || null,
        keyId: args.keyId || null,
        duration: args.duration || null,
      });
      return songByGroupIdsLoader.load(args.groupId);
    },

    async updateSong(_: Parent, args: UpdateSongArgs, context: Context) {
      authenticate(context);
      const updatedSong = await SongModel.findByIdAndUpdate(args.id, {
        ...args.title && { title: args.title },
        ...args.genreId && { genreId: args.genreId },
        ...args.artistId && { artistId: args.artistId },
        ...args.keyId && { keyId: args.keyId },
        ...args.duration && { duration: args.duration },
      }).exec();

      if (!updatedSong) {
        throw new NotFoundError(`Song not found! Song ID: ${args.id}`);
      }

      return songByGroupIdsLoader.load(updatedSong.groupId);
    },

    async deleteSong(_: Parent, args: DeleteSongArgs, context: Context) {
      authenticate(context);
      const deletedSong = await SongModel.findByIdAndDelete(args.id);

      if (!deletedSong) {
        throw new NotFoundError(`Song not found! Song ID: ${args.id}`);
      }

      return songByGroupIdsLoader.load(deletedSong.groupId);
    },

  },
  Group: {

    async songs(parent: Group) {
      return songByGroupIdsLoader.load(parent.id);
    },

  },
};
