import { IResolvers } from '@graphql-tools/utils';
import { authenticate } from '../utils/authenticate';
import {
  GroupId, Parent, Context, ArtistId, Group, Artist, Song,
} from '../types';
import { ArtistModel } from './ArtistModel';
import { artistByGroupIdLoader, artistByIdLoader } from './ArtistLoader';

/**
 * GET artists args
 */
interface ArtistsArgs {
  groupId: GroupId
}

/**
 * POST artist args.
 */
interface CreateArtistArgs {
  title: string
  groupId: GroupId
}

/**
 * PATCH artist args.
 */
interface UpdateArtistsArgs {
  id: ArtistId
  title: string
}

/**
 * DELETE artist args.
 */
interface DeleteArtistArgs {
  id: ArtistId
}

export const artistResolver: IResolvers = {
  Query: {

    async artists(_: Parent, args: ArtistsArgs, context: Context): Promise<Artist[]> {
      authenticate(context);
      return artistByGroupIdLoader.load(args.groupId);
    },

  },
  Mutation: {

    async createArtist(_: Parent, args: CreateArtistArgs, context: Context): Promise<Artist[]> {
      authenticate(context);
      await ArtistModel.create({
        title: args.title,
        groupId: args.groupId,
      });
      return artistByGroupIdLoader.load(args.groupId);
    },

    async updateArtist(_: Parent, args: UpdateArtistsArgs, context: Context): Promise<Artist[]> {
      authenticate(context);
      const updatedArtist = await ArtistModel.findByIdAndUpdate(args.id, {
        title: args.title,
      }, { new: true }).exec();
      return artistByGroupIdLoader.load(updatedArtist.groupId);
    },

    async deleteArtist(_: Parent, args: DeleteArtistArgs, context: Context): Promise<Artist[]> {
      authenticate(context);
      const deletedArtist = await ArtistModel.findByIdAndDelete(args.id);
      return artistByGroupIdLoader.load(deletedArtist.groupId);
    },

  },
  Song: {
    async artist(parent: Song): Promise<Artist> {
      const [artist] = await artistByIdLoader.load(parent.artistId);
      return artist || null;
    },
  },
  Group: {

    async artists(parent: Group): Promise<Artist[]> {
      return artistByGroupIdLoader.load(parent.id);
    },

  },
};
