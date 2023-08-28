import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createBranchAsync, deleteBranchAsync, getAllBranchesAsync, updateBranchAsync } from "../../Requests/branchRequests";


export const fetchBranches = createAsyncThunk(
  "branch/fetchBranches",
  async function (restaurantId, {rejectWithValue, dispatch}){
    try {
      let response  = await getAllBranchesAsync(restaurantId)
      if(response?.status === 401){
        response = await getAllBranchesAsync(restaurantId);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const createBranch = createAsyncThunk(
  "branch/createBranch",
  async function (branch, {rejectWithValue, dispatch}){
    try {
      let response = await createBranchAsync(branch)
      if(response?.status === 401){
        response = await createBranch(branch)
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);      
    }
  }
)

export const deleteBranch = createAsyncThunk (
  "branch/deleteBranch",
  async function (branchId , {rejectWithValue, dispatch}){
    try {
      let response = await deleteBranchAsync(branchId);
      if(response?.status === 401){
        response = await deleteBranchAsync(branchId);
      }
      dispatch(removeBranch({branchId}))
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const updateBranch = createAsyncThunk (
  "branch/updateBranch",
  async function (branch, {rejectWithValue, dispatch}){
    try {
      let response = await updateBranchAsync(branch);
      if(response?.status === 401){
        response = await updateBranchAsync(branch)
      }
      dispatch(editBranch(branch))
    } catch (error) {
      rejectWithValue(error)
    }
  }
)
const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

const branchSlice = createSlice({
  name: "branch",
  initialState: {
    branches: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addBranch(state, action){
      state.branches.push(action.payload.branch);
    },
    removeBranch(state,action){
      state.branches = state.branches.filter(branch => branch.id !== action.payload.branchId);
    },
    editBranch(state, action){
      const updatedBranch = action.payload.branch;

      const branchIndex = state.branches.findIndex(
        (branch) => branch.id === updatedBranch.id
      );
    
      if (branchIndex !== -1) {
        state.branches[branchIndex] = updateBranch;
      }
    }
    
  }, 
  extraReducers:{
    [fetchBranches.pending]:(state ,action)=>{
      state.status = "pending";
      state.error = null;
    },
    [fetchBranches.fulfilled]:(state, action)=>{
      state.status = "fulfilled";
      state.branches = action.payload;
    },
    [fetchBranches.rejected]: setError,

    ////////////////////////////////////////////////
    
    [createBranch.rejected]: setError,
  }
});

const { removeBranch,editBranch} = branchSlice.actions;
export default branchSlice.reducer;
