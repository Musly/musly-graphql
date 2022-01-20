import DataLoader from 'dataloader';
import { EventModel } from './EventModel';
import { GroupId } from '../types';

async function loadEventByGroupIds(ids: GroupId[]) {
  const rows = await EventModel.find({ groupId: { $in: ids } });

  return ids.map((id) => (
    rows.filter((item) => (
      item.groupId.toString() === id.toString()
    ))
  ));
}

export const eventsByGroupIdsLoader = new DataLoader(loadEventByGroupIds);
