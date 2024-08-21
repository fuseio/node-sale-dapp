import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../rootReducer";
import { getTotalSupply } from "@/lib/contractInteract";

export interface UserStateType {
  totalSupply: number;
  isTotalSupplyLoading: boolean;
}

const INIT_STATE: UserStateType = {
  totalSupply: 0,
  isTotalSupplyLoading: false,
};

export const retrieveTotalSupply = createAsyncThunk(
  "USER/TOTAL_SUPPLY",
  () => {
    try {
      return getTotalSupply();
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "USER_STATE",
  initialState: INIT_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(retrieveTotalSupply.pending, (state) => {
        state.isTotalSupplyLoading = true;
      })
      .addCase(retrieveTotalSupply.fulfilled, (state, action) => {
        state.isTotalSupplyLoading = false;
        state.totalSupply = action.payload
      })
      .addCase(retrieveTotalSupply.rejected, (state) => {
        state.isTotalSupplyLoading = false;
      })
  }
});

export const selectUserSlice = (state: AppState): UserStateType => state.user;

export const { } = userSlice.actions;

export default userSlice.reducer;
