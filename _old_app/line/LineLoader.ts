import DataLoader from 'dataloader';
import { LineModel } from './LineModel';
import { SectionId } from '../types';

async function loadLineBySectionIds(ids: SectionId[]) {
  const rows = await LineModel.find({ sectionId: { $in: ids } });

  return ids.map((id) => (
    rows.filter((item) => (
      item.sectionId.toString() === id.toString()
    ))
  ));
}

export const linesBySectionIdsLoader = new DataLoader(loadLineBySectionIds);
