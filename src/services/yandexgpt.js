const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

export const sendMessageToYandexGPT = async (message) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(errorData.error || 'Неизвестная ошибка');
    }

    const data = await response.json();
    return data.answer;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}; 