import React, { useEffect, useState } from 'react'
import { Box, Container} from '@chakra-ui/react'
import LoginComponent from '../Components/Auth/LoginComponent/LoginComponent'
import axios from '../Axios/axios'
import { TOKEN } from '../Constants/constant'
import { Store } from '../Context/Context'
import { useNavigate } from 'react-router-dom'
import { nav } from '../Constants/routes'
function Login() {
  const [token,setToken]=useState()
  const {setUser}=Store()
  const navigate=useNavigate()
  useEffect(()=>{
    setToken(localStorage.getItem(TOKEN))
    if(token){
      axios.get('auth/get-req-user').then((res)=>{
        setUser(res.data)
        navigate(nav.DASHBOARD)
      }).catch(()=>{
        localStorage.clear()
        navigate(nav.HOME)
      })
    }
  },[token])
  return (
    <div>
    <Container max='xxl' centerContent>
    <Box mt={10} className="login_header">
      </Box>
      <Box mt={10} className="login_area">
        <LoginComponent/>
      </Box>
    </Container>
  </div>
  )
}

export default Login