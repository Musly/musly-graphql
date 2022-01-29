const BaseApi = require('../BaseApi');

class CommentApi extends BaseApi {
  listComments = async (lineId) => (
    this.get(`/comment/${lineId}`)
  );

  createComment = async (lineId, data) => (
    this.post(`/comment/${lineId}`, data)
  );

  updateComment = async (lineId, commentId, data) => (
    this.patch(`/comment/${lineId}/${commentId}`, data)
  );

  deleteComment = async (lineId, commentId) => (
    this.delete(`/comment/${lineId}/${commentId}`)
  );
}

module.exports = CommentApi;
