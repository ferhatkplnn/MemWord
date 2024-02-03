import { createSlice } from "@reduxjs/toolkit";

const UISlice = createSlice({
  name: "UI",
  initialState: {
    modal: { isShowModal: false },
    toast: {
      status: "idle", // idle || showing
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
    closeToast: (state) => {
      state.toast.status = "idle";
    },
  },
});

export const { toggleModal, showToast, closeToast } = UISlice.actions;
export default UISlice.reducer;
