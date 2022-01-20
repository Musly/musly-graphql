import DataLoader from 'dataloader';
import { KeyModel } from './KeyModel';
import { GroupId, KeyId } from '../types';

async function loadKeyByGroupIds(ids: GroupId[]) {
  const rows = await KeyModel.find({ groupId: { $in: ids } });

  return ids.map((id) => (
    rows.filter((item) => (
      item.groupId.toString() === id.toString()
    ))
  ));
}

export const keysByGroupIdsLoader = new DataLoader(loadKeyByGroupIds);

async function loadKeyByIds(ids: KeyId[]) {
  const rows = await KeyModel.find({ _id: { $in: ids } });

  return ids.map((id) => (
    rows.filter((item) => (
      item._id.toString() === id.toString()
    ))
  ));
}

export const keyByIdLoader = new DataLoader(loadKeyByIds);
