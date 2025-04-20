import { Box, Container, Typography, Grid } from '@mui/material';
import { ButtonsGalery } from '../../components/ProductButtons/';
import { Chat } from '../../components/Chat';
import { keyframes } from '@mui/system';

const moveForward = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`;

const INSURANCE_COMPANIES = [
  { name: 'Югория', logo: '/Logo_asset/48/Югория.svg' },
  { name: 'Альфа-страхование', logo: '/Logo_asset/48/Альфа-страхование.svg' },
  { name: 'Совкомбанк страхование', logo: '/Logo_asset/48/Совкомбанк_страхование.svg' },
  { name: 'Согласие', logo: '/Logo_asset/48/Согласие.svg' },
  { name: 'Абсолют страхование', logo: '/Logo_asset/48/Абсолют-страхование.svg' },
  { name: 'Ингосстрах', logo: '/Logo_asset/48/Ингосстрах.svg' },
  { name: 'Астро-Волга', logo: '/Logo_asset/48/Астро-Волга.svg' },
  { name: 'Гайде', logo: '/Logo_asset/48/Гайде.svg' },
  { name: 'АМТ', logo: '/Logo_asset/48/AMT.svg' },
  { name: 'Зетта', logo: '/Logo_asset/48/Zetta.svg' },
  { name: 'Евроинс', logo: '/Logo_asset/48/Евроинс.svg' },
  { name: 'Ренессанс', logo: '/Logo_asset/48/Ренессанс.svg' }
];

export default function Home() {
  return (
    <Box 
      sx={{ 
        bgcolor: '#141414',
        minHeight: '100vh',
        pt: { xs: 8, md: 12 },
        pb: { xs: 10, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to right, #141414, transparent 10%, transparent 90%, #141414)',
          pointerEvents: 'none',
          zIndex: 1
        }
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '200%',
          height: '100%',
          backgroundImage: 'url(/bglines.svg)',
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'contain',
          animation: `${moveForward} 120s linear infinite`,
          willChange: 'transform',
          opacity: 0.5
        }}
      />
      <Container 
        maxWidth="xl"
        sx={{
          position: 'relative',
          zIndex: 2
        }}
      >
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: { xs: 4, md: 8 },
            mb: 6
          }}
        >
          <Typography
            variant="h4"
            sx={{
              maxWidth: '600px',
              color: 'white',
              flex: 1,
              textAlign: 'center',
              mx: 'auto',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
            }}
          >
            Сравните предложения от 20+ страховых по 6 продуктам
          </Typography>

          <Grid 
            container 
            spacing={2} 
            sx={{ 
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {INSURANCE_COMPANIES.map((company) => (
              <Grid 
                item 
                key={company.name}
                xs={6}
                sm={3}
                lg={3}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Box
                  sx={{
                    bgcolor: 'grey.200',
                    borderRadius: '10px',
                    px: 2,
                    py: 1.5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: { xs: '40px', md: '60px' }
                  }}
                >
                  <Box
                    component="img"
                    src={company.logo}
                    alt={company.name}
                    sx={{
                      height: { xs: '16px', md: '32px' },
                      width: 'auto',
                      objectFit: 'contain'
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box 
          sx={{ 
            bgcolor: '#141414',
            borderRadius: '20px',
            p: 4,
            position: 'relative',
            zIndex: 2,
            width: '100%',
            maxWidth: '100%'
          }}
        >
          <ButtonsGalery />
        </Box>
        
        <Box sx={{ mt: { xs: 2, md: 8 }, mb: 2 }}>
          <Chat 
            title="Спросите ИИ агента любой вопрос о страховании"
            subtitle="Он вам подскажет"
            titleColor="white"
            subtitleColor="white"
          />
        </Box>
      </Container>
    </Box>
  );
}