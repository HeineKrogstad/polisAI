import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#141414',
        backgroundImage: 'url(/bglines.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'common.white',
        textAlign: 'center',
        px: 2
      }}
    >
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          mb: 2,
          fontWeight: 500
        }}
      >
        Страница не найдена, как вы попали сюда?
      </Typography>
      
      <Button
        component={Link}
        to="/"
        variant="outlined"
        sx={{
          color: 'common.white',
          borderColor: 'common.white',
          '&:hover': {
            borderColor: 'grey.300',
            color: 'grey.300',
          }
        }}
      >
        Вернуться на главную
      </Button>
    </Box>
  );
}