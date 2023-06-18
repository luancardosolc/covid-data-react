import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Autocomplete, Box, TextField } from "@mui/material"
import Translator from "./translator"

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const locales = [
    { label: 'English US', value: 'en-US' },
    { label: 'Português BR', value: 'pt-BR' },
  ]

  const [selectedLanguage, setSelectedLanguage] = useState(locales.find((locale) => locale.value === i18n.language))

  const handleLanguageChange = (_event: any, newValue: any | null) => {
    if (newValue?.value) {
      i18n.changeLanguage(newValue.value)
      setSelectedLanguage(locales.find((locale) => locale.value === i18n.language))
    }
  }

  return (
    <Box
      sx={{
        textAlign: 'right',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 1,
      }}
    >
      <Autocomplete
        value={selectedLanguage}
        onChange={handleLanguageChange}
        options={locales}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => <TextField {...params} label={<Translator translationKey='language' />} />}
      />
    </Box>
  )
}

export default LanguageSwitcher
