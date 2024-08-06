import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSimplifiedError } from "../util";
import { APIService } from "../util/APIService";
import { url } from "../util/endpoints";
import { SingleBankDetail } from "../util/types";
export interface PaymentState {
  loading: boolean;
  fetchLoading: boolean;
 
  saveCardData: any;
  allSavedCard: any;
  saveCardSuccess: boolean;

  deleteCardSuccess: boolean;
  saveBankSuccess: boolean;
  deleteBankSuccess: boolean;
  allBanks: SingleBankDetail[];
    resolveBankData: any;
    sessionPaymentSuccess: boolean;
  offeringPaymentSuccess: boolean;
  offeringPaymentResp: any;
  sessionPaymentResp: any;
  withdrawalSuccess: boolean;
  allUserBanks: any;
  saveUserBankSuccess: boolean;
  allUserTransactions: any;
  withdrawSuccess: boolean;
}

const initialState: PaymentState = {
    loading: false,

    saveCardData: {},
    allSavedCard: [],
    saveCardSuccess: false,
    saveBankSuccess: false,

    deleteBankSuccess: false,
    deleteCardSuccess: false,
    allBanks: [],
    resolveBankData: {},
    fetchLoading: false,
    sessionPaymentSuccess: false,
    offeringPaymentSuccess: false,
  withdrawalSuccess: false,
  offeringPaymentResp:{},
  sessionPaymentResp:{},
  allUserBanks: [],
  saveUserBankSuccess: false,
  allUserTransactions: [],
  withdrawSuccess: false,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearState: () => {
      return initialState;
    },
    restoreDefault: (state) => {
 
        state.saveCardSuccess = false;
        state.saveBankSuccess = false;
        state.deleteBankSuccess = false;
        state.deleteCardSuccess = false;
        state.offeringPaymentSuccess = false;
        state.sessionPaymentSuccess = false;
      state.withdrawalSuccess = false;
      state.offeringPaymentResp = {};
      state.resolveBankData = {};
      state.saveUserBankSuccess = false;
      state.withdrawalSuccess = false;

  
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveMyCard.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveMyCard.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.saveCardData = payload.data;
        state.saveCardSuccess = true;
      })
      .addCase(saveMyCard.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getAllSavedCards.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getAllSavedCards.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.allSavedCard = payload.data;
      })
      .addCase(getAllSavedCards.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(getAllUserBanks.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getAllUserBanks.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.allUserBanks = payload.data;
      })
      .addCase(getAllUserBanks.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(payForOffering.pending, (state) => {
        state.loading = true;
      })
      .addCase(payForOffering.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.offeringPaymentSuccess = true;
        state.offeringPaymentResp = payload.data;
      })
      .addCase(payForOffering.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(payForSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(payForSession.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.sessionPaymentSuccess = true;
        state.sessionPaymentResp = payload.data;
      })
      .addCase(payForSession.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getAllBanks.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getAllBanks.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        
        state.allBanks = payload.data;
      })
      .addCase(getAllBanks.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(resolveAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(resolveAccount.fulfilled, (state, { payload }) => {
        state.loading = false;
        
        state.resolveBankData = payload.data;
      })
      .addCase(resolveAccount.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(saveUserBank.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveUserBank.fulfilled, (state, { payload }) => {
        state.loading = false;
        
        state.saveUserBankSuccess = true;
      })
      .addCase(saveUserBank.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getAllUserTransactions.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getAllUserTransactions.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        
        state.allUserTransactions = payload?.data;
      })
      .addCase(getAllUserTransactions.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(withdrawFund.pending, (state) => {
        state.loading = true;
      })
      .addCase(withdrawFund.fulfilled, (state, { payload }) => {
        state.loading = false;
        
        state.withdrawalSuccess = true;
      })
      .addCase(withdrawFund.rejected, (state, { payload }) => {
        state.loading = false;
      })

      
      ;
  },
});
export const saveMyCard = createAsyncThunk(
  "saveMyCard",
  async (_: any, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.post(`${url.saveCard}`, "", {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const getAllSavedCards = createAsyncThunk(
  "getAllSavedCard",
  async (_, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.get(
        `${url.savedCard}`,

        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);
export const resolveAccount = createAsyncThunk(
  "resolveAccount",
  async (payload: any, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.post(`${url.payment}/resolve-account`, payload, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const payForSession = createAsyncThunk(
  "payForSession",
  async (payload: any, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.post(`${url.payment}/booking/session`, payload, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);
export const payForOffering = createAsyncThunk(
  "payForOffering",
  async (payload: any, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.post(`${url.payment}/booking/offering`, payload, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);
export const withdrawFund = createAsyncThunk(
  "withdrawFund",
  async (payload: any, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.post(`${url.payment}/withdraw`, payload, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);
export const saveUserBank = createAsyncThunk(
  "saveUserBank",
  async (payload: any, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.post(`${url.payment}/save-bank`, payload, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);




export const getAllBanks = createAsyncThunk(
  "getAllBanks",
  async (_, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.get(
        `${url.payment}/banks`,

        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);
export const getAllUserBanks = createAsyncThunk(
  "getAllUserBanks",
  async (_, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.get(
        `${url.userBanks}`,

        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);
export const getAllUserTransactions = createAsyncThunk(
  "getAllUserTransactions",
  async (_, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.get(
        `${url.transactions}`,

        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);



export const paymentSelector = (state: any) => state.payment;

export const { clearState, restoreDefault } = paymentSlice.actions;
export default paymentSlice.reducer;
// function getState(): any {
//   throw new Error("Function not implemented.");
// }
