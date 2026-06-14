import {useEffect, useRef, useState, useCallback} from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

export default function useFetch(endpoint) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const controllerRef = useRef(null)

  const doFetch = useCallback(async (config = {}) => {
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller
    setError(null)
    setIsLoading(true)
    try {
      const res = await axios(API_URL + endpoint, {
        ...config,
        signal: controller.signal,
      })
      return res.data
    } catch (err) {
      if (axios.isCancel(err)) return null
      setError(err.response?.data || {errors: {general: ['Request failed']}})
      throw err
    } finally {
      if (!controller.signal.aborted) setIsLoading(false)
    }
  }, [endpoint])

  useEffect(() => () => controllerRef.current?.abort(), [])

  return [{isLoading, error}, doFetch]
}
