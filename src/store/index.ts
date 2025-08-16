import { configureStore } from '@reduxjs/toolkit';
import alertsReducer from './slides/alertsSlice';

export const store = configureStore({
  reducer: {
    alerts: alertsReducer, // <- clave usada en (s) => s.alerts
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
