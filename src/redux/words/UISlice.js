import { createSlice } from "@reduxjs/toolkit";

const UISlice = createSlice({
  name: "UI",
  initialState: {
    modal: { isShowModal: false },
    toast: {
      status: "showing", // idle || showing
      type: "success", // success || warning
      message: "Hello World",
    },
  },
  reducers: {
    toggleModal: (state) => {
      state.modal.isShowModal = !state.modal.isShowModal;
    },
    showToast: (state, action) => {
      const { type, message } = action.payload;
      state.toast = { ...state.toast, status: "showing", type, message };
    },
  },
});

export const { toggleModal, showToast } = UISlice.actions;
export default UISlice.reducer;
