import { createSlice } from "@reduxjs/toolkit";

const branchSlice = createSlice({
  name: "branch",
  initialState: {
    branches: [],
    status: null,
    error: null,
  },
  reducers: {
    
  },
});


export default branchSlice.reducer;
