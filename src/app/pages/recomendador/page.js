"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import LoadingScreen from "../../components/LoadingScreen";
import {
  DollarSign,
  Cpu,
  Gamepad2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import CustomImage from "../../components/CustomImage";

const games = [
  { id: "1222670", name: "The Sims™ 4", image: "/sims4.jpg" },
  { id: "730", name: "Counter-Strike: Global Offensive 2", image: "/csgo.jpg" },
  { id: "570", name: "Dota 2", image: "/dota2.jpg" },
  { id: "2669320", name: "FC 25", image: "/fifa25.jpg" },
  { id: "2399830", name: "ARK: Survival Ascended", image: "/ark.jpg" },
  { id: "2344520", name: "DIABLO IV", image: "/diablo4.jpg" },
  { id: "1091500", name: "Cyberpunk 2077", image: "/2077.jpg" },
];

export default function Recomendador() {
  const [game, setGame] = useState("");
  const [budget, setBudget] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseFloat(budget) <= 0) {
      alert("Por favor, insira um orçamento válido.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://luizfornari080303.app.n8n.cloud/webhook/HardwarIA_API",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            game: games.find((g) => g.id === game)?.id || "Jogo desconhecido",
            limite_valor: parseFloat(budget),
          }),
        }
      );


      const data = await response.json();

      const historico = JSON.parse(
        localStorage.getItem("historicoConfiguracoes") || "[]"
      );
      historico.push({
        game: games.find((g) => g.id === game)?.name || "Jogo desconhecido",
        budget,
        configuracao: data.melhor_configuracao,
        custo: data.custo_final,
        data: new Date().toISOString(),
      });
      localStorage.setItem("historicoConfiguracoes", JSON.stringify(historico));
      localStorage.setItem("apiResponse", JSON.stringify([data]));

      router.push("/pages/resultado");
    } catch (error) {
      console.error("Erro ao chamar a API:", error);
      alert(
        "Ocorreu um erro ao obter a recomendação. Tente novamente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {isLoading && <LoadingScreen />}
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Cpu className="mx-auto h-14 w-14 text-indigo-500 animate-pulse" />
          <h2 className="mt-6 text-3xl font-bold text-white">
            Recomendador de PC
          </h2>
          <p className="mt-2 text-gray-400">
            Preencha os detalhes abaixo para obter sua recomendação
            personalizada
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset>
            <legend className="sr-only">Selecione o jogo</legend>
            <div className="relative">
              <div className="embla overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex">
                  {games.map((gameOption) => (
                    <label
                      key={gameOption.id}
                      className={`embla__slide flex-[0_0_100%] min-w-0 relative mr-4 cursor-pointer transition ${
                        game === gameOption.id
                          ? "ring-2 ring-indigo-500 transform scale-105"
                          : "border border-gray-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="game"
                        value={gameOption.id}
                        checked={game === gameOption.id}
                        onChange={() => setGame(gameOption.id)}
                        className="sr-only"
                        aria-labelledby={`game-${gameOption.id}-label`}
                      />
                      <div className=" rounded-lg overflow-hidden">
                        <CustomImage
                          src={gameOption.image}
                          width="600"
                          height="600"
                          className="object-cover h-auto"
                        />
                      </div>
                      <span
                        id={`game-${gameOption.id}-label`}
                        className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs font-medium p-2 text-center"
                      >
                        {gameOption.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </fieldset>

          <div>
            <label htmlFor="budget" className="sr-only">
              Orçamento
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="budget"
                name="budget"
                type="number"
                min="0"
                required
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="block w-full px-3 py-2 pl-10 border border-gray-700 rounded-md placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Seu orçamento"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              disabled={!game || parseFloat(budget) <= 0}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Gamepad2
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Recomendar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
