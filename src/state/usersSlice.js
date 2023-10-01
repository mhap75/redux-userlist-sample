import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://localhost:3004/users`);

      return data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  },
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3004/users/${id}`);

      return id;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  },
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`http://localhost:3004/users`, values);
      return data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  },
);

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(getUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload;
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Add a user by ID
      .addCase(createUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users.push(payload);
      })
      .addCase(createUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Delete a user by ID
      .addCase(deleteUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== payload);
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default usersSlice.reducer;

// Create custom selectors
const selectStates = (state) => state;

export const selectUsers = createSelector(
  [selectStates],
  (state) => state.users,
);
