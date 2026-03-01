// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from "@/components/ui/sonner";
import SwapTokenPage from '@/features/fancy-form/components/pages/swap-token'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SwapTokenPage/>} />
      </Routes>

      <Toaster />
    </>
  )
}

export default App
