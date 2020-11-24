import React, { useState, useRef } from 'react';
import { Container, InputGroup, FormControl, Button, Alert, Spinner } from 'react-bootstrap';
import Header from '../../components/Header';
import { ContentContainer, Form } from './styled';
import ShortController from './../../controllers/ShortController';

function Home() {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const inputURL = useRef(null);

  async function onSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setCode(null);
    
    if (!url) {
      setLoading(false);
      setError('Informe uma url para encurtar');
      return;
    }

    try {
      const shortController = new ShortController();
      const response = await shortController.store({ url });

      setCode(response.code);
    } catch (error) {
      setError('Ooopss, ocorreu um erro ao tentar encutar');
    }

    setLoading(false);
    setError(null);
  }

  function copyToClipboard() {
    if (inputURL) {
      const element = inputURL.current;
      element.select();
      document.execCommand('copy');
    }
  }

  return (
    <Container>
      <Header />
      <ContentContainer>
        <Form onSubmit={onSubmit}>
          <InputGroup className="mb-3">
            <FormControl 
              placeholder="Digite a url para encurtar" 
              defaultValue=""
              onChange={(event) => setUrl(event.target.value)} />
            <InputGroup.Append>
              <Button variant="primary" type="submit">Encurtar</Button>
            </InputGroup.Append>
          </InputGroup>

          {loading ? (<Spinner animation="border" />) : (
            code && (
              <>
                <InputGroup className="mb-3">
                  <FormControl 
                    defaultValue={`http://localhost:3000/${code}`}
                    ref={inputURL} />
                  <InputGroup.Append>
                    <Button variant="outline-secondary" 
                      onClick={() => copyToClipboard()}>Copiar</Button>
                  </InputGroup.Append>
                </InputGroup>
                <p>Para acompanhar as estatísticas, acesse {`http://localhost:3000/${code}`}</p>
              </>
            )
          )}
          {error && <Alert variant="danger">{error}</Alert>}
        </Form>
      </ContentContainer>
    </Container>
  );
}

export default Home;
