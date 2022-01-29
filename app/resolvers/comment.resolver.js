module.exports = {
  Query: {
    comments: async (parent, { lineId }, context) => (
      context.dataSources.commentApi.listComments(lineId)
    ),
  },
  Mutation: {
    createComment: async (parent, { lineId, ...data }, context) => (
      context.dataSources.commentApi.createComment(lineId, data)
    ),

    updateComment: async (parent, { lineId, id, ...data }, context) => (
      context.dataSources.commentApi.updateComment(lineId, id, data)
    ),

    deleteComment: async (parent, { lineId, id }, context) => (
      context.dataSources.commentApi.deleteComment(lineId, id)
    ),
  },
  Line: {
    comments: async (parent, args, context) => {
      const response = await context.dataSources.commentApi.listComments(parent.id);
      return response.results || [];
    },
  },
};
