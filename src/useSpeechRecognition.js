import { useState, useEffect, useRef } from 'react';

const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognition = useRef(null);
  const isListeningRef = useRef(false);
  const silenceTimer = useRef(null); 

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('Speech Recognition not supported');
      return;
    }

    recognition.current = new SpeechRecognition();
    recognition.current.continuous = true;
    recognition.current.interimResults = true;
    recognition.current.lang = 'en-US';

    recognition.current.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcriptChunk = result[0].transcript;

        if (result.isFinal) {
          finalTranscript += transcriptChunk + ' ';
        } else {
          interimTranscript += transcriptChunk;
        }
      }

      setTranscript(finalTranscript || interimTranscript);

      
      resetSilenceTimer();
    };

    recognition.current.onend = () => {
      if (isListeningRef.current) {
        try {
          recognition.current.start();
        } catch (error) {
          console.warn('SpeechRecognition already started.', error);
        }
      }
    };

    recognition.current.onerror = (e) => {
      console.error('Speech Recognition Error:', e.error);
      stopListening(); 
    };

    return () => {
      stopListening(); 
    };
  }, []);

  const resetSilenceTimer = () => {
    clearTimeout(silenceTimer.current);
    silenceTimer.current = setTimeout(() => {
      stopListening();
    }, 2000); 
  };

  const startListening = () => {
    if (!isListeningRef.current && recognition.current) {
      setTranscript('');
      setIsListening(true);
      isListeningRef.current = true;
      try {
        recognition.current.start();
        resetSilenceTimer(); 
      } catch (err) {
        console.warn('Recognition start error:', err.message);
      }
    }
  };

  const stopListening = () => {
    clearTimeout(silenceTimer.current); 
    if (recognition.current) {
      recognition.current.stop();
    }
    setIsListening(false);
    isListeningRef.current = false;
  };

  return { isListening, transcript, startListening, stopListening };
};

export default useSpeechRecognition;
