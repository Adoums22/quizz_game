import { VscDebugRestart } from "react-icons/vsc";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import useGameStats from "./useGameStats";

const GameOverScreen = ({ mode, onReplay, onReturnMenu }) => {
  const { score, bestScore } = useGameStats(mode);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-4">
      <div className="border-4 border-white p-8 rounded-2xl shadow-xl flex flex-col items-center w-full max-w-[500px]">
        <h2 className="text-4xl font-bold text-red-500 text-center">Game Over</h2>
        <p className="mt-6 text-lg w-full text-center">
          Ton score : <span className="font-bold">{score}</span>
        </p>
        <p className="text-lg font-bold w-full text-center">Record : {bestScore}</p>
        <div className="mt-8 flex flex-col gap-4 w-full">
          <button
            onClick={onReplay}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 border-4 border-white text-white font-bold rounded-lg shadow-md 
                      hover:bg-green-600 transition duration-300"
          >
            <VscDebugRestart className="text-xl" />
            Rejouer
          </button>

          <Link
            onClick={onReturnMenu}
            to="/"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 text-center border-4 border-white text-white font-bold rounded-lg shadow-md 
                      hover:bg-blue-600 transition duration-300"
          >
            <FaHome className="text-xl" />
            Retourner au menu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
