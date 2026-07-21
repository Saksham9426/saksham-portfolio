/**
 * Subsequence fuzzy match. Returns null when the query doesn't match,
 * otherwise a score (higher = better): consecutive runs and word-starts
 * score up, longer targets score slightly down.
 */
export function fuzzyScore(query: string, target: string): number | null {
  const q = query.toLowerCase().replace(/\s+/g, '')
  const t = target.toLowerCase()
  if (!q) return 0
  let score = 0
  let ti = 0
  let prev = -2
  for (const c of q) {
    const found = t.indexOf(c, ti)
    if (found === -1) return null
    score += 1
    if (found === prev + 1) score += 2
    if (found === 0 || /[\s\-—·/.]/.test(t[found - 1])) score += 3
    prev = found
    ti = found + 1
  }
  return score - t.length * 0.01
}
