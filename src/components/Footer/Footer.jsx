import { Box, Container, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { MAIN_MENU_ITEMS } from '../../constants/constants';

const MENU_PATHS = {
  'ОСАГО': '/osago',
  'Ипотека': '/mortgage',
  'Имущество': '/property',
  'Путешествие': '/travel',
  'Спорт': '/sport',
  'Антиклещ': '/acarus'
};

export default function Footer () {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box 
      component="footer" 
      sx={{ 
        py: { xs: 2, sm: 3 }, 
        bgcolor: 'grey.900',
        mt: 'auto'
      }}
    >
      <Container maxWidth="md">
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2, sm: 3 }
          }}
        >
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 2, sm: 4 }
          }}>
            <Box
              component={Link}
              to="/"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: { xs: 1, sm: 2 },
                textDecoration: 'none',
                '&:hover': {
                  '& .footer-title': {
                    color: 'grey.300'
                  }
                }
              }}
            >
              <img 
                src="/logo.svg" 
                alt="Полис AI" 
                style={{ 
                  height: isMobile ? '30px' : '40px',
                  width: 'auto'
                }} 
              />
              <Typography 
                variant="h6" 
                className="footer-title"
                sx={{ 
                  color: 'common.white',
                  fontSize: { xs: '1rem', sm: '1.25rem' }
                }}
              >
                Полис AI
              </Typography>
            </Box>

            <Box sx={{ 
              display: { xs: 'grid', sm: 'flex' },
              gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'none' },
              gridTemplateRows: { xs: 'repeat(2, auto)', sm: 'none' },
              gap: { xs: 2, sm: 3 },
              justifyContent: 'center',
              maxWidth: { xs: '300px', sm: 'none' },
              margin: '0 auto'
            }}>
              {MAIN_MENU_ITEMS.map((item) => (
                <Typography
                  key={item}
                  component={Link}
                  to={MENU_PATHS[item]}
                  sx={{
                    color: 'common.white',
                    textDecoration: 'none',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    textAlign: 'center',
                    '&:hover': {
                      color: 'grey.300'
                    }
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>

          <Typography 
            variant="body2" 
            sx={{ 
              color: 'grey.500',
              textAlign: 'center',
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}
          >
            © 2025 Полис AI. Все права защищены.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};