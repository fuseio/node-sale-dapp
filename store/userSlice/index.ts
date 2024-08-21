import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../rootReducer";
import { getCurrentTierDetail, getTierDetails, getTotalSupply } from "@/lib/contractInteract";
import { formatEther } from "viem";

export interface UserStateType {
  totalSupply: number;
  isTotalSupplyLoading: boolean;
  isCurrentTierDetailLoading: boolean;
  isTierDetailsLoading: boolean;
}

const INIT_STATE: UserStateType = {
  totalSupply: 0,
  isTotalSupplyLoading: false,
  isCurrentTierDetailLoading: false,
  isTierDetailsLoading: false,
};

export const retrieveTotalSupply = createAsyncThunk(
  "USER/TOTAL_SUPPLY",
  async () => {
    try {
      const totalSupply = await getTotalSupply();
      return parseFloat(formatEther(totalSupply));
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }
);

export const retrieveCurrentTierDetail = createAsyncThunk(
  "USER/CURRENT_TIER_DETAIL",
  async () => {
    try {
      const currentTierDetail = await getCurrentTierDetail();
      return currentTierDetail;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }
);

export const retrieveTierDetails = createAsyncThunk(
  "USER/TIER_DETAILS",
  async () => {
    try {
      const tierDetails = await getTierDetails();
      return tierDetails;
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
      .addCase(retrieveCurrentTierDetail.pending, (state) => {
        state.isCurrentTierDetailLoading = true;
      })
      .addCase(retrieveCurrentTierDetail.fulfilled, (state, action) => {
        state.isCurrentTierDetailLoading = false;
      })
      .addCase(retrieveCurrentTierDetail.rejected, (state) => {
        state.isCurrentTierDetailLoading = false;
      })
      .addCase(retrieveTierDetails.pending, (state) => {
        state.isTierDetailsLoading = true;
      })
      .addCase(retrieveTierDetails.fulfilled, (state, action) => {
        state.isTierDetailsLoading = false;
      })
      .addCase(retrieveTierDetails.rejected, (state) => {
        state.isTierDetailsLoading = false;
      })
  }
});

export const selectUserSlice = (state: AppState): UserStateType => state.user;

export const { } = userSlice.actions;

export default userSlice.reducer;
