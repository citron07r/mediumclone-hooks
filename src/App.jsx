import {BrowserRouter} from 'react-router-dom'

import TopBar from './components/topBar'
import Routes from './routes'
import {CurrentUserProvider} from './context/currentUser'
import CurrentUserChecker from './components/currentUserChecker'

function App() {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <BrowserRouter>
          <TopBar />
          <Routes />
        </BrowserRouter>
      </CurrentUserChecker>
    </CurrentUserProvider>
  )
}

export default App
