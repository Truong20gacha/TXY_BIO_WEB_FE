import data from '@/data/information.json'

// Registry of tokens that can appear inline in JSON copy.
// Add new tokens here as needed (e.g. {year}, {certCount}).
const TOKENS: Record<string, () => string> = {
  productCount: () => data.products.length.toString(),
}

const TOKEN_RE = /\{(\w+)\}/g

/**
 * Replace {tokenName} placeholders in a string with their resolved values.
 * Unknown tokens are left intact so missing replacements are visible in the UI.
 */
export function formatCopy(text: string): string {
  return text.replace(TOKEN_RE, (match, key: string) => {
    const resolver = TOKENS[key]
    return resolver ? resolver() : match
  })
}
