import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box, 
  Typography, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import BugReportIcon from '@mui/icons-material/BugReport';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const MENU_PATHS = {
  'Осаго': { path: '/osago', icon: <DirectionsCarIcon /> },
  'Ипотека': { path: '/mortgage', icon: <AccountBalanceIcon /> },
  'Имущество': { path: '/property', icon: <HomeIcon /> },
  'Путешествие': { path: '/travel', icon: <FlightTakeoffIcon /> },
  'Спорт': { path: '/sport', icon: <SportsSoccerIcon /> },
  'Антиклещ': { path: '/acarus', icon: <BugReportIcon /> }
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: '#111111',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto'
      }}
    >
      <List sx={{ flex: 1, py: 2 }}>
        {Object.entries(MENU_PATHS).map(([title, { path, icon }]) => (
          <ListItem 
            key={path} 
            component={Link} 
            to={path}
            onClick={handleDrawerToggle}
            sx={{ 
              color: 'white',
              py: 2,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>
              {icon}
            </ListItemIcon>
            <ListItemText 
              primary={title} 
              primaryTypographyProps={{ 
                fontSize: '1.2rem',
                fontWeight: 500
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: 'rgba(17, 17, 17, 0.8)',
          backdropFilter: 'blur(10px)',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Toolbar sx={{ 
          justifyContent: isMobile ? 'space-between' : 'center', 
          px: 2
        }}>
          {isMobile ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <img src="/logo.svg" alt="Полис AI" style={{ height: '40px' }} />
                <Typography 
                  variant="h5" 
                  component={Link} 
                  to="/"
                  sx={{ 
                    color: 'common.white',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    '&:hover': {
                      color: 'grey.300'
                    }
                  }}
                >
                  Полис AI
                </Typography>
              </Box>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ color: 'white' }}
              >
                <MenuIcon />
              </IconButton>
            </>
          ) : (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 4,
              justifyContent: 'center'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <img src="/logo.svg" alt="Полис AI" style={{ height: '40px' }} />
                <Typography 
                  variant="h5" 
                  component={Link} 
                  to="/"
                  sx={{ 
                    color: 'common.white',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    '&:hover': {
                      color: 'grey.300'
                    }
                  }}
                >
                  Полис AI
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {Object.entries(MENU_PATHS).map(([title, { path }]) => (
                  <Button 
                    key={path} 
                    component={Link}
                    to={path}
                    sx={{ 
                      color: 'common.white',
                      textTransform: 'none',
                      fontWeight: 500,
                      fontSize: '1rem',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    {title}
                  </Button>
                ))}
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: '100%',
            bgcolor: '#111111',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
            mt: '56px'
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}