import React from 'react';
import { Widget as Todos } from './features/todos/Widget';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <div className="App">
      <Todos title={'TODO'} />
    </div>
  );
}

export default App;
