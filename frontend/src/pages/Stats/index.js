import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { parseISO, formatRelative } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Header from '../../components/Header';
import { StatsContainer, StatsRow, StatsBox, StatsBoxTitle } from './styled';
import ShortController from './../../controllers/ShortController';

function Stats() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const code = useParams().code;

  useEffect(() => {
    async function getStats() {
      setLoading(true);
      setData({});

      if (!code) {
        setLoading(false);
        setError('Informe o código');
        return;
      }
      
      
      try {
        const shortController = new ShortController();
        const response = await shortController.getStats(code);

        const parseDate = parseISO(response.updatedAt);
        const currentDate = new Date();
        const relativeDate = formatRelative(parseDate, currentDate, {
          locale: ptBR
        });

        response.relativeDate = relativeDate;
        setData(response);
      } catch (error) {
        setError('Ooopss, ocorreu um erro. Verifiquei o código da url');
      }

      setLoading(false);
    }
    getStats();
  }, [code]);

  return (
    <Container className="home">
      <Header />

      <StatsContainer className="text-center">
        {loading && (<Spinner animation="border" />)}
      </StatsContainer>

      {error ? (
        <StatsContainer className="text-center">
          <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-circle" />
          <p className="m-3">{error}</p>
          <a className="btn btn-primary" href="/">Encurtar nova url</a>
        </StatsContainer>
      ) : (
        <StatsContainer className="text-center">
          <p><b>{`http://localhost:3000/${data.code}`}</b></p>
          <p>Redireciona para: <br/>{data.url}</p>
          <StatsRow>
            <StatsBox>
              <b>{data.hits}</b>
              <StatsBoxTitle>Visitas</StatsBoxTitle>
            </StatsBox>
            <StatsBox>
              <b>{data.relativeDate}</b>
              <StatsBoxTitle>Última visita</StatsBoxTitle>
            </StatsBox>
          </StatsRow>
          <a className="btn btn-primary" href="/">Encutar nova url</a>
        </StatsContainer>
      )}
    </Container>
  );
}

export default Stats;
