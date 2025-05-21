/**
 * Generates a token symbol based on the given token name.
 * @param tokenName - The name of the token.
 * @returns The generated token symbol.
 * @throws {Error} If the token name is invalid.
 */
export function generateTokenSymbol(tokenName: string): string {
  if (!tokenName || typeof tokenName !== 'string') {
    throw new Error('Invalid token name')
  }

  // Split the token name into words
  const words = tokenName.trim().split(' ')

  let symbol: string
  if (words.length === 1) {
    // If the token name is a single word, take the first 3 characters
    symbol = words[0].slice(0, 4).toUpperCase()
  } else {
    // If the token name has multiple words, take the first letter of each word
    // 4 letter max
    symbol = words
      .map((word) => word[0].toUpperCase())
      .join('')
      .slice(0, 4)
  }

  return `${symbol}`
}
