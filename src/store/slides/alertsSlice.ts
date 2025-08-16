import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as AlertService from '../../services/AlertService';
import type { AlertDTO, AlertPayload } from '../../services/AlertService';

type AlertsState = {
  items: AlertDTO[];
  loading: boolean;
  error: string | null;
};

const initialState: AlertsState = {
  items: [],
  loading: false,
  error: null,
};

// GET /alerts
export const fetchAlerts = createAsyncThunk<AlertDTO[]>(
  'alerts/fetchAll',
  async () => {
    const data = await AlertService.getAlerts();
    return data;
  }
);

// POST /alerts
export const createAlert = createAsyncThunk<AlertDTO, AlertPayload>(
  'alerts/create',
  async (payload) => {
    const created = await AlertService.createAlert(payload);
    return created;
  }
);

// PUT /alerts/:id
export const updateAlert = createAsyncThunk<
  AlertDTO,
  { id: string; patch: Partial<Pick<AlertPayload, 'threshold' | 'type'>> }
>('alerts/update', async ({ id, patch }) => {
  const updated = await AlertService.updateAlert(id, patch);
  return updated;
});

// DELETE /alerts/:id
export const deleteAlert = createAsyncThunk<string, string>(
  'alerts/delete',
  async (id) => {
    await AlertService.deleteAlert(id);
    return id; // devolvemos el id para removerlo del store
  }
);

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    // útil para WebSockets u "optimistic updates"
    upsertMany: (state, action: PayloadAction<AlertDTO[]>) => {
      const map = new Map(state.items.map((a) => [a.id, a]));
      for (const it of action.payload) map.set(it.id, it);
      state.items = Array.from(map.values());
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchAlerts.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchAlerts.fulfilled, (s, a) => {
        s.loading = false;
        s.items = a.payload;
      })
      .addCase(fetchAlerts.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message ?? 'Error fetching alerts';
      })
      // create
      .addCase(createAlert.fulfilled, (s, a) => {
        s.items.unshift(a.payload);
      })
      // update
      .addCase(updateAlert.fulfilled, (s, a) => {
        const i = s.items.findIndex((x) => x.id === a.payload.id);
        if (i >= 0) s.items[i] = a.payload;
      })
      // delete
      .addCase(deleteAlert.fulfilled, (s, a) => {
        s.items = s.items.filter((x) => x.id !== a.payload);
      });
  },
});

export const { upsertMany } = alertsSlice.actions;
export default alertsSlice.reducer;
