import useFetch from '../hooks/useFetch'
import {useContext, useEffect, useState} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import {CurrentUserContext} from '../context/currentUser'

const CurrentUserChecker = ({children}) => {
  const [, doFetch] = useFetch('/user')
  const [token] = useLocalStorage('token')
  const [, setCurrentUserState] = useContext(CurrentUserContext)
  const [response, setResponse] = useState(null)

  useEffect(() => {
    if (!token) setCurrentUserState(state => ({
      ...state,
      isLoggedIn: false
    }))
    doFetch({
      headers: {
        authorization: token ? `Token ${token}` : ''
      }
    }).then(setResponse)
    setCurrentUserState(state => ({
      ...state, isLoading: true
    }))
  }, [doFetch, setCurrentUserState, token])

  useEffect(() => {
    if (!response) return

    setCurrentUserState(state => ({
      ...state,
      isLoggedIn: true,
      isLoading: false,
      currentUser: response.user
    }))
  }, [response, setCurrentUserState])

  return children
}

export default CurrentUserChecker