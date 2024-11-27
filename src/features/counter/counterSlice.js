import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: null,
  },
  reducers: {
   
    currentUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { currentUser } = counterSlice.actions;

export default counterSlice.reducer;
