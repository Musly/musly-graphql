import DataLoader from 'dataloader';
import { CommentModel } from './CommentModel';
import { LineId } from '../types';

async function loadCommentByLineIds(ids: LineId[]) {
  const rows = await CommentModel.find({ lineId: { $in: ids } });

  return ids.map((id) => (
    rows.filter((comment) => (
      comment.lineId.toString() === id.toString()
    ))
  ));
}

export const commentByLineIdLoader = new DataLoader(loadCommentByLineIds);
