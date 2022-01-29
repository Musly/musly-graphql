const BaseApi = require('../BaseApi');

class CommentApi extends BaseApi {
  listComments = (lineId) => (
    this.get(`/comment/${lineId}`)
  );

  createComment = (lineId, data) => (
    this.post(`/comment/${lineId}`, data)
  );

  updateComment = (lineId, commentId, data) => (
    this.patch(`/comment/${lineId}/${commentId}`, data)
  );

  deleteComment = (lineId, commentId) => (
    this.delete(`/comment/${lineId}/${commentId}`)
  );
}

module.exports = CommentApi;
