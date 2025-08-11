// 🆕 STEP 5
import { useEffect, useRef } from 'react';
import { useAlertStream } from '../hooks/useAlertStream';
import toast from 'react-hot-toast';

export function AlertStreamToaster() {
  const { events, connected, error } = useAlertStream();
  const lastShownId = useRef<string | null>(null);

  useEffect(() => {
    if (error) toast.error('⚠️ Error en el stream de alertas');
  }, [error]);

  useEffect(() => {
    if (!events.length) return;
    const latest = events[0];
    if (latest.id !== lastShownId.current) {
      lastShownId.current = latest.id;
      toast(`⚡ ${latest.symbol} ${latest.type === 'ABOVE' ? 'superó' : 'cayó por debajo'} ${latest.threshold} @ ${latest.price}`, {
        id: latest.id, // evita duplicados
      });
    }
  }, [events]);

  useEffect(() => {
    if (connected) toast.dismiss('stream-status');
    else toast.loading('Conectando al stream...', { id: 'stream-status' });
  }, [connected]);

  return null; // no renderiza UI, solo toasts
}
