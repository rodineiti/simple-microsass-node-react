import React, { useState, useEffect } from 'react';
import { Container, Spinner, Table, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../../components/Header';
import { StatsContainer } from './styled';
import ShortController from './../../controllers/ShortController';

function Links() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  
  useEffect(() => {    
    getLinks();
  }, []);

  async function getLinks() {
    setLoading(true);
    setData([]);
    
    try {
      const shortController = new ShortController();
      const response = await shortController.getLinks();
      setData(response);
    } catch (error) {
      setError('Ooopss, ocorreu um erro. Não foi possível obter os links');
    }

    setLoading(false);
  }

  async function destroy(code) {
    try {
      const shortController = new ShortController();
      await shortController.destroy(code);
      setMsg('Deletado com sucesso');
      getLinks();
    } catch (error) {
      setError('Ooopss, ocorreu um erro. Não foi possível obter os links');
      setMsg(null);
    }
  }

  return (
    <Container className="home">
      <Header />

      <StatsContainer className="text-center">
        {loading && (<Spinner animation="border" />)}
      </StatsContainer>

      {msg && (<StatsContainer>
        <Alert variant="success">{msg}</Alert>
      </StatsContainer>)}

      {error ? (
        <StatsContainer className="text-center">
          <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-circle" />
          <p className="m-3">{error}</p>
          <a className="btn btn-primary" href="/">Encurtar nova url</a>
        </StatsContainer>
      ) : (
        <StatsContainer className="text-center">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Url</th>
                <th>Código</th>
                <th>Visitas</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 && data.map((item, key) => (
                <tr key={key}>
                  <td>{item.id}</td>
                  <td>{item.url}</td>
                  <td>{item.code}</td>
                  <td>{item.hits}</td>
                  <td>
                    <Button 
                      className="btn btn-danger"
                      onClick={() => destroy(item.code)}
                    >Deletar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </StatsContainer>
      )}
    </Container>
  );
}

export default Links;
