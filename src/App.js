import {BrowserRouter} from 'react-router-dom'

import TopBar from './components/topBar'
import Routes from './routes'

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes />
    </BrowserRouter>
  )
}

export default App
