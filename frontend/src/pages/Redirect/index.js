import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../../components/Header';
import { StatsContainer } from './styled';
import ShortController from './../../controllers/ShortController';

function Redirect() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const code = useParams().code;

  useEffect(() => {
    async function getLink() {
      setLoading(true);
      
      if (!code) {
        setLoading(false);
        setError('Informe o código');
        return;
      }
      
      try {
        const shortController = new ShortController();
        const response = await shortController.getLink(code);

        window.location = response.url;
      } catch (error) {
        setError('Ooopss, ocorreu um erro. Verifiquei o código da url');
      }

      setLoading(false);
    }
    getLink();
  }, [code]);

  return (
    <Container className="home">
      <StatsContainer className="text-center">
        {loading && (<Spinner animation="border" />)}
      </StatsContainer>

      {error ? (
        <>
          <Header>Seu novo encurtador de url</Header>
          <StatsContainer className="text-center">
            <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-circle" />
            <p className="m-3">{error}</p>
            <a className="btn btn-primary" href="/">Encurtar nova url</a>
          </StatsContainer>
        </>
      ) : (
        <Header>Redicionando...</Header>
      )}
    </Container>
  );
}

export default Redirect;
