import React from 'react';
import CSSReset from '@tds/core-css-reset';
import './App.css';
import StepsForm from './formDemo/StepsForm';

function App() {
  return (
    <>
      <CSSReset />
      <div className="App">
        <header className="App-header">
          <div>
            <StepsForm></StepsForm>
          </div>
        </header>
      </div>
    </>
  );
}

export default App;
