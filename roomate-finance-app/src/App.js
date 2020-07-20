import React from 'react';
import './App.css';
import MonthNav from './MonthNav'
import {Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (

    <div>
      <h1>Roommate Finance App</h1>
        <Container>
          <MonthNav />
        </Container>
    </div>

  )
}

export default App;
