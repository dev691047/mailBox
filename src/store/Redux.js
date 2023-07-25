import { createSlice, configureStore } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialAuthState = {
  isAuthenticated: false,
  userId: "",
  token: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      // console.log(action.payload.userId);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = "";
      state.userId = "";
    },
  },
});

const initialListState = {
  sentItems: [],
  recieveItems: [],
};
const listItemsSlice = createSlice({
  name: "listItems",
  initialState: initialListState,
  reducers: {
    addSentItems(state, action) {
      state.sentItems = action.payload;
      // console.log(state.sentItems + "this is sent mails");
    },
    addRecievedItems(state, action) {
      state.recieveItems = action.payload;
      // console.log("this is recieved mails");
      // console.log(state.recieveItems);
    },
    clearData(state, action) {
      state.sentItems = action.payload;
      state.recieveItems = act.payload;
    },
  },
});

const store = configureStore({
  reducer: { auth: authSlice.reducer, items: listItemsSlice.reducer },
});
export const listActions = listItemsSlice.actions;
export const authActions = authSlice.actions;
export default store;
