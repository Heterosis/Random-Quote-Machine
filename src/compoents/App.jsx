import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Container, Spinner, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import style from './App.module.css';

const App = () => {
  const [loadingQuotes, setLoadingQuotes] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [quotePage, setQuotePage] = useState(1);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const loadQuotes = useCallback(async () => {
    setLoadingQuotes(true);
    const newQuotesResp = await axios.get(`https://quotesondesign.com/wp-json/wp/v2/posts?orderby=rand&page=${quotePage}`);
    const { data: newQuotes } = newQuotesResp;

    setQuotes(newQuotes);
    setQuoteIndex(0);
    setLoadingQuotes(false);
  }, [quotePage]);

  const htmlDecode = (input) => {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.documentElement.textContent;
  };

  const changeQuote = () => {
    if (quoteIndex < 9) {
      setQuoteIndex((pre) => pre + 1);
    } else {
      setQuotePage((pre) => pre + 1);
    }
  };

  useEffect(() => {
    loadQuotes();
  }, [quotePage]);

  if (_.isEmpty(quotes)) {
    return (
      <Container className={`d-flex justify-content-center align-items-center ${style.vh100}`}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container id="quote-box">
      <div>
        <div id="text-area">
          <div id="text" className="blockquote">
            {htmlDecode(quotes[quoteIndex].content.rendered)}
          </div>
          <div id="author" className="blockquote blockquote-footer font-italic me-2">
            {htmlDecode(quotes[quoteIndex].title.rendered)}
          </div>
        </div>
        <div id="button-area">
          <div className="d-flex">
            <Button
              href={`https://twitter.com/intent/tweet?text=${htmlDecode(quotes[quoteIndex].content.rendered)}-${htmlDecode(quotes[quoteIndex].title.rendered)}`}
              target="_blank"
              className="d-flex justify-content-center align-items-center me-2"
              style={{ backgroundColor: '#1DA1F2', borderColor: '#1DA1F2' }}
            >
              <FontAwesomeIcon icon={['fab', 'twitter']} className={`${style.BtnIcon}`} />
            </Button>
            <Button
              href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${htmlDecode(quotes[quoteIndex].content.rendered)}-${htmlDecode(quotes[quoteIndex].title.rendered)}`}
              target="_blank"
              className="d-flex justify-content-center align-items-center"
              style={{ backgroundColor: '#4267B2', borderColor: '#4267B2' }}
            >
              <FontAwesomeIcon icon={['fab', 'facebook-f']} className={`${style.BtnIcon}`} />
            </Button>
          </div>
          <Button
            variant="info"
            disabled={loadingQuotes}
            onClick={changeQuote}
            className="d-flex justify-content-center align-items-center"
          >
            {loadingQuotes ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : <FontAwesomeIcon icon={['fas', 'random']} className={`${style.BtnIcon}`} />}
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default App;
