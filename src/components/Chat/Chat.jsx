import { useState } from 'react';
import { 
  Box, 
  TextField, 
  IconButton, 
  Paper, 
  Typography,
  CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { sendMessageToYandexGPT } from '../../services/yandexgpt';

const Chat = ({ title, subtitle, titleColor = '#333333', subtitleColor = '#666666' }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessageToYandexGPT(input);
      
      const botMessage = {
        text: response,
        sender: 'bot',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        text: 'Извините, произошла ошибка. Попробуйте еще раз.',
        sender: 'bot',
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        maxWidth: '1200px',
        margin: { xs: '10px auto', md: '0 auto' },
        padding: '20px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 4
        }}
      >
        <Box
          component="video"
          src="/images/agent.webm"
          autoPlay
          loop
          muted
          alt="AI Agent"
          sx={{
            width: '120px',
            height: '120px',
            display: { xs: 'none', md: 'block' },
            objectFit: 'cover',
            borderRadius: '16px',
            flexShrink: 0
          }}
        />
        <Box>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              color: titleColor,
              fontSize: { xs: '1.5rem', md: '1.75rem' },
              fontWeight: 700,
              mb: 1
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography 
              sx={{ 
                color: subtitleColor,
                fontSize: { xs: '1rem', md: '1.1rem' }
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '300px',
          width: '100%',
          bgcolor: '#1A1A1A',
          borderRadius: '20px',
          flex: 1,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden'
        }}
      >
        {/* Область сообщений */}
        <Box
          sx={{
            flex: 1,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '70%'
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  bgcolor: message.sender === 'user' ? '#8B5CF6' : '#2A2A2A',
                  color: 'white',
                  borderRadius: 2
                }}
              >
                <Typography variant="body1">
                  {message.text}
                </Typography>
              </Paper>
            </Box>
          ))}
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress size={24} sx={{ color: '#8B5CF6' }} />
            </Box>
          )}
        </Box>

        {/* Поле ввода */}
        <Box
          sx={{
            p: 2,
            borderTop: '1px solid #2A2A2A',
            bgcolor: '#1A1A1A'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center'
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Что такое титульное страхование?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: '#2A2A2A',
                  },
                  '&:hover fieldset': {
                    borderColor: '#8B5CF6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8B5CF6',
                  },
                },
              }}
            />
            <IconButton 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              sx={{
                bgcolor: '#8B5CF6',
                color: 'white',
                width: '40px',
                height: '40px',
                minWidth: '40px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  bgcolor: '#7C3AED',
                },
                '&.Mui-disabled': {
                  bgcolor: '#2A2A2A',
                  color: '#666666',
                }
              }}
            >
              <SendIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat; 