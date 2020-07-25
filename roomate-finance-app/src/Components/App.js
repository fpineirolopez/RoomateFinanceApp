import React from 'react';
import MonthNav from './MonthNav'
import {Container, Jumbotron} from "react-bootstrap";

require('bootstrap/dist/css/bootstrap.min.css')
require('./App.css')

function App() {

  return (

    <div>
      <Jumbotron fluid className="title-jumbo">
        <h1>Roommate Finance App</h1>
      </Jumbotron>
      <Container>
        <MonthNav />
      </Container>
    </div>

  )
}

export default App;
