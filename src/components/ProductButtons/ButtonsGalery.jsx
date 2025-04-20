import { Box, useTheme, useMediaQuery } from '@mui/material';
import ProductButton from './ProductButton';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import FlightIcon from '@mui/icons-material/Flight';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BugReportIcon from '@mui/icons-material/BugReport';

const PRODUCT_TYPES = {
  OSAGO: {
    title: 'ОСАГО',
    path: '/osago',
    Icon: DirectionsCarIcon
  },
  MORTGAGE: {
    title: 'Страховка ипотеки',
    path: '/mortgage',
    Icon: HomeIcon
  },
  PROPERTY: {
    title: 'Страховка имущества',
    path: '/property',
    Icon: BusinessIcon
  },
  TRAVEL: {
    title: 'Страховка туриста',
    path: '/travel',
    Icon: FlightIcon
  },
  SPORT: {
    title: 'Страховка для спорта',
    path: '/sport',
    Icon: FitnessCenterIcon
  },
  TICK: {
    title: 'Страховка от клеща',
    path: '/acarus',
    Icon: BugReportIcon
  }
};

const ButtonsGalery = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(6, 1fr)',
        gap: isMobile ? 3 : 2,
        justifyContent: 'center',
        width: '100%',
        maxWidth: '100%',
        margin: '0 auto',
        px: isMobile ? 3 : 2,
        py: 2
      }}
    >
      {Object.values(PRODUCT_TYPES).map((product) => (
        <ProductButton 
          key={product.path}
          title={product.title}
          path={product.path}
          Icon={product.Icon}
        />
      ))}
    </Box>
  );
};

export default ButtonsGalery;