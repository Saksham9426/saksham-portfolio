/** Platform detection for display-only keycaps (the handlers accept both metaKey and ctrlKey). */

function detectMac(): boolean {
  if (typeof navigator === 'undefined') return false
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } }
  const platform = nav.userAgentData?.platform ?? nav.platform ?? ''
  return /mac|iphone|ipad|ipod/i.test(platform)
}

const mac = detectMac()

export const isMac = () => mac

/** What to print on keycaps that toggle the palette. */
export const MOD_LABEL = mac ? '⌘K' : 'Ctrl K'
