import axios from "axios";
import React, { useState, useEffect } from "react";

const BASE_URL = 'https://deckofcardsapi.com/api/deck';


function Deck() {

  const [deck, setDeck] = useState({
    deckId: null,
    remaining: null,
    isLoading: true
  });

  const [cards, setCards] = useState([]);

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
    setCards(card);
    setDeck({
      deckId: deck.deckId,
      remaining: response.data.remaining,
      isLoading: false
    });
  }



  if (deck.isLoading) return <i>Loading...</i>;


  return (
    <div className="Deck">
      <button onClicke={fetchCard}>Draw a card</button>
      <div>
        {cards.map(card => <Card cards={card} key={card.code} />)}
      </div>
    </div>

  );
}

export default Deck;