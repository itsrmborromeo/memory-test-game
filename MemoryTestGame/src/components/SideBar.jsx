import React, { useContext } from 'react';
import RestartBtn from "../assets/images/replay.png";
import ClockBtn from "../assets/images/oras.gif";
import { GameContext } from '../context/GameContextProvider';

const SideBar = () => {
  const { timeLeft, restartGame } = useContext(GameContext);

  return (
    <div className="absolute right-36 md:-right-52 -bottom-[7.5rem] md:bottom-32 flex flex-col items-start gap-1">
      
      <div className="flex items-center justify-center gap-1 bg-sidebar-background bg-center bg-contain bg-no-repeat w-64 h-20 md:h-32">
        <img src={ClockBtn} alt="" className="w-20 md:w-20" />
        <div className="flex flex-col items-start">
          <p className="text-red-900 md:text-xg font-bold">TIME </p>
          <p className="text-red-900 md:text-xg font-bold">
            {" "}
            <span className="md:text-s text-green-600 shadow">
              {timeLeft} sec
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 bg-sidebar-background bg-center bg-contain bg-no-repeat w-64 h-20 md:h-32">
        <button onClick={restartGame} className="flex items-center gap-3">
          <img src={RestartBtn} alt="" className="w-8 h-8 md:w-10 md:h-10" />
          <p className="text-red-900 md:text-lg font-bold">Replay</p>
        </button>
      </div>
    </div>
  );
}

export default SideBar;
