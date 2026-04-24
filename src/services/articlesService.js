import apiClient from './axiosClient';

/**
 * Articles Service - Handles articles API calls
 */
const articlesService = {
  /**
   * Get paginated feed
   * @param {number|null} cursor - Pagination cursor
   * @param {number} limit - Number of items per page (default: 10, max: 50)
   * @returns {Promise}
   */
  getFeed: async (cursor = null, limit = 10) => {
    const params = { limit: Math.min(limit, 50) };
    if (cursor !== null) {
      params.cursor = cursor;
    }

    const response = await apiClient.get('/api/v1/articles/feed', { params });
    return response.data;
  },

  /**
   * Get all articles with pagination
   * @param {number|null} cursor - Pagination cursor
   * @param {number} limit - Number of items per page (default: 10, max: 50)
   * @returns {Promise}
   */
  getAll: async (cursor = null, limit = 10) => {
    const params = { limit: Math.min(limit, 50) };
    if (cursor !== null) {
      params.cursor = cursor;
    }

    const response = await apiClient.get('/api/v1/articles/', { params });
    return response.data;
  },

  /**
   * Get single article by ID
   * @param {number} articleId - Article ID
   * @returns {Promise}
   */
  getArticle: async (articleId) => {
    const response = await apiClient.get(`/api/v1/articles/${articleId}`);
    return response.data;
  },

  /**
   * Get sources
   * @returns {Promise}
   */
  getSources: async () => {
    const response = await apiClient.get('/api/v1/sources/');
    return response.data;
  },
};

export default articlesService;
