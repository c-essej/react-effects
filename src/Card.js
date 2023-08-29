import React from "react";

const CARD_IMAGE_BASE_URL = "https://deckofcardsapi.com/static/img";

function Card({ card }){

  console.log("CARD IS", card);
  console.log("image link", `${CARD_IMAGE_BASE_URL}/${card.code}.png`);

  return(
    <img src={`${CARD_IMAGE_BASE_URL}/${card.code}.png`}
    alt={`${card.value} of ${card.suit}`} />
  );
}

export default Card;