"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";

export default function Historico() {
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const historicoSalvo = JSON.parse(
      localStorage.getItem("historicoConfiguracoes") || "[]"
    );
    setHistorico(historicoSalvo);
  }, []);

  const excluirConfiguracao = (index) => {
    const novoHistorico = historico.filter((_, i) => i !== index);
    setHistorico(novoHistorico);
    localStorage.setItem(
      "historicoConfiguracoes",
      JSON.stringify(novoHistorico)
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Histórico de Configurações
          </h1>
          <Link
            href="/"
            className="text-indigo-500 hover:text-indigo-400 flex items-center"
          >
            <ArrowLeft className="mr-2" /> Voltar
          </Link>
        </div>
        {historico.length === 0 ? (
          <p className="text-gray-400 text-center">
            Nenhuma configuração gerada ainda.
          </p>
        ) : (
          <div className="bg-gray-800 shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-700">
              {historico.map((config, index) => (
                <li key={index}>
                  <Link
                    href={{
                      pathname: "/pages/resultado",
                      query: { config: JSON.stringify(config) },
                    }}
                    className="block hover:bg-gray-700 transition duration-150 ease-in-out"
                  >
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-indigo-400 truncate">
                          {config.game}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            R$ {config.custo.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-300">
                            Orçamento: R$ {config.custo.toFixed(2)}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-300 sm:mt-0">
                          <p>{new Date(config.data).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
