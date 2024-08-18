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
  createBookingSuccess: boolean;
  createOfferingBookingSuccess: boolean;
  allBookingsSessionStudent: any;
  allBookingsSessionCoach: any;
  createBookingSessionSuccess: boolean;

  allBookedOfferingsStudent: any;
  allBookedOfferingsCoach: any;
  giveFeedbackSuccess: boolean;
  allFeedback: boolean;
  editFeedbackSuccess: boolean;
  deleteFeedbackSuccess: boolean;
  singleCoachOffering: any;
  bookCoachOfferingSuccess: boolean;
  nextSessionBookingSuccess: boolean;
  rescheduleSuccess: boolean;
  allBookedOfferingCoach: any;
  allReschedules: any;
  
}

const initialState: OfferingsState = {
  loading: false,
  fetchLoading: false,
  allOfferings: [],
  singleOffering: {},
  success: false,
  updateOfferingSuccess: false,
  deleteOfferingSuccess: false,
  createOfferingSuccess: false,
  createBookingSuccess: false,
  createOfferingBookingSuccess: false,
  singleCoachOffering:[],
  allBookingsSessionStudent: [],
  allBookingsSessionCoach: [],
  createBookingSessionSuccess: false,
  allBookedOfferingsStudent: [],
  allBookedOfferingsCoach: [],
  giveFeedbackSuccess: false,
  allFeedback: false,
  editFeedbackSuccess: false,
  deleteFeedbackSuccess: false,
  bookCoachOfferingSuccess: false,
  nextSessionBookingSuccess: false,
  rescheduleSuccess: false,
  allBookedOfferingCoach: [],
  allReschedules: [],
  
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
        state.editFeedbackSuccess = false;
        state.giveFeedbackSuccess = false;
        state.deleteFeedbackSuccess = false;
        state.createBookingSessionSuccess = false;
        state.createBookingSuccess = false;
        state.createOfferingBookingSuccess = false;
        state.deleteOfferingSuccess = false;
        state.bookCoachOfferingSuccess = false;
        state.nextSessionBookingSuccess = false;
        state.rescheduleSuccess = false;
        
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
      .addCase(createFirstBookingWithCoach.pending, (state) => {
        state.loading = true;
      })
      .addCase(createFirstBookingWithCoach.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.createBookingSessionSuccess = true;
     
      })
      .addCase(createFirstBookingWithCoach.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(bookCoachOffering.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookCoachOffering.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.bookCoachOfferingSuccess = true;
     
      })
      .addCase(bookCoachOffering.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(createOfferingBookingWithCoach.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOfferingBookingWithCoach.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.createOfferingBookingSuccess = true;
     
      })
      .addCase(createOfferingBookingWithCoach.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getAllSessionBookingStudent.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getAllSessionBookingStudent.fulfilled, (state, { payload }) => {
          state.fetchLoading = false;
          state.allBookingsSessionStudent = payload.data;
     
      })
      .addCase(getAllSessionBookingStudent.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(getAllSessionBookingCoach.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSessionBookingCoach.fulfilled, (state, { payload }) => {
          state.fetchLoading = false;
          state.allBookingsSessionCoach = payload.data;
     
      })
      .addCase(getAllSessionBookingCoach.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(getAllOfferingBookingStudent.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getAllOfferingBookingStudent.fulfilled, (state, { payload }) => {
          state.fetchLoading = false;
          state.allBookedOfferingsStudent = payload.data;
     
      })
      .addCase(getAllOfferingBookingStudent.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(getAllOfferingBookingCoach.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getAllOfferingBookingCoach.fulfilled, (state, { payload }) => {
          state.fetchLoading = false;
          state.allBookedOfferingsCoach = payload.data;
     
      })
      .addCase(getAllOfferingBookingCoach.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(getSingleCoachOffering.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getSingleCoachOffering.fulfilled, (state, { payload }) => {
          state.fetchLoading = false;
          state.singleCoachOffering = payload.data;
     
      })
      .addCase(getSingleCoachOffering.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(bookNextSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookNextSession.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.nextSessionBookingSuccess = true;
     
      })
      .addCase(bookNextSession.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(rescheduleOffering.pending, (state) => {
        state.loading = true;
      })
      .addCase(rescheduleOffering.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.rescheduleSuccess = true;
     
      })
      .addCase(rescheduleOffering.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getAllBookedOfferingCoach.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getAllBookedOfferingCoach.fulfilled, (state, { payload }) => {
          state.fetchLoading = false;
          state.allBookedOfferingCoach = payload?.data;
     
      })
      .addCase(getAllBookedOfferingCoach.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(getAllReschedules.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getAllReschedules.fulfilled, (state, { payload }) => {
          state.fetchLoading = false;
          state.allReschedules = payload?.data;
     
      })
      .addCase(getAllReschedules.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(respondToReschedule.pending, (state) => {
        state.loading = true;
      })
      .addCase(respondToReschedule.fulfilled, (state) => {
          state.loading = false;
       
     
      })
      .addCase(respondToReschedule.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAvailability.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAvailability.fulfilled, (state) => {
          state.loading = false;
       
     
      })
      .addCase(getAvailability.rejected, (state) => {
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

export const rescheduleOffering = createAsyncThunk(
  "rescheduleOffering",
  async (payload: any, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.post(
        `${url.reschedule}/${payload.id}`,
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
export const respondToReschedule = createAsyncThunk(
  "respondToReschedule",
  async (payload: any, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.post(
        `${url.respondToReschedule}/${payload.id}/respond`,
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
export const getAvailability = createAsyncThunk(
  "getAvailability",
  async (payload: any, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.get(`${url.availability}/${payload.id}/${payload?.date}`, {
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
export const getAllReschedules = createAsyncThunk(
  "getSingleReschedules",
  async (_, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.get(`${url.allReschedules}`, {
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

export const getSingleCoachOffering = createAsyncThunk(
  "getSingleCoachOffering",
  async (payload: any, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.get(`${url.offerings}/coach/${payload.id}`, {
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

// create a one on one booking session with a coach 
export const createFirstBookingWithCoach = createAsyncThunk(
  "createFirstBookingWithCoach",
  async (payload: any, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.post(`${url.sessionBookings}/${payload.coachId}`, payload.data, {
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
// create a one on one booking session with a coach 
export const bookCoachOffering = createAsyncThunk(
  "bookCoachOffering",
  async (payload: any, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.post(`${url.offeringBookings}/${payload.id}`, payload.data, {
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
export const bookNextSession = createAsyncThunk(
  "bookNextSession",
  async (payload: any, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.post(`${url.bookNextSession}/${payload.id}`, payload.data, {
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


export const getAllSessionBookingStudent = createAsyncThunk(
  "getAllSessionBookingStudent",
  async (_, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.get(`${url.sessionBookings}`, {
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

export const getAllSessionBookingCoach = createAsyncThunk(
  "getAllSessionBookingCoach",
  async (_, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.get(`${url.sessionBookings}`, {
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

// create a  booking session from the coach offering with a coach 
export const createOfferingBookingWithCoach = createAsyncThunk(
  "createOfferingBookingWithCoach",
  async (payload: any, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.post(`${url.offeringBookings}/${payload.offeringId}`, payload.data, {
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


export const getAllOfferingBookingStudent = createAsyncThunk(
  "getAllOfferingBookingStudent",
  async (_, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.get(`${url.offeringBookings}`, {
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

export const getAllOfferingBookingCoach = createAsyncThunk(
  "getAllOfferingBookingCoach",
  async (_, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.get(`${url.offeringBookings}/coach`, {
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
export const getAllBookedOfferingCoach = createAsyncThunk(
  "getAllBookedOfferingCoach",
  async (_, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.get(`${url.offeringBookings}`, {
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


