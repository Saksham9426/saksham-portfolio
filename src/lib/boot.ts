/** Return the visitor to the terminal boot sequence. */
export function replayBoot() {
  sessionStorage.removeItem('sa:booted')
  window.history.replaceState(null, '', window.location.pathname)
  window.location.reload()
}
