import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./current_user";
let Store=configureStore({
    reducer:{
     currentUser:currentUserReducer
    }
})

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default Store