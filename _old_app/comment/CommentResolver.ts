import { IResolvers } from '@graphql-tools/utils';
import { authenticate } from '../utils/authenticate';
import { NotFoundError } from '../errors';
import {
  Parent, Context, CommentId, LineId, Line,
} from '../types';
import { CommentModel } from './CommentModel';
import { commentByLineIdLoader } from './CommentLoader';

interface CommentsArgs {
  lineId: LineId
}

interface CreateCommentArgs {
  comment: string
  lineId: LineId
}

interface UpdateCommentArgs {
  id: CommentId
  comment: string
}

interface DeleteCommentArgs {
  id: CommentId
}

export const commentResolver: IResolvers = {
  Query: {

    async comments(_: Parent, args: CommentsArgs, context: Context) {
      authenticate(context);
      return commentByLineIdLoader.load(args.lineId);
    },

  },
  Mutation: {

    async createComment(_: Parent, args: CreateCommentArgs, context: Context) {
      const token = authenticate(context);
      await CommentModel.create({
        comment: args.comment,
        lineId: args.lineId,
        userId: token.userId,
      });
      return commentByLineIdLoader.load(args.lineId);
    },

    async updateComment(_: Parent, args: UpdateCommentArgs, context: Context) {
      authenticate(context);
      const updatedComment = await CommentModel.findByIdAndUpdate(args.id, {
        comment: args.comment,
      }).exec();

      if (!updatedComment) {
        throw new NotFoundError('Comment could not be found!');
      }

      return commentByLineIdLoader.load(updatedComment.lineId);
    },

    async deleteComment(_: Parent, args: DeleteCommentArgs, context: Context) {
      authenticate(context);
      const deletedComment = await CommentModel.findByIdAndDelete(args.id);

      if (!deletedComment) {
        throw new NotFoundError('Comment could not be found!');
      }

      return commentByLineIdLoader.load(deletedComment.lineId);
    },

  },
  Line: {

    async comments(parent: Line) {
      return commentByLineIdLoader.load(parent.id);
    },

  },
};
