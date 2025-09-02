import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  urlList: [],
  loading: false,
  error:null
};

const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    setUrlList: (state, action) => {
      state.urlList = Array.isArray(action.payload) ? action.payload : [];
    },
    addUrl: (state, action) => {
      state.urlList.push(action.payload);
    },
    deleteUrlState: (state, action) => {
        state.urlList = state.urlList.filter(url => url._id !== action.payload)
        // console.log("from redux");
    }
  },
});

export const { setUrlList, addUrl, deleteUrlState } = urlSlice.actions;
export default urlSlice.reducer; 