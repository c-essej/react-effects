import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from './Card';

const BASE_URL = 'https://deckofcardsapi.com/api/deck';


function Deck() {

  const [deck, setDeck] = useState({
    deckId: null,
    remaining: null,
    isLoading: true
  });

  const [cards, setCards] = useState([]);

  console.log("STATE => DECK IS", deck);
  console.log("STATE => CARDS ARE", cards);


  useEffect(function fetchDeckOnMount() {
    async function fetchDeck() {
      const response = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`);
      const deckId = response.data.deck_id;

      setDeck({
        deckId: deckId,
        remaining: response.data.remaining,
        isLoading: false
      });
    }
    fetchDeck();
  }, []);

  async function fetchCard() {
    const response = await axios.get(`${BASE_URL}/${deck.deckId}/draw/?count=1`);
    const card = response.data.cards[0];
    setCards(cards => [...cards, card]);
    setDeck({
      deckId: deck.deckId,
      remaining: response.data.remaining,
      isLoading: false
    });
  }



  if (deck.isLoading) return <i>Loading...</i>;


  return (
    <div className="Deck">
      {cards.length !== 0 ?
      <div>
        <button onClick={fetchCard}>Draw a card</button>
        <div className="Card">
        {cards.map(card => <Card card={card} />)}
      </div>
      </div>
        :
        <button onClick={fetchCard}> Start drawing </button>
      }

    </div>

  );
}

export default Deck;