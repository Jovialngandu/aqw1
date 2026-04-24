import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { interactionsService } from '@services';

/**
 * Async thunks
 */
export const fetchAllInteractions = createAsyncThunk(
  'interactions/fetchAllInteractions',
  async (_, { rejectWithValue }) => {
    try {
      const result = await interactionsService.getAll();
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateInteraction = createAsyncThunk(
  'interactions/updateInteraction',
  async ({ articleId, data }, { rejectWithValue }) => {
    try {
      const result = await interactionsService.updateInteraction(articleId, data);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const toggleLikeArticle = createAsyncThunk(
  'interactions/toggleLikeArticle',
  async ({ articleId, isLiked }, { rejectWithValue }) => {
    try {
      const result = await interactionsService.toggleLike(articleId, isLiked);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addNoteToArticle = createAsyncThunk(
  'interactions/addNoteToArticle',
  async ({ articleId, note }, { rejectWithValue }) => {
    try {
      const result = await interactionsService.addNote(articleId, note);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateArticleStatus = createAsyncThunk(
  'interactions/updateArticleStatus',
  async ({ articleId, status }, { rejectWithValue }) => {
    try {
      const result = await interactionsService.updateStatus(articleId, status);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/**
 * Interactions Slice
 */
const interactionsSlice = createSlice({
  name: 'interactions',
  initialState: {
    interactions: {}, // Map of articleId -> interaction
    isLoading: false,
    error: null,
    lastUpdated: null,
  },
  reducers: {
    setInteractionOptimistic: (state, action) => {
      const { articleId, interaction } = action.payload;
      state.interactions[articleId] = interaction;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all interactions
    builder
      .addCase(fetchAllInteractions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllInteractions.fulfilled, (state, action) => {
        state.isLoading = false;
        // Map interactions by articleId
        state.interactions = {};
        action.payload.forEach((interaction) => {
          state.interactions[interaction.article_id] = interaction;
        });
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchAllInteractions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Update interaction
    builder
      .addCase(updateInteraction.pending, (state) => {
        state.error = null;
      })
      .addCase(updateInteraction.fulfilled, (state, action) => {
        const { article_id } = action.payload;
        state.interactions[article_id] = action.payload;
      })
      .addCase(updateInteraction.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Toggle like (reuses updateInteraction handling)
    builder
      .addCase(toggleLikeArticle.fulfilled, (state, action) => {
        const { article_id } = action.payload;
        state.interactions[article_id] = action.payload;
      })
      .addCase(toggleLikeArticle.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Add note (reuses updateInteraction handling)
    builder
      .addCase(addNoteToArticle.fulfilled, (state, action) => {
        const { article_id } = action.payload;
        state.interactions[article_id] = action.payload;
      })
      .addCase(addNoteToArticle.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Update status (reuses updateInteraction handling)
    builder
      .addCase(updateArticleStatus.fulfilled, (state, action) => {
        const { article_id } = action.payload;
        state.interactions[article_id] = action.payload;
      })
      .addCase(updateArticleStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setInteractionOptimistic, clearError } = interactionsSlice.actions;
export default interactionsSlice.reducer;
