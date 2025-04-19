import React from 'react';
import { Box, Typography } from '@mui/material';
import PolisBuilder from '../../components/PolisBuilder/polisBuilder';
import { Chat } from '../../components/Chat';

export default function MortgageInsurancePage() {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        pt: '64px',
        pb: { xs: 10, md: 12 },
        bgcolor: '#F2F5F9'
      }}
    >
      <Box className="container" sx={{ maxWidth: '1200px', mx: 'auto', px: 2 }}>
        <Box sx={{ 
          bgcolor: 'white', 
          borderRadius: '20px',
          overflow: 'hidden'
        }}>
          <PolisBuilder 
            params="YmFua19pZD0xJmRlYnQ9MTAwMDAwMCZvYmplY3RfdHlwZT1mbGF0JnNleD1tYWxl"
            whiteLabel="true"
            type="mortgage"
            title="Ипотечное страхование онлайн"
            subtitle="Лучший способ оценить, сравнить и купить страховку от надежных компаний"
            showCompanies="false"
            theme="custom"
            colors="%7B%22primary%22%3A%22%23333333%22%2C%22secondary%22%3A%22%237CB1FB%22%2C%22accent%22%3A%22%23703BF7%22%2C%22accentHover%22%3A%22%23946CF9%22%2C%22calculatorBlock1%22%3A%22%23333333%22%2C%22calculatorBlock2%22%3A%22%23946CF9%22%2C%22secondaryLight%22%3A%22%23F2F5F9%22%2C%22accentHoverLight%22%3A%22%23bba6fb%22%2C%22accentActive%22%3A%22%236435dd%22%2C%22calculatorBlock%22%3A%22%23333333%22%2C%22optionColor%22%3A%22%23FFFFFF%22%2C%22backgroundColor%22%3A%22%23F2F5F9%22%7D"
            partner="120024"
            hostname="polis812.ru"
          />
        </Box>

        <Box sx={{ mt: 4, mb: 4 }}>
          <Chat 
            title="Есть вопросы по ипотечному страхованию?"
            subtitle="Задайте их ИИ агенту"
          />
        </Box>
      </Box>
    </Box>
  );
}