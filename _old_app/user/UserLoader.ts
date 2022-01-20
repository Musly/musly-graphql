import DataLoader from 'dataloader';
import { UserModel } from './UserModel';
import { UserId } from '../types';

async function loadUsersByIds(ids: UserId[]) {
  const rows = await UserModel.find({ _id: { $in: ids } });

  return ids.map((id) => (
    rows.filter((user) => (
      user.id.toString() === id.toString()
    ))
  ));
}

export const usersByIdLoader = new DataLoader(loadUsersByIds);

async function loadUsersByEmail(emails: string[]) {
  const rows = await UserModel.find({ email: { $in: emails } });

  return emails.map((email) => (
    rows.filter((user) => (
      user.email === email
    ))
  ));
}

export const usersByEmailLoader = new DataLoader(loadUsersByEmail);
