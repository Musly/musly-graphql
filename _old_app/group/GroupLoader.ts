import DataLoader from 'dataloader';
import { GroupModel } from './GroupModel';
import { UserId } from '../types';

async function loadGroupByUserIds(ids: UserId[]) {
  const rows = await GroupModel.find({ managerId: { $in: ids } });

  return ids.map((id) => (
    rows.filter((x) => (
      x.managerId.toString() === id.toString()
    ))
  ));
}

export const groupsByManagerIdLoader = new DataLoader(loadGroupByUserIds);
