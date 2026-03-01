import { Routes, Route } from 'react-router-dom'
import { Toaster } from "@/components/ui/sonner";
import SwapTokenPage from '@/features/fancy-form/components/pages/swap-token'
import NotFoundPage from '@/pages/NotFound'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SwapTokenPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster />
    </>
  )
}

export default App
