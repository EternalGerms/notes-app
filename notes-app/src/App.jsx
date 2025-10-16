import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch("http://localhost:8090/api/notes")
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, []);
  console.log(notes);

  return (
    <>
      <h1>Meu App de Anotações</h1>
    <form>
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
      <h2>Minhas Notas:</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
