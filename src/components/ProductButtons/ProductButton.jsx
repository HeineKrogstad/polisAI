import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductButton = ({ title, path, Icon }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component={Link}
      to={path}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        ...(isMobile ? {
          gap: 1,
          transition: 'opacity 0.2s',
          '&:active': {
            opacity: 0.7
          }
        } : {
          p: 3,
          bgcolor: '#1A1A1A',
          borderRadius: 2,
          transition: 'transform 0.2s, background-color 0.2s, box-shadow 0.2s',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            bgcolor: '#262626',
            transform: 'translateY(-4px)',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)'
          },
          height: '160px',
          gap: 2
        })
      }}
    >
      {!isMobile ? (
        <Box
          sx={{
            width: 56,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            bgcolor: '#2A2A2A'
          }}
        >
          <Icon 
            sx={{ 
              fontSize: 28,
              color: '#8B5CF6'
            }} 
          />
        </Box>
      ) : (
        <Icon 
          sx={{ 
            fontSize: 24,
            color: '#8B5CF6'
          }} 
        />
      )}

      <Typography
        variant="subtitle1"
        sx={{
          color: 'common.white',
          textAlign: 'center',
          fontWeight: 500,
          lineHeight: 1.2,
          ...(isMobile ? {
            fontSize: '0.75rem'
          } : {})
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default ProductButton; 