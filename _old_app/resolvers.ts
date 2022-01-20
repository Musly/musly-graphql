/* eslint-disable global-require */
import { buildResolvers } from './utils/buildResolvers';
import { userResolver } from './user/UserResolver';
import { groupResolver } from './group/GroupResolver';
import { positionResolver } from './position/PositionResolver';
import { dashboardResolver } from './dashboard/DashboardResolver';
import { genreResolver } from './genre/GenreResolver';
import { keyResolver } from './key/KeyResolver';
import { artistResolver } from './artist/ArtistResolver';
import { songResolver } from './song/SongResolver';
import { commentResolver } from './comment/CommentResolver';
import { lineResolver } from './line/LineResolver';
import { sectionResolver } from './section/SectionResolver';
import { eventResolver } from './event/EventResolver';

export const resolvers = buildResolvers([
  userResolver,
  groupResolver,
  positionResolver,
  dashboardResolver,
  genreResolver,
  keyResolver,
  artistResolver,
  songResolver,
  commentResolver,
  lineResolver,
  sectionResolver,
  eventResolver,
]);
