import apiClient from './apiClient';

export const postApi = {
  getAllPost(newParams) {
    const url = '/posts';
    return apiClient.get(url, { params: newParams });
  },
  getPostById(id) {
    const url = `/posts/${id}`;
    return apiClient.get(url);
  },
  createPost(data) {
    const url = '/posts';
    return apiClient.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  updatePost(data, id) {
    const url = `/posts/${id}`;
    return apiClient.patch(url, data);
  },
  updateLike(id) {
    const url = `/posts/like`;
    return apiClient.patch(url, { _id: id });
  },
  updateMessage(id, value) {
    const url = `/posts/message/${id}`;
    return apiClient.patch(url, value);
  },
  deletePost(id) {
    const url = `/posts/${id}`;
    return apiClient.delete(url);
  },
};
