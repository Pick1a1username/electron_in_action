import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';


const Application = () => {
    return (
        <div>
            <h1>Hello world!</h1>
            <button className="full-width">
                This button does not do anything.
            </button>
        </div>
    );
};

ReactDOM.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>,
  document.getElementById('app')
);
