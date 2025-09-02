import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  qrList: [],
  loading: false,
  error:null
};

const qrSlice = createSlice({
  name: 'qr',
  initialState,
  reducers: {
    setQrList: (state, action) => {
      state.qrList = action.payload;
    },
    addQr: (state, action) => {
      state.qrList.push(action.payload);
    },
    deleteQr: (state, action) => {
        state.qrList = state.qrList.filter(qr => qr._id !== action.payload)
        // console.log("from redux");
    }
  },
});

export const { setQrList, addQr, deleteQr } = qrSlice.actions;
export default qrSlice.reducer; 