import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import DataTable from './components/DataTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <DataTable/>
  )
}

export default App
