import React from "react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
        <h2 className="text-xl font-semibold text-white">Carregando...</h2>
        <p className="text-gray-400 mt-2">
          Por favor, aguarde enquanto processamos sua solicitação.
        </p>
      </div>
    </div>
  );
}
