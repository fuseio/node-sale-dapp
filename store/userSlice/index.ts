import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../rootReducer";
import { getBalanceOfBatch, getCurrentTierDetail, getMaxTier, getTierDetails, getTotalSupply } from "@/lib/contractInteract";
import { Address, formatEther } from "viem";
import { TierDetail } from "@/lib/types";

const initTierDetail: TierDetail = {
  tier: 0,
  price: 0,
  availableSupply: 0,
  maxSupply: 0
}

export interface UserStateType {
  isClient: boolean;
  isTotalSupplyLoading: boolean;
  totalSupply: number;
  isCurrentTierDetailLoading: boolean;
  currentTierDetail: TierDetail;
  isTierDetailsLoading: boolean;
  tierDetails: TierDetail[]
  isBoughtLoading: boolean;
  bought: number;
  isMinted: boolean;
}

const INIT_STATE: UserStateType = {
  isClient: false,
  isTotalSupplyLoading: false,
  totalSupply: 0,
  isCurrentTierDetailLoading: false,
  currentTierDetail: initTierDetail,
  isTierDetailsLoading: false,
  tierDetails: [],
  isBoughtLoading: false,
  bought: 0,
  isMinted: false,
};

export const retrieveTotalSupply = createAsyncThunk(
  "USER/TOTAL_SUPPLY",
  async () => {
    try {
      const totalSupply = await getTotalSupply();
      return Number(totalSupply);
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
      const formattedCurrentTierDetail: TierDetail = { ...initTierDetail };
      for (const [key, value] of Object.entries(currentTierDetail)) {
        if (key === "price") {
          formattedCurrentTierDetail[key as keyof TierDetail] = parseFloat(formatEther(value));
        } else if (key === "tier") {
          formattedCurrentTierDetail[key as keyof TierDetail] = Number(value) + 1;
        } else {
          formattedCurrentTierDetail[key as keyof TierDetail] = Number(value);
        }
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
        const detail: TierDetail = { ...initTierDetail };
        for (const [key, value] of Object.entries(tierDetail)) {
          if (key === "price") {
            detail[key as keyof TierDetail] = parseFloat(formatEther(value));
          } else if (key === "tier") {
            detail[key as keyof TierDetail] = Number(value) + 1;
          } else {
            detail[key as keyof TierDetail] = Number(value);
          }
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

export const tokenBought = createAsyncThunk<
  any,
  {
    address: Address;
  }
>(
  "USER/TOKEN_BOUGHT",
  async (
    {
      address
    }: {
      address: Address;
    }
  ) => {
    try {
      const maxTier = await getMaxTier();
      const formattedMaxTier = Number(maxTier);
      const addresses: Address[] = [];
      const ids = [];
      for (let i = 0; i < formattedMaxTier; i++) {
        addresses.push(address);
        ids.push(BigInt(i));
      }
      const balanceOfBatch = await getBalanceOfBatch(addresses, ids);
      let balance = 0;
      for (let i = 0; i < balanceOfBatch.length; i++) {
        balance += Number(balanceOfBatch[i]);
      }
      return balance;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "USER_STATE",
  initialState: INIT_STATE,
  reducers: {
    setIsClient: (state, action: PayloadAction<boolean>) => {
      state.isClient = action.payload
    },
    setIsMinted: (state, action: PayloadAction<boolean>) => {
      state.isMinted = action.payload
    },
  },
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
      .addCase(tokenBought.pending, (state) => {
        state.isBoughtLoading = true;
      })
      .addCase(tokenBought.fulfilled, (state, action) => {
        state.isBoughtLoading = false;
        state.bought = action.payload;
      })
      .addCase(tokenBought.rejected, (state) => {
        state.isBoughtLoading = false;
      })
  }
});

export const selectUserSlice = (state: AppState): UserStateType => state.user;

export const {
  setIsClient,
  setIsMinted
} = userSlice.actions;

export default userSlice.reducer;
