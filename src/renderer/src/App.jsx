
import Header from './components/Header'
import Fragments from './components/pages/Fragments'
import Tags from './components/pages/Tags'
import Info from './components/pages/Info'
function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <Header />
      <Fragments />
      <Tags />
      <Info />
    </>
  )
}

export default App
