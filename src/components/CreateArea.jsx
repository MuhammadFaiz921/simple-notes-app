import React, { useState, useEffect } from 'react';
import { IoAddOutline, IoMic, IoMicOff } from 'react-icons/io5';
import useSpeechRecognition from '../useSpeechRecognition';

const CreateArea = ({ onAdd }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState({ title: '', content: '' });
  const { transcript, isListening, startListening, stopListening } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setNote((prevNote) => ({
        ...prevNote,
        content: transcript,
      }));
    }
  }, [transcript]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleExpanded = () => {
    setIsExpanded(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (note.title.trim() === '' && note.content.trim() === '') {
      return;
    }
    onAdd(note);
    setNote({ title: '', content: '' });
    setIsExpanded(false);
  };

  const toggleMic = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };


  return (
    <div>
      <form>
        {isExpanded && (
          <input
            value={note.title}
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />
        )}
        <p>
          <textarea
            value={note.content}
            onClick={handleExpanded}
            name="content"
            placeholder="Take a note..."
            onChange={handleChange}
            rows={isExpanded ? 3 : 1}
          ></textarea>
        </p>

        <div className="floating-buttons">
          <button type="button" onClick={toggleMic} className="mic-button">
            {isListening ?<IoMicOff /> : <IoMic />}
          </button>
          <button type="button" onClick={handleSubmit} className="add-button">
            <IoAddOutline />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateArea;
