import { useTheme, useMediaQuery } from '@mui/material';
import { ButtonsGalery } from './';
import { MobileButtonsGalery } from './';

const PRODUCT_TYPES = {
  OSAGO: {
    title: 'ОСАГО',
    path: '/osago',
    icon: '/icons/car.svg'
  },
  MORTGAGE: {
    title: 'Страховка ипотеки',
    path: '/mortgage',
    icon: '/icons/house.svg'
  },
  PROPERTY: {
    title: 'Страховка имущества',
    path: '/property',
    icon: '/icons/property.svg'
  },
  TRAVEL: {
    title: 'Страховка туриста',
    path: '/travel',
    icon: '/icons/tourist.svg'
  },
  SPORT: {
    title: 'Страховка для спорта',
    path: '/sport',
    icon: '/icons/sport.svg'
  },
  TICK: {
    title: 'Страховка от клеща',
    path: '/acarus',
    icon: '/icons/tick.svg'
  }
};

const ProductButtons = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return isMobile ? <MobileButtonsGalery /> : <ButtonsGalery />;
};

export default ProductButtons;