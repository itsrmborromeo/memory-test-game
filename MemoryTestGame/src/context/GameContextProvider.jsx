// Import necessary modules and assets
import React, { createContext, useState, useEffect, useRef } from 'react';
import knight from '../assets/images/tarot/mounted-knight.png';
import puppet from '../assets/images/tarot/puppet.png';
import fool from '../assets/images/tarot/tarot-00-the-fool.png';
import magician from '../assets/images/tarot/tarot-01-the-magician.png';
import priest from '../assets/images/tarot/tarot-02-the-high-priestess.png';
import empress from '../assets/images/tarot/tarot-03-the-empress.png';
import king from '../assets/images/tarot/throne-king.png';
import vampire from '../assets/images/tarot/vampire-cape.png';

// Import sound effects
import backgroundMusic from '../assets/images/sounds/background.mp3';
import winSound from '../assets/images/sounds/win.mp3'; // Win Game
import lossSound from '../assets/images/sounds/sad-meow-song.mp3'; // Game Over
import wrongMatchSound from '../assets/images/sounds/wrong.mp3'; // Wrong match sound
import correctMatchSound from '../assets/images/sounds/correct.mp3'; // Correct match sound
import countdownMusic1 from '../assets/images/sounds/10seconds.mp3'; // Countdown sound 1
import countdownMusic2 from '../assets/images/sounds/tiktak.mp3'; // Countdown sound 2

export const GameContext = createContext();

const GameContextProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [showIcons, setShowIcons] = useState(true);
  const [timeLeft, setTimeLeft] = useState(45);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false); // New state for tracking game start

  const timerRef = useRef(null);
  const backgroundMusicRef = useRef(new Audio(backgroundMusic));
  const winSoundRef = useRef(new Audio(winSound));
  const lossSoundRef = useRef(new Audio(lossSound));
  const wrongMatchSoundRef = useRef(new Audio(wrongMatchSound));
  const correctMatchSoundRef = useRef(new Audio(correctMatchSound));
  const countdownMusic1Ref = useRef(new Audio(countdownMusic1));
  const countdownMusic2Ref = useRef(new Audio(countdownMusic2));

  useEffect(() => {
    // Start background music
    backgroundMusicRef.current.loop = true;
    backgroundMusicRef.current.volume = 0.3;

    return () => {
      backgroundMusicRef.current.pause(); // Stop music when unmounting
    };
  }, []);

  const initializeCards = () => {
    const cardIcons = [knight, puppet, fool, magician, priest, empress, king, vampire];
    const pairIcons = [...cardIcons, ...cardIcons];
    const shuffledIcons = pairIcons.sort(() => Math.random() - 0.5);

    const cardItems = shuffledIcons.map((icon, index) => ({
      id: index,
      fruit: icon,
      flipped: false,
    }));

    setCards(cardItems);
    setShowIcons(true); // Show all icons initially
    setTimeout(() => setShowIcons(false), 3000); // Hide icons after 3 seconds

    resetGame();
  };

  const resetGame = () => {
    setTimeLeft(45);
    setGameOver(false);
    setGameWon(false);
    setMatchedPairs([]);
    setFlippedCards([]);
    setScore(0);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 11) { // Play countdown music at 10 seconds
          countdownMusic1Ref.current.currentTime = 0;
          countdownMusic1Ref.current.play();
          countdownMusic2Ref.current.pause();
        } else if (prev === 10) {
          countdownMusic2Ref.current.currentTime = 0;
          countdownMusic2Ref.current.play();
        }

        if (prev <= 1) {
          clearInterval(timerRef.current);
          setGameOver(true);
          lossSoundRef.current.currentTime = 0;
          lossSoundRef.current.play();
          backgroundMusicRef.current.pause(); // Stop music on loss
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const flipCard = (index) => {
    if (flippedCards.length === 2 || cards[index].flipped || gameOver) return;

    const updatedCards = [...cards];
    updatedCards[index].flipped = true;
    setCards(updatedCards);

    setFlippedCards((prevFlippedCards) => {
      const newFlippedCards = [...prevFlippedCards, index];

      if (newFlippedCards.length === 2) {
        const [firstIndex, secondIndex] = newFlippedCards;

        if (updatedCards[firstIndex].fruit === updatedCards[secondIndex].fruit) {
          const newMatchedPairs = [...matchedPairs, updatedCards[firstIndex].fruit];
          setMatchedPairs(newMatchedPairs);

          // Play correct match sound
          correctMatchSoundRef.current.currentTime = 0;
          correctMatchSoundRef.current.play();

          if (newMatchedPairs.length === cards.length / 2) {
            clearInterval(timerRef.current);
            setGameWon(true);
            winSoundRef.current.play();
            backgroundMusicRef.current.pause(); // Stop music on win
            setScore(timeLeft * 10); // Calculate score based on time left
          }
        } else {
          // Play wrong match sound
          wrongMatchSoundRef.current.currentTime = 0;
          wrongMatchSoundRef.current.play();

          setTimeout(() => {
            const resetCards = [...updatedCards];
            resetCards[firstIndex].flipped = false;
            resetCards[secondIndex].flipped = false;
            setCards(resetCards);
          }, 1000);
        }
        return [];
      }
      return newFlippedCards;
    });
  };

  const restartGame = () => {
    // Reset sounds
    winSoundRef.current.pause();
    lossSoundRef.current.pause();
    wrongMatchSoundRef.current.pause();
    correctMatchSoundRef.current.pause();
    countdownMusic1Ref.current.pause();
    countdownMusic2Ref.current.pause();
    backgroundMusicRef.current.currentTime = 0;
    backgroundMusicRef.current.play(); // Play background music

    // Reinitialize the game state
    initializeCards();
  };

  const startGame = () => {
    setGameStarted(true); // Set game started to true
    backgroundMusicRef.current.currentTime = 0; // Reset music to start
    backgroundMusicRef.current.play(); // Start playing music
    initializeCards(); // Initialize cards when game starts
  };

  return (
    <GameContext.Provider
      value={{
        cards,
        flipCard,
        matchedPairs,
        showIcons,
        timeLeft,
        gameOver,
        gameWon,
        restartGame,
        score,
      }}
    >
      {!gameStarted && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10, // Ensures it overlays on top of other content
          }}
        >
          <button
            onClick={startGame}
            style={{
              padding: '10px 20px',
              backgroundColor: 'white',
              color: 'black',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '18px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#166FE5'; // Darker blue on hover
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'white'; 
            }}
          >
            START GAME
          </button>
        </div>
      )}
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
