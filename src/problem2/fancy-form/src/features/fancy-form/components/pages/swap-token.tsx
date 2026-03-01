import SwapFormTemplate from "@/features/fancy-form/components/templates/swap-form/index"
import { useEffect } from "react"
import useTokenData from "@/features/fancy-form/hooks/useTokenData"

export default function SwapTokenPage() {
  const {getTokenData} = useTokenData()

  useEffect(() => {
    getTokenData()
  }, [])

  return (
    <SwapFormTemplate />
  )
}
