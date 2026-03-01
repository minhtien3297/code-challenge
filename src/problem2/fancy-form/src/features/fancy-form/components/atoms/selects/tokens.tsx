"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import TokenIcon from "@/features/fancy-form/components/atoms/icons/token"
import { useEffect, useMemo } from "react"
import type { Token } from "@/features/fancy-form/types/token"

type Props = {
  tokens: Token[]
  chosenValue: string
  onChosenValueChange: (value: string) => void
}

export default function TokenSelect({ tokens, chosenValue, onChosenValueChange }: Props) {
  const selectedToken = useMemo(() => {
    return tokens.find((token) => token.id === chosenValue)
  }, [tokens, chosenValue])

  // choose the first token as default token
  useEffect(() => {
    if (tokens.length > 0 && chosenValue === '') {
      onChosenValueChange(tokens[0].id)
    }

  }, [tokens, chosenValue])

  return (

    <Select
      value={chosenValue}
      onValueChange={(newValue: string) => onChosenValueChange(newValue ?? '')}
    >
      <SelectTrigger className="w-full">
        <SelectValue>
          {selectedToken && (
            <>
              <TokenIcon src={selectedToken?.image ?? ''} />
              <span className="text-black">{selectedToken.currency}</span>
            </>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {tokens.map((token) => (

            <SelectItem value={token.id}>
              <TokenIcon src={token.image} />
              <span>{token.currency}</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

