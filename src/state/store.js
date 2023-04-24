import { configureStore } from "@reduxjs/toolkit";
import { AccountReducer } from "./reducers/AccountReducer";
import { AddEmployeeReducer,GetEmployeeReducer,DeleteEmployeeReducer} from './reducers/employeeReducer';
 
export const store = configureStore({
  reducer: {
    AccountReducer:AccountReducer,
    AddEmployeeReducer:AddEmployeeReducer,
    GetEmployeeReducer:GetEmployeeReducer,
    DeleteEmployeeReducer:DeleteEmployeeReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});