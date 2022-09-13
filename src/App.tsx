import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='wrapper'>
        <h3>What to learn</h3>
        <div>
          <input></input>
          <button>+</button>
        </div>
        <ul>
          <li><input type="checkbox" checked={true} />HTML&CSS</li>
          <li><input type="checkbox" checked={true} />JS</li>
          <li><input type="checkbox" checked={true} />React</li>
        </ul>
        <div>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
      </div>
    </div>
  );
}

export default App;
