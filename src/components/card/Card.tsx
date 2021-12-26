import React from "react";
import { Card as ICard } from "../../features/game/game.slice";

interface Props {
  card: ICard;
}

const Card = ({ card }: Props) => {
  return <div>{card.word}</div>;
};

export default Card;
