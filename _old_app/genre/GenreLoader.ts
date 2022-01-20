import DataLoader from 'dataloader';
import { GenreModel } from './GenreModel';
import { GroupId, GenreId } from '../types';

async function loadGenreByGroupIds(ids: GroupId[]) {
  const rows = await GenreModel.find({ groupId: { $in: ids } });

  return ids.map((id) => (
    rows.filter((item) => (
      item.groupId.toString() === id.toString()
    ))
  ));
}

export const genresByGroupIdsLoader = new DataLoader(loadGenreByGroupIds);

async function loadGenreByIds(ids: GenreId[]) {
  const rows = await GenreModel.find({ _id: { $in: ids } });

  return ids.map((id) => (
    rows.filter((item) => (
      item.id.toString() === id.toString()
    ))
  ));
}

export const genreByIdsLoader = new DataLoader(loadGenreByIds);
