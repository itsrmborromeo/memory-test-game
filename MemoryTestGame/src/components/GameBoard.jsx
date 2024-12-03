import React, { useContext } from 'react';
import FruitCard from './Card';
import { GameContext } from '../context/GameContextProvider';

const GameBoard = () => {
  const { cards, flipCard, showIcons } = useContext(GameContext);

  return (
    <div className="absolute top-[20%] md:top-[25%] left-[26%] w-[16.5rem] h-[16.5rem] md:w-[19rem] md:h-[19rem] mx-auto grid grid-cols-4 gap-[2px]">
      {cards.map((card, index) => (
        <FruitCard
          key={card.id} // Use card.id for a unique key
          fruitId={index}
          flipped={card.flipped} // Pass the flipped state
          onClick={() => flipCard(index)} // Handle card flip
          showIcons={showIcons} // Pass showIcons to control visibility
          fruitImage={card.fruit} // Pass fruit image
        />
      ))}
    </div>
  );
};

export default GameBoard;
