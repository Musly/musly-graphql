import DataLoader from 'dataloader';
import { ArtistModel } from './ArtistModel';
import { GroupId, ArtistId } from '../types';

async function loadArtistsByGroupIds(ids: GroupId[]) {
  const rows = await ArtistModel.find({ groupId: { $in: ids } });

  return ids.map((id) => (
    rows.filter((x) => (
      x.groupId.toString() === id.toString()
    ))
  ));
}

export const artistByGroupIdLoader = new DataLoader(loadArtistsByGroupIds);

async function loadArtistByIds(ids: ArtistId[]) {
  const rows = await ArtistModel.find({ _id: { $in: ids } });

  return ids.map((id) => (
    rows.filter((x) => (
      x._id.toString() === id.toString()
    ))
  ));
}

export const artistByIdLoader = new DataLoader(loadArtistByIds);
