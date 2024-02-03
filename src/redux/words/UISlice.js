import { createSlice } from "@reduxjs/toolkit";

const UISlice = createSlice({
  name: "UI",
  initialState: {
    modal: { isShowModal: false },
  },
  reducers: {
    toggleModal: (state) => {
      state.modal.isShowModal = !state.modal.isShowModal;
    },
  },
});

export const { toggleModal } = UISlice.actions;
export default UISlice.reducer;
