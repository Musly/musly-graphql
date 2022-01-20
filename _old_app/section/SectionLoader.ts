import DataLoader from 'dataloader';
import { SectionModel } from './SectionModel';
import { SongId } from '../types';

async function loadSectionBySongIds(ids: SongId[]) {
  const rows = await SectionModel.find({ songId: { $in: ids } });

  return ids.map((id) => (
    rows.filter((item) => (
      item.songId.toString() === id.toString()
    ))
  ));
}

export const sectionBySongIdsLoader = new DataLoader(loadSectionBySongIds);
