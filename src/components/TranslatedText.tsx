import React from 'react';
import { useTranslation } from 'react-i18next';

const TranslatedText = ({ tKey }: { tKey: string }) => {
  const { t } = useTranslation();
  return <>{t(tKey)}</>;
};

export default TranslatedText;
