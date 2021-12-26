import React from "react";
import { Card } from "../../features/game/game.slice";

interface Props {
  card: Card;
}

const Card = ({ card }: Props) => {
  return <div>{card.word}</div>;
};

export default Card;
