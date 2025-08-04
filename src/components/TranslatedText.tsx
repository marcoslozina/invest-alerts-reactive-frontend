const TranslatedText = ({ tKey }: { tKey: string }) => {
  const { t } = useTranslation();
  return <>{t(tKey)}</>;
};

export default TranslatedText;