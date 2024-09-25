import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/NavBar";
import { ArrowRight, Brain, Cpu, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Recomendador de PC Inteligente
          </h1>
          <p className="text-xl text-gray-300">
            Encontre a configuração ideal para o seu computador usando
            Inteligência Artificial
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <Image
              src="/pc.png"
              alt="IA analisando componentes de computador"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">
              Como funciona?
            </h2>
            <p className="text-gray-300">
              Nossa aplicação utiliza algoritmos avançados de Inteligência
              Artificial para analisar suas necessidades e recomendar a melhor
              configuração de PC para você. Levamos em consideração seu
              orçamento, os jogos que você deseja jogar e as últimas tendências
              do mercado.
            </p>
            <Link
              href="/pages/recomendador"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Comece agora
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <Brain className="h-12 w-12 text-indigo-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Inteligência Artificial
            </h3>
            <p className="text-gray-300">
              Utilizamos modelos de IA de ponta para analisar e recomendar as
              melhores configurações de PC.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <Cpu className="h-12 w-12 text-indigo-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Componentes Atualizados
            </h3>
            <p className="text-gray-300">
              Nossa base de dados é constantemente atualizada com os últimos
              lançamentos de hardware.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <Zap className="h-12 w-12 text-indigo-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Recomendações Rápidas
            </h3>
            <p className="text-gray-300">
              Obtenha recomendações personalizadas em segundos, economizando seu
              tempo e esforço.
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Pronto para encontrar seu PC ideal?
          </h2>
          <Link
            href="/pages/recomendador"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Usar o Recomendador
            <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </main>
    </div>
  );
}
