import React from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

const AlertForm = () => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      symbol: '',
      threshold: '',
      type: 'above',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        console.warn('Backend no disponible, simulando POST /alerts con', values);
        await new Promise((res) => setTimeout(res, 500));
        alert(t('form.success'));
        resetForm();
      } catch (error) {
        console.error('Error en el envío del formulario:', error);
        alert(t('form.error'));
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* campos del formulario */}
    </form>
  );
};

export default AlertForm;
