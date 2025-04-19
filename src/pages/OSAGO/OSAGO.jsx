import { Box, Container } from '@mui/material';
import { useEffect, useRef } from 'react';
import { Chat } from '../../components/Chat';

export default function OSAGO() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Проверяем, не существует ли уже скрипт
    const existingScript = document.querySelector('script[src="https://widgets.inssmart.ru/widgets/b2c-frame.loader.js"]');
    if (existingScript) {
      return;
    }

    // Создаем скрипт
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://widgets.inssmart.ru/widgets/b2c-frame.loader.js';
    script.setAttribute('data-id', 'inssmart-b2c');
    script.setAttribute('data-origin', 'https://widgets.inssmart.ru');
    script.setAttribute('data-product', '/eosago');
    script.setAttribute('data-token', '63130fe8-b406-50f9-b832-874a7d4cd597');
    script.setAttribute('data-secret', '491be66a-5b38-591d-8191-d4a332bb781c');

    // Добавляем скрипт в контейнер
    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    // Очистка при размонтировании
    return () => {
      if (containerRef.current && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <Box 
      sx={{ 
        bgcolor: '#F2F5F9',
        minHeight: '100vh',
        pt: { xs: 8, md: 12 },
        pb: { xs: 10, md: 12 }
      }}
    >
      <Container maxWidth="xl">
        <div 
          ref={containerRef}
          style={{
            width: '100%',
            minHeight: '600px',
            border: 'none'
          }}
        />
        
        <Box sx={{ mt: 4 }}>
          <Chat 
            title="Спросите ИИ агента любой вопрос об ОСАГО"
            subtitle="Он вам подскажет"
            titleColor="#333333"
            subtitleColor="#666666"
          />
        </Box>
      </Container>
    </Box>
  );
}
