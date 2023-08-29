import React from "react";

const CARD_IMAGE_BASE_URL = "https://deckofcardsapi.com/static/img";

function Card({ card, key }){

  console.log("CARD IS", card);

  return(
    <img src={`${CARD_IMAGE_BASE_URL}/${key}.png`}
    alt={`${card.value} of ${card.suit}`} />
  );
}

export default Card;