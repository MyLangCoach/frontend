import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSimplifiedError } from "../util";
import { APIService } from "../util/APIService";
import { url } from "../util/endpoints";
export interface OfferingsState {
    loading: boolean;
    fetchLoading: boolean;
    allOfferings: any;
    singleOffering: any;
    success: boolean;
    updateOfferingSuccess: boolean;
    deleteOfferingSuccess: boolean;
    createOfferingSuccess: boolean;

}

const initialState: OfferingsState = {
    loading: false,
    fetchLoading: false,
    allOfferings: [],
    singleOffering: {},
    success: false,
    updateOfferingSuccess: false,
    deleteOfferingSuccess: false,
    createOfferingSuccess:false,
};

export const offeringsSlice = createSlice({
  name: "offerings",
  initialState,
  reducers: {
    clearState: () => {
      return initialState;
    },
      restoreDefault: (state) => {
          state.createOfferingSuccess = false;
          state.deleteOfferingSuccess = false;
          state.updateOfferingSuccess = false;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOffering.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOffering.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.createOfferingSuccess = true;
     
      })
      .addCase(createOffering.rejected, (state, { payload }) => {
          state.loading = false;
          
      })
      .addCase(getAllOfferings.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getAllOfferings.fulfilled, (state, { payload }) => {
          state.fetchLoading = false;
          state.allOfferings = payload?.data
     
      })
      .addCase(getAllOfferings.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(getSingleOffering.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getSingleOffering.fulfilled, (state, { payload }) => {
          state.fetchLoading = false;
          state.singleOffering = payload?.data
      
      })
      .addCase(getSingleOffering.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      })

      .addCase(deleteSingleOffering.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSingleOffering.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.deleteOfferingSuccess = true;
     
      })
      .addCase(deleteSingleOffering.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(updatedOffering.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatedOffering.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.updateOfferingSuccess = true;
     
      })
      .addCase(updatedOffering.rejected, (state, { payload }) => {
        state.loading = false;
      })
        
        ;
  },
});

export const createOffering = createAsyncThunk(
  "createOffering",
  async (payload: any, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.post(`${url.offerings}`, payload, {
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

export const updatedOffering = createAsyncThunk(
  "updateOffering",
  async (payload: any, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.patch(
        `${url.offerings}/${payload.id}`,
        payload.data,
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
export const getSingleOffering = createAsyncThunk(
  "getSingleOffering",
  async (payload: any, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.get(`${url.offerings}/${payload.id}`, {
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
export const deleteSingleOffering = createAsyncThunk(
  "deleteSingleOffering",
  async (payload: any, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.delete(
        `${url.offerings}/${payload.id}`,
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
export const getAllOfferings = createAsyncThunk(
  "getAllOfferings",
  async (_, { rejectWithValue,getState }) => {
      const { auth }: any = getState();
    try {
      const { data } = await APIService.get(`${url.getOfferings}`, {
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



export const authSelector = (state: any) => state.auth;

export const { clearState,restoreDefault } = offeringsSlice.actions;
export default offeringsSlice.reducer;


