import "./App.css";
import { useState, useEffect } from "react";

function App() {
  // Lista de notas
  const [notes, setNotes] = useState([]);

  // Campos do formulário
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);

  // Função para deletar uma nota
  const handleDelete = () => {
    fetch(`http://localhost:8090/api/notes/${selectedNote.id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setNotes(notes.filter(note => note.id !== selectedNote.id));
      setSelectedNote(null);
    })
  }
  
  // Função para salvar uma nova nota
  const handleSubmit = (event) => {
    event.preventDefault();

    const newNote = {title, content};

    fetch('http://localhost:8090/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    })
    .then(response => response.json())
    .then(savedNote => {
      setNotes([...notes, savedNote]);

      setTitle('');
      setContent('');
    });
  };
  
  // Buscar notas
  useEffect(() => {
    fetch("http://localhost:8090/api/notes")
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, []);
  console.log(notes);

  return (
    <>
      <h1>Meu App de Anotações</h1>
    <form onSubmit={handleSubmit}>
      <h2>Nova anotação:</h2>
      <div>
        <label htmlFor="title">Título</label>
        <input 
        type="text" 
        id="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="content">Conteúdo:</label>
        <textarea 
        id="content"
        value={content}
        onChange={e => setContent(e.target.value)}
        />
      </div>
      <button type="submit">Salvar</button>
    </form>
    {selectedNote && (
      <div>
        <h2>Detalhes da Nota:</h2>
        <h3>{selectedNote.title}</h3>
        <p>{selectedNote.content}</p>
        <button onClick={handleDelete}>Deletar</button>
      </div>

    )}
      <h2>Minhas Notas:</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id} onClick={() => setSelectedNote(note)}>{note.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
