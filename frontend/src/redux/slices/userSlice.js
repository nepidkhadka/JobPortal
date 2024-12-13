import { createSlice } from "@reduxjs/toolkit";

const loadUserFromLocalStorage = () => {
  try {
    const serializedUser = localStorage.getItem("user");
    return serializedUser ? JSON.parse(serializedUser) : null;
  } catch (error) {
    console.error("Failed to load user from localStorage", error);
    return null;
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: loadUserFromLocalStorage(),
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      try {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } catch (error) {
        console.error("Failed to save user to localStorage", error);
      }
    },
  },
});

export const { setLoading, setUser } = userSlice.actions;
export default userSlice.reducer;
