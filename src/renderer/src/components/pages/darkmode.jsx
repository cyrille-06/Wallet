
export function initDarkMode() {
  const saved = localStorage.getItem('theme') // Récupère le thème sauvegardé
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches // Préférence système
  const theme = saved || (prefersDark ? 'dark' : 'light') // Choisit le thème
  document.documentElement.setAttribute('data-theme', theme) // Applique le thème
}

/**
 * Bascule entre le mode sombre et clair.
 * Met à jour l'attribut `data-theme` et sauvegarde le choix dans localStorage.
 */
export function toggleDarkMode() {
  const current = document.documentElement.getAttribute('data-theme') // Thème actuel
  const newTheme = current === 'dark' ? 'light' : 'dark' // Inverse le thème
  document.documentElement.setAttribute('data-theme', newTheme) // Applique le nouveau thème
  localStorage.setItem('theme', newTheme) // Sauvegarde dans localStorage
}
