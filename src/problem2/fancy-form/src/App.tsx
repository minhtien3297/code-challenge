// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { FancyForm } from "@/features/fancy-form/components/atoms/input"
import { Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FancyForm/>} />
      </Routes>
    </>
  )
}

export default App
