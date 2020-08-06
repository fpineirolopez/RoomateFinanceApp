import React from 'react';
import MonthNav from './MonthNav'
import {Container, Jumbotron} from "react-bootstrap";

// reference bootstrap css stylesheet and my own stylesheet
require('bootstrap/dist/css/bootstrap.min.css')
require('./App.css')

function App() {
  return (
    <div>
      {/* jumbotron element - always displayed */}
      <Jumbotron fluid className="title-jumbo">
        <h1>Roommate Finance App</h1>
      </Jumbotron>
      <Container>
        {/* Call Month Nav component, which is the main component for our application */}
        <MonthNav />
      </Container>
    </div>

  )
}

export default App;
