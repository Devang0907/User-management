import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch users from an API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('http://localhost:3000/user');
  return response.data;

});

// Async thunk to add users to db.json using an API
export const addUsers = createAsyncThunk('users/addUsers', async (newUser) => {
  const response = await axios.post('http://localhost:3000/user', newUser);
  return response.data;

});

// Async thunk to delete users from db.json using an API
export const deleteUser = createAsyncThunk('users/deleteUsers', async (id) => {
  try {
    await axios.delete(`http://localhost:3000/user/${id}`);
    return id;
  }
  catch (error) {
    return rejectWithValue(error.response.data || 'Failed to delete');
  }

});

// Async thunk to update users in db.json using an API
export const updateUsers = createAsyncThunk('users/updateUsers', async (updatedUser) => {
  try {
    const response=await axios.put(`http://localhost:3000/user/${updatedUser.id}`, updatedUser);
    return response.data;
  }
  catch (error) {
    return rejectWithValue(error.response.data || 'Failed to update');
  }

});


const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    //fetch
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      //add
      .addCase(addUsers.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(addUsers.rejected, (state, action) => {
        state.error = action.error.message;
      })

      //delete
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message;
      })

      //update
      .addCase(updateUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedUser = action.payload;
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      })
      .addCase(updateUsers.rejected, (state, action) => {
        state.error = action.error.message;
      })

  },
});





export default userSlice.reducer;