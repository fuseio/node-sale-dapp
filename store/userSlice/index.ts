import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../rootReducer";
import { getCurrentTierDetail, getTierDetails, getTotalSupply } from "@/lib/contractInteract";
import { formatEther } from "viem";
import { TierDetail } from "@/lib/types";

const initTierDetail: TierDetail = {
  tier: 0,
  price: 0,
  availableSupply: 0,
  maxSupply: 0
}

export interface UserStateType {
  totalSupply: number;
  isTotalSupplyLoading: boolean;
  currentTierDetail: TierDetail;
  isCurrentTierDetailLoading: boolean;
  tierDetails: TierDetail[]
  isTierDetailsLoading: boolean;
}

const INIT_STATE: UserStateType = {
  totalSupply: 0,
  isTotalSupplyLoading: false,
  currentTierDetail: initTierDetail,
  isCurrentTierDetailLoading: false,
  tierDetails: [],
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
      const formattedCurrentTierDetail: TierDetail = {...initTierDetail};
      for (const [key, value] of Object.entries(currentTierDetail)) {
        formattedCurrentTierDetail[key as keyof TierDetail] = parseFloat(formatEther(value));
      }
      return formattedCurrentTierDetail;
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
      const formattedTierDetails: TierDetail[] = [];
      tierDetails.map((tierDetail, i) => {
        const detail: TierDetail = {...initTierDetail};
        for (const [key, value] of Object.entries(tierDetail)) {
          detail[key as keyof TierDetail] = parseFloat(formatEther(value));
        }
        formattedTierDetails.push(detail);
      })
      return formattedTierDetails;
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
        state.currentTierDetail = action.payload;
      })
      .addCase(retrieveCurrentTierDetail.rejected, (state) => {
        state.isCurrentTierDetailLoading = false;
      })
      .addCase(retrieveTierDetails.pending, (state) => {
        state.isTierDetailsLoading = true;
      })
      .addCase(retrieveTierDetails.fulfilled, (state, action) => {
        state.isTierDetailsLoading = false;
        state.tierDetails = action.payload;
      })
      .addCase(retrieveTierDetails.rejected, (state) => {
        state.isTierDetailsLoading = false;
      })
  }
});

export const selectUserSlice = (state: AppState): UserStateType => state.user;

export const { } = userSlice.actions;

export default userSlice.reducer;
