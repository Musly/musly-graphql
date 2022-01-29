module.exports = {
  Query: {
    comments: (parent, { lineId }, context) => (
      context.dataSources.commentApi.listComments(lineId)
    ),
  },
  Mutation: {
    createComment: (parent, { lineId, ...data }, context) => (
      context.dataSources.commentApi.createComment(lineId, data)
    ),

    updateComment: (parent, { lineId, id, ...data }, context) => (
      context.dataSources.commentApi.updateComment(lineId, id, data)
    ),

    deleteComment: (parent, { lineId, id }, context) => (
      context.dataSources.commentApi.deleteComment(lineId, id)
    ),
  },
  Line: {
    comments: (parent, args, context) => (
      context.dataSources.commentApi.listComments(parent.id)
    ),
  },
};
