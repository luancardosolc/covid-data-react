import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Button, Grid } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Button variant="text">Vite</Button>
        </Grid>
        <Grid item xs={2}>
          <h1>+</h1>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained">React</Button>
        </Grid>
        <Grid item xs={2}>
          <h1>+</h1>
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined">Luan</Button>
        </Grid>
      </Grid>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
