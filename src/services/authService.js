import apiClient from './axiosClient';

/**
 * Auth Service - Handles authentication API calls
 */
const authService = {
  /**
   * Register new user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise}
   */
  register: async (email, password) => {
    const response = await apiClient.post('/api/v1/auth/register', {
      email,
      password,
    });
    return response.data;
  },

  /**
   * Login user
   * @param {string} username - User email/username
   * @param {string} password - User password
   * @returns {Promise}
   */
  login: async (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await apiClient.post('/api/v1/auth/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Get current user info
   * @returns {Promise}
   */
  getCurrentUser: async () => {
    const response = await apiClient.get('/api/v1/auth/me');
    return response.data;
  },

  /**
   * Refresh access token
   * @param {string} refreshToken - Refresh token
   * @returns {Promise}
   */
  refreshToken: async (refreshToken) => {
    const response = await apiClient.post(
      '/api/v1/auth/refresh',
      {},
      {
        headers: {
          'refresh-token': refreshToken,
        },
      }
    );
    return response.data;
  },
};

export default authService;
