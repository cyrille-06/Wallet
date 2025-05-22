import Store from 'electron-store'

const store = new Store({
  name: 'snippets',
  defaults: {
    snippets: []
  }
})

export function getSnippets() {
  return store.get('snippets')
}

export function saveSnippet(snippet) {
  const snippets = store.get('snippets') || []
  snippets.push(snippet)
  store.set('snippets', snippets)
}
