import { useState } from "react";

export default function QuestoesCarousel() {
  const questoes = ["1", "2", "3"];
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < questoes.length - 1) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">

      {/* Título */}
      <h2 className="text-center text-2xl font-bold mb-6">
        Mapa de Exercícios
      </h2>

      {/* Área do carrossel */}
      <div className="overflow-hidden w-full h-32 flex items-center justify-center">
        <div
          className="flex transition-transform duration-500 items-center"
          style={{ transform: `translateX(-${index * 120}px)` }}
        >
          {questoes.map((q, i) => (
            <div key={i} className="flex items-center">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold
                ${i === index ? "bg-yellow-500" : "bg-yellow-300"}
              `}
              >
                {q}
              </div>

              {i < questoes.length - 1 && (
                <div className="w-20 h-1 bg-gray-400 mx-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prev}
          disabled={index === 0}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>

        <button
          onClick={next}
          disabled={index === questoes.length - 1}
          className="bg-yellow-500 px-4 py-2 rounded disabled:opacity-50"
        >
          Próximo
        </button>
      </div>
    </div>

    
  );
}
