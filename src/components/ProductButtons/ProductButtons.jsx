import { Grid } from '@mui/material';
import ProductButton from './ProductButton';

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
  return (
    <Grid 
      container 
      spacing={2}
      sx={{
        justifyContent: 'center',
        maxWidth: 'lg',
        mx: 'auto',
        px: 2
      }}
    >
      {Object.values(PRODUCT_TYPES).map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={product.path}>
          <ProductButton 
            title={product.title}
            path={product.path}
            icon={product.icon}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductButtons;