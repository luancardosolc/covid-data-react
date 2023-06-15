import { useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Translator from "../i18n/translator";
import ColorModeContext from "../contexts/ColorModeContext";

export default function ColorModeSwitcher() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return <Box
    sx={{
      textAlign: 'right',
      bgcolor: 'background.default',
      color: 'text.primary',
      borderRadius: 1,
      p: 1,
    }}
  >
    <Translator translationKey={`${theme.palette.mode}Mode`} />
    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  </Box>
}
