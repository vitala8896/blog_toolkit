import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logout } from '../../services/auth/authLogin'

const Logout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(logout())
  }, [])
  return <Redirect to={'/'} />
}

export default Logout