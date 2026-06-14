import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'

const Authentication = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmited, setSubmited] = useState(false)

  // const logWithPrefix = (prefix) => msg => console.log(prefix, msg)

  useEffect(() => {
    if (!isSubmited) return
    
    axios('http://localhost:3000/api/users/login', {
      method: 'post',
      data: {
        user: {
          email,
          password,
         },
      },
    }).then(res => {
      console.log('success', res)
      setSubmited(false)
    }).catch(err => {
      console.log('error', err)
      setSubmited(false)
    })
    // .then(logWithPrefix('[SUCCESS]')).catch(logWithPrefix('[ERROR]'))
  }, [isSubmited, email, password])

  const handleSubmit = ($event) => {
    $event.preventDefault()
    setSubmited(true)
    console.log('data', email, password)
  }
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Login</h1>
            <p className="text-xs-center">
              <Link to="register">Need an account?</Link>
            </p>
            <form onSubmit={handleSubmit}>
              <fieldset>
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
                  disabled={isSubmited}
                >
                  Sign in
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
