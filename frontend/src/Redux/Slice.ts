import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
export const fetchUserData = createAsyncThunk("fetchUserData", async () => {
  console.log(token);
  const response = await fetch("http://127.0.0.1:8000/user_list/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
});

export const UserData = createSlice({
  name: "User",
  initialState: {
    loading: false,
    userData: [],
    accessToken: "",
    error: false,
  },
  reducers: {
    Token: (state: any, action: any) => {
      state.accessToken = action.payload;
    },
    loginError: (state: any, action: any) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(fetchUserData.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state: any, action: any) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(fetchUserData.rejected, (state: any) => {
      state.error = true;
    });
  },
});
export const { Token, loginError } = UserData.actions;
export default UserData.reducer;
