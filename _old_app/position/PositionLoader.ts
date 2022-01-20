import DataLoader from 'dataloader';
import { PositionModel } from './PositionModel';
import { GroupId } from '../types';

async function loadPositionsByGroupIds(ids: GroupId[]) {
  const rows = await PositionModel.find({ groupId: { $in: ids } });

  return ids.map((id) => (
    rows.filter((x) => (
      x.groupId.toString() === id.toString()
    ))
  ));
}

export const positionsByGroupIdLoader = new DataLoader(loadPositionsByGroupIds);
