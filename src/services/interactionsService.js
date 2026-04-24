import apiClient from './axiosClient';

/**
 * Interactions Service - Handles articles interactions (likes, notes, status)
 */
const interactionsService = {
  /**
   * Get all user interactions
   * @returns {Promise}
   */
  getAll: async () => {
    const response = await apiClient.get('/api/v1/interactions/');
    return response.data;
  },

  /**
   * Update interaction for an article
   * @param {number} articleId - Article ID
   * @param {object} data - Interaction data
   * @param {boolean} data.is_liked - Is article liked
   * @param {string} data.note - User note
   * @param {string} data.status - Article status (unread, reading, archived, trash)
   * @returns {Promise}
   */
  updateInteraction: async (articleId, data) => {
    const response = await apiClient.patch(
      `/api/v1/interactions/${articleId}`,
      data
    );
    return response.data;
  },

  /**
   * Toggle like on article
   * @param {number} articleId - Article ID
   * @param {boolean} isLiked - Is liked
   * @returns {Promise}
   */
  toggleLike: async (articleId, isLiked) => {
    return interactionsService.updateInteraction(articleId, { is_liked: isLiked });
  },

  /**
   * Add note to article
   * @param {number} articleId - Article ID
   * @param {string} note - Note text
   * @returns {Promise}
   */
  addNote: async (articleId, note) => {
    return interactionsService.updateInteraction(articleId, { note });
  },

  /**
   * Update article status
   * @param {number} articleId - Article ID
   * @param {string} status - Status (unread, reading, archived, trash)
   * @returns {Promise}
   */
  updateStatus: async (articleId, status) => {
    return interactionsService.updateInteraction(articleId, { status });
  },
};

export default interactionsService;
