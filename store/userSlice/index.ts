import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../rootReducer";
import { submitWaitlist } from "@/lib/api";

export interface UserStateType {
  isJoinWaitlistLoading: boolean;
  joinedWaitlist: string;
}

const INIT_STATE: UserStateType = {
  isJoinWaitlistLoading: false,
  joinedWaitlist: "",
};

export const joinWaitlist = createAsyncThunk<
  any,
  {
    email: string;
  }
>(
  "USER/JOIN_WAITLIST",
  async (
    {
      email
    }: {
      email: string;
    }
  ) => {
    try {
      const joinedWaitlist = await submitWaitlist(email);
      return joinedWaitlist;
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
      .addCase(joinWaitlist.pending, (state) => {
        state.isJoinWaitlistLoading = true;
      })
      .addCase(joinWaitlist.fulfilled, (state, action) => {
        state.isJoinWaitlistLoading = false;
        state.joinedWaitlist = action.payload;
      })
      .addCase(joinWaitlist.rejected, (state) => {
        state.isJoinWaitlistLoading = false;
      })
  }
});

export const selectUserSlice = (state: AppState): UserStateType => state.user;

export const {} = userSlice.actions;

export default userSlice.reducer;
