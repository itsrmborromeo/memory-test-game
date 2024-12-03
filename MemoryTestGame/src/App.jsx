import React from 'react';
import GameBoard from './components/GameBoard';
import SideBar from './components/SideBar';
import GameContextProvider from './context/GameContextProvider';
import Overlay from './components/Overlay';

const App = () => {
  return (
    <GameContextProvider>
      <main className="relative overflow-hidden bg-app-banner bg-center bg-cover h-screen w-screen flex flex-col items-center justify-center">
        <div className="absolute bg-gradient-to-r from-gray-900 to-black opacity-50 w-full h-full" />
        <div className="relative -mt-28 md:mt-10 md:-ms-72 lg:ms-0 bg-gameboard-background bg-center bg-contain bg-no-repeat w-[34rem] h-[34rem] md:w-[40rem] md:h-[40rem]">
          <GameBoard />
          <SideBar />
        </div>
        <Overlay />
      </main>
    </GameContextProvider>
  );
};

export default App;
