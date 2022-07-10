import './App.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfoContainer from './components/InfoContainer';

function App() {
  const TX_HASH = "a96894f105f6bcc2da43076230a6bdf0ce81db416552f025efa7638a51b6b4ea";
  const [txInfo, setTxInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    getTxData();
  }, []);

  // Get transaction data from API
  function getTxData() {
    axios.get(`https://cardano-mainnet.blockfrost.io/api/v0/txs/${TX_HASH}/metadata`, {
      headers: {
        'project_id': process.env.REACT_APP_BLOCKFROST_KEY,
      },
      validateStatus: (status) => status === 200,
    }).then((res) => {
      setErrorMessage(null) // Nel caso in cui la funzione venga chiamata più volte inizializzo errorMessage a null
      setTxInfo({ hash: TX_HASH, ...res.data[0].json_metadata }); //Aggiungi l'hash agli altri dati della tx
    }).catch((error) => {
      setErrorMessage(error.message)
    })
  }


  return (
    <Container fluid>
      <Row className='p-md-4 my-row'>
        <Col className="px-0 border-0 " md={12}>
          <Card className='mx-auto w-100 my-card'>
            <InfoContainer error={errorMessage} data={txInfo} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
