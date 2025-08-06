onSubmit: async (values, { resetForm }) => {
  try {
    // mock de respuesta sin backend
    console.warn('Backend no disponible, simulando POST /alerts con', values);
    await new Promise((res) => setTimeout(res, 500)); // simula latencia
    alert(t('form.success'));
    resetForm();
  } catch (error) {
    alert(t('form.error'));
  }
}
