
import Header from './components/Header'
import Fragments from './components/pages/Fragments'
function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <Header />
      <Fragments />
    </>
  )
}

export default App
