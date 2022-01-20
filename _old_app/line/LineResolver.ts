import { IResolvers } from '@graphql-tools/utils';
import { authenticate } from '../utils/authenticate';
import { NotFoundError } from '../errors';
import {
  Parent, Context, SectionId, LineId, Section,
} from '../types';
import { LineModel } from './LineModel';
import { linesBySectionIdsLoader } from './LineLoader';

interface LinesArgs {
  sectionId: SectionId
}

interface CreateLineArgs {
  content: string
  type: string
  sectionId: SectionId
}

interface UpdateLineArgs {
  id: LineId
  content?: string
  type?: string
}

interface DeleteLineArgs {
  id: LineId
}

export const lineResolver: IResolvers = {
  Query: {

    async lines(_: Parent, args: LinesArgs, context: Context) {
      authenticate(context);
      return linesBySectionIdsLoader.load(args.sectionId);
    },

  },
  Mutation: {

    async createLine(_: Parent, args: CreateLineArgs, context: Context) {
      authenticate(context);
      await LineModel.create({
        content: args.content,
        type: args.type,
        sectionId: args.sectionId,
      });
      return linesBySectionIdsLoader.load(args.sectionId);
    },

    async updateLine(_: Parent, args: UpdateLineArgs, context: Context) {
      authenticate(context);
      const updatedLine = await LineModel.findByIdAndUpdate(args.id, {
        ...args.content && { content: args.content },
        ...args.type && { type: args.type },
      }).exec();

      if (!updatedLine) {
        throw new NotFoundError('Line could not found!');
      }

      return linesBySectionIdsLoader.load(updatedLine.sectionId);
    },

    async deleteLine(_: Parent, args: DeleteLineArgs, context: Context) {
      authenticate(context);
      const deletedLine = await LineModel.findByIdAndDelete(args.id);

      if (!deletedLine) {
        throw new NotFoundError('Line could not found!');
      }

      return linesBySectionIdsLoader.load(deletedLine.sectionId);
    },

  },
  Section: {

    async lines(parent: Section) {
      return linesBySectionIdsLoader.load(parent.id);
    },

  },
};
