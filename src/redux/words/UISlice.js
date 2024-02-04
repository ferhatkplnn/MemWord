import { createSlice } from "@reduxjs/toolkit";

const UISlice = createSlice({
  name: "UI",
  initialState: {
    modal: { isShowModal: false, data: "" },
    toast: {
      status: "idle", // idle || showing
      type: "success", // success || warning
      message: "Hello World",
    },
  },
  reducers: {
    toggleModal: (state, action) => {
      const { id } = action.payload;
      state.modal = {
        ...state.modal,
        isShowModal: !state.modal.isShowModal,
        data: id,
      };
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
