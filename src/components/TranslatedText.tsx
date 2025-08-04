import { useTranslation } from 'react-i18next';

export const TranslatedText = () => {
  const { t } = useTranslation();

  return <p>{t('welcome')}</p>;
};
