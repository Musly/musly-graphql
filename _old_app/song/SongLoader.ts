import DataLoader from 'dataloader';
import { SongModel } from './SongModel';
import { GroupId } from '../types';

async function loadSongByGroupIds(ids: GroupId[]) {
  const rows = await SongModel.find({ groupId: { $in: ids } });

  return ids.map((id) => (
    rows.filter((item) => (
      item.groupId.toString() === id.toString()
    ))
  ));
}

export const songByGroupIdsLoader = new DataLoader(loadSongByGroupIds);
