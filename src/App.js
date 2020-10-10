import React, {Fragment, useState} from 'react';
import Form from './components/Form';
import Header from './components/Header';

function App() {

  const [valor, setValor] = useState('');
  return (
    <Fragment>
      <Header />
      <div className="container mt-4 p-4">
        <Form 
          valor = {valor}
          setValor = {setValor}
        />
      </div>
    </Fragment>
  );
}

export default App;
