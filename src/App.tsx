import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Box } from '@mui/material'
import ColorModeSwitcher from './components/ColorModeSwitcher';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
      }}
    >
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <ColorModeSwitcher />
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </Box>
  )
}

export default App
