"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import Link from "next/link";

export default function Resultado() {
  const [resultado, setResultado] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedResponse = localStorage.getItem("apiResponse");
    if (storedResponse) {
      setResultado(JSON.parse(storedResponse)[0]);
    } else {
      router.push("/");
    }
  }, [router]);

  if (!resultado) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Carregando...</div>
      </div>
    );
  }

  const downloadConfig = () => {
    const content = JSON.stringify(resultado, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "configuracao_pc.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareConfig = () => {
    if (navigator.share) {
      navigator.share({
        title: "Minha Configuração de PC",
        text: `Confira minha configuração de PC recomendada: ${JSON.stringify(
          resultado.melhor_configuracao
        )}`,
        url: window.location.href,
      });
    } else {
      alert("Compartilhamento não suportado neste navegador.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              Resultado da Recomendação
            </h2>
            <Link
              href="/pages/historico"
              className="text-indigo-400 hover:text-indigo-300 flex items-center"
            >
              <ArrowLeft className="mr-2" /> Voltar
            </Link>
          </div>
          <div className="border-t border-gray-700">
            <dl>
              <div className="bg-gray-750 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-400">
                  Custo Final
                </dt>
                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                  R$ {resultado.custo_final.toFixed(2)}
                </dd>
              </div>
              <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-400">
                  Pontuação Final
                </dt>
                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                  {resultado.pontuacao_final.toFixed(2)}
                </dd>
              </div>
              {Object.entries(resultado.melhor_configuracao).map(
                ([key, value], index) => (
                  <div
                    key={key}
                    className={`${
                      index % 2 === 0 ? "bg-gray-750" : "bg-gray-800"
                    } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                  >
                    <dt className="text-sm font-medium text-gray-400">
                      {key.replace("_", " ").charAt(0).toUpperCase() +
                        key.slice(1)}
                    </dt>
                    <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                      {value}
                    </dd>
                  </div>
                )
              )}
            </dl>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-white">
              Desempenho Esperado
            </h3>
            <p className="mt-1 text-sm text-gray-300 whitespace-pre-line">
              {resultado.output}
            </p>
          </div>
          <div className="px-4 py-5 sm:px-6 flex justify-end space-x-4">
            <button
              onClick={downloadConfig}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Download className="mr-2 h-5 w-5" />
              Baixar Configuração
            </button>
            <button
              onClick={shareConfig}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Share2 className="mr-2 h-5 w-5" />
              Compartilhar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
