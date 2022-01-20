import { IResolvers } from '@graphql-tools/utils';
import {
  Dashboard, Parent, Context, GroupId,
} from '../types';
import { authenticate } from '../utils/authenticate';
import { SongModel } from '../song/SongModel';
import { GenreModel } from '../genre/GenreModel';

interface DashboardArgs {
  groupId: GroupId
}

export const dashboardResolver: IResolvers = {
  Query: {

    async dashboard(_: Parent, args: DashboardArgs, context: Context): Promise<Dashboard> {
      authenticate(context);

      const songCount = await SongModel.countDocuments({ groupId: args.groupId }).exec();
      const genreCount = await GenreModel.countDocuments({ groupId: args.groupId }).exec();

      return {
        songCount,
        genreCount,
      };
    },

  },
};
