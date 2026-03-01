import type { Token } from "@/features/fancy-form/types/token";

export function linkTokenDataImages(tokens: Token[]) {
  if (tokens.length === 0) return []

  const modifiedTokens = tokens.map((token) => ({
    ...token,
    image: '/assets/' + token.currency + '.svg'
  }))

  return modifiedTokens
}
