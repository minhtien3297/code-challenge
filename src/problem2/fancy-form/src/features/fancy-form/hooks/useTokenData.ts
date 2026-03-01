import { useState } from "react";
import { type Token } from "@/features/fancy-form/types/token";

export default function useTokenData() {
  const [tokens, setTokens] = useState<Token[]>([])

  const getTokenData = async () => {
    try {
      const res = await fetch('https://interview.switcheo.com/prices.json')

      if (res.ok) {
        const data = await res.json()

        setTokens(data)
      }

    } catch (error) {
      console.error(error)
    }
  }

  return {
    getTokenData,
    tokens
  }
}
