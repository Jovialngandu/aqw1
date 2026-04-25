import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { articlesService } from '@services';

/**
 * Async thunks
 */
export const fetchFeed = createAsyncThunk(
  'articles/fetchFeed',
  async ({ cursor = null, limit = 10 }, { rejectWithValue }) => {
    try {
      const result = await articlesService.getAll(cursor, limit);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchArticle = createAsyncThunk(
  'articles/fetchArticle',
  async (articleId, { rejectWithValue }) => {
    try {
      const result = await articlesService.getArticle(articleId);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllArticles = createAsyncThunk(
  'articles/fetchAllArticles',
  async ({ cursor = null, limit = 10 }, { rejectWithValue }) => {
    try {
      const result = await articlesService.getAll(cursor, limit);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchSources = createAsyncThunk(
  'articles/fetchSources',
  async (_, { rejectWithValue }) => {
    try {
      const result = await articlesService.getSources();
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/**
 * Articles Slice
 */
const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    feed: {
      items: [],
      nextCursor: null,
      hasMore: true,
    },
    allArticles: {
      items: [],
      nextCursor: null,
      hasMore: true,
    },
    currentArticle: null,
    sources: [],
    isLoading: false,
    isFeedLoading: false,
    error: null,
    searchQuery: '',
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearSearchQuery: (state) => {
      state.searchQuery = '';
    },
    clearError: (state) => {
      state.error = null;
    },
    resetFeed: (state) => {
      state.feed = {
        items: [],
        nextCursor: null,
        hasMore: true,
      };
    },
  },
  extraReducers: (builder) => {
    // Fetch feed
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isFeedLoading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isFeedLoading = false;
        const { items, next_cursor } = action.payload;

        // If no cursor, replace items; otherwise append
        if (state.feed.items.length === 0) {
          state.feed.items = items;
        } else {
          state.feed.items = [...state.feed.items, ...items];
        }

        state.feed.nextCursor = next_cursor;
        state.feed.hasMore = next_cursor !== null;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isFeedLoading = false;
        state.error = action.payload;
      });

    // Fetch single article
    builder
      .addCase(fetchArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentArticle = action.payload;
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Fetch all articles
    builder
      .addCase(fetchAllArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        const { items, next_cursor } = action.payload;

        if (state.allArticles.items.length === 0) {
          state.allArticles.items = items;
        } else {
          state.allArticles.items = [...state.allArticles.items, ...items];
        }

        state.allArticles.nextCursor = next_cursor;
        state.allArticles.hasMore = next_cursor !== null;
      })
      .addCase(fetchAllArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Fetch sources
    builder
      .addCase(fetchSources.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSources.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sources = action.payload;
      })
      .addCase(fetchSources.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchQuery, clearSearchQuery, clearError, resetFeed } = articlesSlice.actions;
export default articlesSlice.reducer;
