import React from 'react';
import MonthNav from './MonthNav'
import {Container, Jumbotron} from "react-bootstrap";

require('bootstrap/dist/css/bootstrap.min.css')
require('./App.css')

// const select_all_expenses = 'select * from expenses';

// const connection = mysql.connection({
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: '@dfa%M6759v@',
//   database: 'roomate_finances'
// });


function App() {

  // connection.connect(err => {
  //   if (err) console.log(err)
  // });

  // console.log(connection)

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
