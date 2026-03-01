import { useEffect, useState } from "react";
import { type Token } from "@/features/fancy-form/types/token";
import { linkTokenDataImages } from "@/features/fancy-form/utils/token";

export default function useTokenData() {
  const [tokens, setTokens] = useState<Token[]>([])

  // fetch data
  useEffect(() => {
    const getTokenData = async () => {
      try {
        const res = await fetch('https://interview.switcheo.com/prices.json')

        if (res.ok) {
          const data = await res.json()

          // add id for token as the api doesn't return
          const token = data.map((item: Token) => ({
            ...item,
            id: item.id ?? crypto.randomUUID(),
          }))

          const modifiedTokens = linkTokenDataImages(token)

          setTokens(modifiedTokens)
        }
      } catch (error) {
        console.error(error)
      }
    }

    getTokenData()
  }, [])

  // mock swap token api
  const postTokenSwap = async (amountSend: number, sendTokenId: string, receiveTokenId: string) => {
    return true
  }

  return {
    tokens,
    postTokenSwap
  }
}
