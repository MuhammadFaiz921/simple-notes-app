import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CreateArea from './components/CreateArea';
import Note from './components/Note';
import Count from './components/Count';
import StatusBar from './components/StatusBar';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusVisible, setStatusVisible] = useState(false);
  const [statusType, setStatusType] = useState('');

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    if (savedNotes && Array.isArray(savedNotes)) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const showStatus = (message, type = 'info', duration = 1500) => {
    setStatusMessage(message);
    setStatusType(type);
    setStatusVisible(true);
    setTimeout(() => {
      setStatusVisible(false);
    }, duration);
  };

  const addNote = (newNote) => {
    if (!newNote.title.trim() && !newNote.content.trim()) {
      showStatus('📭 Cannot add an empty note!', 'empty', 1800);
      return;
    }
    newNote.id = new Date().getTime();
    setNotes((prevNotes) => [...prevNotes, newNote]);
    showStatus('✅ saved', 'add');
  };

  const deleteNotes = (id) => {
    setNotes((prevNotes) => {
      const newNotes = prevNotes.filter((note) => note.id !== id);
      showStatus('🗑️ deleted', 'delete');
      return newNotes;
    });
  };

  return (
    <div className="App">
      <Header />
      <Count count={notes.length === 0 ? 'Empty' : `Showing ${notes.length} Notes in Database`} />
      <CreateArea onAdd={addNote} />
      <div className="notes-grid">
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            onDelete={deleteNotes}
          />
        ))}
      </div>

      {/* Status Bar */}
      <StatusBar message={statusMessage} isVisible={statusVisible} type={statusType} />
    </div>
  );
};

export default App;
