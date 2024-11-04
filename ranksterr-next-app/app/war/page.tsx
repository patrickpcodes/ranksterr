// Full file: ranksterr-next-app/pages/war/[id].tsx
"use client";

import React, { useState, useEffect, Suspense } from "react";
// import { useRouter } from "next/router";
import RankingBattle from "@/components/RankingBattle";
import WarRankings from "@/components/WarRankings";
import { War } from "@/types/War";
import WarHistory from "@/components/WarHistory";

const WarPage = () => {
  const [war, setWar] = useState<War | null>(null);
  const [activeTab, setActiveTab] = useState("ranking");
  // const router = useRouter();
  // console.log(router.query);
  // const { id } = router.query;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const id = "47ae3e0d-1e08-4126-b328-8fd522f88b22";
  useEffect(() => {
    const fetchWar = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/war/${id}`);
        const data = await response.json();
        console.log(data);
        setWar(data);
        // const initialMovies = data.movies.map((movie: Movie) => ({
        //   id: movie.id,
        //   title: movie.title,
        //   poster_path: movie.poster_path,
        //   release_date: movie.release_date,
        //   wins: 0,
        // }));
        // setMovies(initialMovies);
        // setNextBattle(data.nextBattle);
      } catch (error) {
        console.error("Error fetching war:", error);
      }
    };

    if (id) {
      fetchWar();
    }
  }, [id, apiUrl]);

  // const setNextPair = () => {
  //   if (nextBattle) {
  //     setCurrentPair([nextBattle.movie1, nextBattle.movie2]);
  //   }
  // };

  const handleWinner = async (winnerId: number) => {
    try {
      const response = await fetch(`${apiUrl}/api/war/save-battle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          battleId: war?.nextBattle.id,
          winnerId,
        }),
      });

      if (response.ok) {
        const updatedWar = await response.json();
        console.log(updatedWar);
        setWar(updatedWar);
      } else {
        console.error("Error saving battle");
      }
    } catch (error) {
      console.error("Error saving battle:", error);
    }
  };
  const battlesLeft = war
    ? war.battles.filter((battle) => battle.winnerId === 0).length
    : "Unknown";

  return (
    <div className="flex h-screen">
      <div className="w-[70%] p-4 border-r">
        <h2 className="text-2xl font-bold mb-4">War: {war?.id}</h2>
        <h4 className="text-2xl font-bold mb-4">
          Battle: {war?.nextBattle ? war.nextBattle.id : "Unknown"}
        </h4>
        <h4 className="text-2xl font-bold mb-4">
          Battles Left: {battlesLeft} out of{" "}
          {war?.nextBattle ? war.battles.length : "Unknown"}
        </h4>
        {war?.nextBattle ? (
          <RankingBattle
            movie1={war.nextBattle.movie1}
            movie2={war.nextBattle.movie2}
            onChoose={handleWinner}
          />
        ) : (
          <p>Ranking complete!</p>
        )}
      </div>
      <div className="w-[30%] p-4">
        <div className="tabs flex border-b-2 border-gray-300">
          <button
            className={`tab flex-1 py-2 text-center ${
              activeTab === "ranking"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("ranking")}
          >
            Ranking
          </button>
          <button
            className={`tab flex-1 py-2 text-center ${
              activeTab === "battles"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("battles")}
          >
            Battles
          </button>
        </div>
        <div className="tab-content mt-4">
          {activeTab === "ranking" && <WarRankings war={war} />}
          {activeTab === "battles" && <WarHistory war={war} />}
        </div>
      </div>
    </div>
  );
};

const WarPageWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <WarPage />
  </Suspense>
);

export default WarPageWrapper;
