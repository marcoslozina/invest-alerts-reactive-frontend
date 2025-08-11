import { useEffect, useState } from 'react';
import { getAlerts, AlertDTO, updateAlert, deleteAlert } from '../services/AlertService'; // 🆕 STEP 6
import toast from 'react-hot-toast'; // 🆕 STEP 6

export function AlertsList({ refreshKey }: { refreshKey: number }) {
  const [items, setItems] = useState<AlertDTO[]>([]);
  const [loading, setLoading] = useState(true);

  // 🆕 STEP 6 - estados para edición/borrado
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formThreshold, setFormThreshold] = useState<number>(0);
  const [formType, setFormType] = useState<'ABOVE' | 'BELOW'>('ABOVE');
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const data = await getAlerts();
        if (alive) setItems(data);
      } catch {
        toast.error('No se pudo cargar el listado'); // 🆕 STEP 6
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [refreshKey]);

  // 🆕 STEP 6 - iniciar/cancelar edición
  const startEdit = (a: AlertDTO) => {
    setEditingId(a.id);
    setFormThreshold(a.threshold);
    setFormType(a.type);
  };
  const cancelEdit = () => setEditingId(null);

  // 🆕 STEP 6 - guardar edición
  const saveEdit = async () => {
    if (!editingId) return;
    try {
      setSaving(true);
      const updated = await updateAlert(editingId, {
        threshold: formThreshold,
        type: formType,
      });
      setItems(prev => prev.map(it => (it.id === updated.id ? updated : it)));
      toast.success('Alerta actualizada');
      setEditingId(null);
    } catch {
      toast.error('No se pudo actualizar');
    } finally {
      setSaving(false);
    }
  };

  // 🆕 STEP 6 - eliminar
  const remove = async (id: string) => {
    if (!confirm('¿Eliminar esta alerta?')) return;
    try {
      setDeletingId(id);
      await deleteAlert(id);
      setItems(prev => prev.filter(it => it.id !== id));
      toast.success('Alerta eliminada');
    } catch {
      toast.error('No se pudo eliminar');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p>Cargando alertas…</p>;
  if (!Array.isArray(items) || !items.length) return <p className="text-sm text-gray-500">No hay alertas registradas.</p>;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Alertas registradas</h3>
      <ul className="space-y-2">
        {items.map(a => {
          const isEditing = editingId === a.id;
          return (
            <li
              key={a.id}
              className="border rounded p-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
            >
              <div className="text-sm flex-1">
                <span className="font-medium">{a.symbol}</span> —{' '}
                {isEditing ? (
                  <select
                    className="border rounded px-2 py-1"
                    value={formType}
                    onChange={e => setFormType(e.target.value as 'ABOVE' | 'BELOW')}
                  >
                    <option value="ABOVE">ABOVE</option>
                    <option value="BELOW">BELOW</option>
                  </select>
                ) : (
                  a.type
                )}{' '}
                —{' '}
                {isEditing ? (
                  <input
                    type="number"
                    className="border rounded px-2 py-1 w-28"
                    value={formThreshold}
                    onChange={e => setFormThreshold(Number(e.target.value))}
                  />
                ) : (
                  a.threshold
                )}
                <div className="text-xs text-gray-500">
                  {new Date(a.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="flex gap-2">
                {!isEditing ? (
                  <>
                    <button className="px-3 py-1 rounded border" onClick={() => startEdit(a)}>
                      Editar {/* 🆕 STEP 6 */}
                    </button>
                    <button
                      className="px-3 py-1 rounded border text-red-600"
                      onClick={() => remove(a.id)}
                      disabled={deletingId === a.id}
                    >
                      {deletingId === a.id ? 'Eliminando…' : 'Eliminar'} {/* 🆕 STEP 6 */}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="px-3 py-1 rounded bg-black text-white disabled:opacity-60"
                      onClick={saveEdit}
                      disabled={saving}
                    >
                      {saving ? 'Guardando…' : 'Guardar'} {/* 🆕 STEP 6 */}
                    </button>
                    <button className="px-3 py-1 rounded border" onClick={cancelEdit} disabled={saving}>
                      Cancelar {/* 🆕 STEP 6 */}
                    </button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
