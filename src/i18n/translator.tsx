import { useTranslation } from 'react-i18next'

interface TranslatorProps {
  translationKey: string;
}

const Translator = ({ translationKey }: TranslatorProps) => {
  const { t } = useTranslation()
  return <>{t(translationKey)}</>
}

export default Translator
