import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function useGameStats(mode) {
    const scoreKey = `score_${mode}`;
    const viesKey = `vies_${mode}`;
    const bestScoreKey = `bestScore_${mode}`;
  
    const [score, setScore] = useState(() => {
      const savedScore = Cookies.get(scoreKey);
      return savedScore ? parseInt(savedScore, 10) : 0;
    });
  
    const [vies, setVies] = useState(() => {
      const savedVies = Cookies.get(viesKey);
      return savedVies ? parseInt(savedVies, 10) : 3;
    });
  
    const [bestScore, setBestScore] = useState(() => {
        return parseInt(Cookies.get(bestScoreKey) || 0, 10);
      });
      
      useEffect(() => {
        const savedBestScore = parseInt(Cookies.get(bestScoreKey) || 0, 10);
        if (score > savedBestScore) {
          setBestScore(score);
          Cookies.set(bestScoreKey, score, { expires: 7 });
        }
      }, [score]);
      
  
    useEffect(() => {
      Cookies.set(scoreKey, score, { expires: 7 });
    }, [score]);
  
    useEffect(() => {
      Cookies.set(viesKey, vies, { expires: 7 });
    }, [vies]);
  
    const rejouer = () => {
      setScore(0);
      setVies(3);
    };
  
    const retourMenu = () => {
      Cookies.remove(scoreKey);
      Cookies.remove(viesKey);
      window.location.href = "/";
    };
  
    return { score, setScore, vies, setVies, bestScore, setBestScore, rejouer, retourMenu };
  }
  