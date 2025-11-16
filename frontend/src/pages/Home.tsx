import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store/index';
import { authActions } from '../store/authSlice';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function Home() {
const dispatch = useDispatch();
const navigate = useNavigate();

  const userData = useSelector((state: RootState) => state.authentication)
  console.log(userData)

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate('/');
  }

  return <>
  <Box sx={{ textAlign: 'center', mb: 4 }}>
    <Typography variant="h4" align="center">
      Bienvenido {userData.userName}, tu rol es {userData.userRol}
    </Typography>

    <Button
      variant="contained"
      color='error'
      sx={{mt: 3}}
      onClick= {handleLogout}
    >
      Cerrar sesión
    </Button>
  </Box>
  
  </>
}
