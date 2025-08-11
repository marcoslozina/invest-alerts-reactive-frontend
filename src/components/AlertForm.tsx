import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createAlert, AlertPayload } from '../services/AlertService';
import toast from 'react-hot-toast';

const schema = Yup.object({
  symbol: Yup.string().oneOf(['BTC', 'ETH', 'SOL']).required('Requerido'),
  threshold: Yup.number().typeError('Debe ser número').moreThan(0, 'Debe ser > 0').required('Requerido'),
  type: Yup.mixed<'ABOVE' | 'BELOW'>().oneOf(['ABOVE', 'BELOW']).required('Requerido'),
});

const initialValues: AlertPayload = { symbol: 'BTC', threshold: 50000, type: 'ABOVE' };

export const AlertForm = ({ onCreated }: { onCreated?: () => void }) => {
  return (
    <div className="max-w-md w-full card">
      <h2 className="text-xl font-semibold mb-4">Registrar alerta de precio</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await createAlert(values);
            toast.success('✅ Alerta registrada');
            onCreated?.();
            resetForm({ values });
          } catch {
            toast.error('❌ No se pudo registrar la alerta');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Símbolo</label>
              <Field as="select" name="symbol" className="input">
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
                <option value="SOL">SOL</option>
              </Field>
              <ErrorMessage name="symbol" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Umbral</label>
              <Field name="threshold" type="number" className="input" />
              <ErrorMessage name="threshold" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Condición</label>
              <Field as="select" name="type" className="input">
                <option value="ABOVE">Por arriba (ABOVE)</option>
                <option value="BELOW">Por abajo (BELOW)</option>
              </Field>
              <ErrorMessage name="type" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:opacity-60"
            >
              {isSubmitting ? 'Enviando…' : 'Registrar alerta'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
