import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useContext, useState} from 'react'
import useFetch from '../../hooks/useFetch'
import useLocalStorage from '../../hooks/useLocalStorage'
import {CurrentUserContext} from '../../context/currentUser'
import {BackendErrorMessages} from './components/backendErrorMessages'

const Authentication = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const navigate = useNavigate()

  const location = useLocation()

  const isLogin = location.pathname === '/login'
  const pageTitle = isLogin ? 'Sign In' : 'Sign Up'
  const descriptionLink = isLogin ? '/register' : '/login'
  const descriptionText = isLogin ? 'Need an account?' : 'Have an account?'

  const loginOrRegisterEndpoint = isLogin ? '/users/login' : '/users'
  const [{isLoading, error}, doFetch] = useFetch(loginOrRegisterEndpoint)
  const [, setToken] = useLocalStorage('token')
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext)

  console.log('currentUserState', currentUserState)

  const handleSubmit = async ($event) => {
    $event.preventDefault()

    try {
      const data = await doFetch({
        method: 'post',
        data: {
          user: isLogin ? {email, password} : {username, email, password},
        },
      })

      // if (!data?.user?.token) {
      //   throw new Error('Invalid response from server')
      // }

      // if (!data) return

      setToken(data.user.token)
      setCurrentUserState((state) => ({
        ...state,
        isLoading: false,
        isLoggedIn: true,
        currentUser: data.user,
      }))
      navigate('/')
    } catch {
      // surfaced via `error` state
    }
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{pageTitle}</h1>
            <p className="text-xs-center">
              <Link to={descriptionLink}>{descriptionText}</Link>
            </p>
            <form onSubmit={handleSubmit}>
              {error && <BackendErrorMessages errors={error.errors} />}
              <fieldset>
                {!isLogin && (
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </fieldset>
                )}
                <fieldset className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={isLoading}
                >
                  {pageTitle}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Authentication
