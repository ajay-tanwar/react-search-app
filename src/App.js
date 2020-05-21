import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from './components/_header'
import Search from './components/_search'
import './App.css';


class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Header/>
        <Container className="themed-container mt-5">
          <Row>
            <Search/>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
