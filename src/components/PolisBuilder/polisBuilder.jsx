import { useEffect, useRef } from 'react';

const PolisBuilder = (props) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Подавляем предупреждения от внешнего скрипта
    const originalConsoleWarn = console.warn;
    console.warn = (...args) => {
      if (args[0]?.includes?.('state') && args[0]?.includes?.('should be a method')) {
        return;
      }
      originalConsoleWarn.apply(console, args);
    };

    if (!containerRef.current || !props.type || !props.params) return;
    
    // Сохраняем ссылку на текущий контейнер для использования в функции очистки
    const currentContainer = containerRef.current;

    // Создаем уникальный ID для iframe
    const id = (
      Date.now().toString(36) + Math.random().toString(36).substring(2, 5)
    ).toUpperCase();    
    // Собираем параметры для URL
    const urlParams = new URLSearchParams();
    urlParams.append('params', props.params);
    
    // Добавляем все остальные параметры из props
    Object.entries(props).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== 'params') {
        urlParams.append(key, value);
      }
    });
    
    const hostname = props.hostname || window.location.hostname;
    
    // Создаем iframe
    const frame = document.createElement('iframe');
    frame.id = id;
    frame.src = `https://${hostname}/${props.type}/wl/?${urlParams.toString()}`;
    frame.style.cssText = 'width:100%;min-width:200px;min-height:480px;border:none;display:block;margin:0;padding:0;';
    
    frame.onload = () => {
      try {
        const script = document.createElement('script');
        script.src = `https://${hostname}/wl/script.js`;
        script.async = true;
        script.dataset.id = id;
        document.head.appendChild(script);
      } catch (error) {
        console.error('Error loading script:', error);
      }
    };
    
    // Очищаем и добавляем iframe
    if (currentContainer) {
      currentContainer.innerHTML = '';
      currentContainer.appendChild(frame);
    }
    
    // Функция очистки использует сохраненную ссылку
    return () => {
      // Восстанавливаем оригинальный console.warn
      console.warn = originalConsoleWarn;

      if (currentContainer) {
        currentContainer.innerHTML = '';
      }
      
      const script = document.querySelector(`script[data-id="${id}"]`);
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [props]);

  return <div ref={containerRef} style={{ display: 'block', margin: 0, padding: 0, lineHeight: 0 }} />;
};

export default PolisBuilder;