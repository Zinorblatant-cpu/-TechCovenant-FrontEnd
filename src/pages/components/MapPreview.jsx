import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MapNode from "./MapNode";

const MATERIAS = ["introducao", "gastos", "planejamento", "poupanca"];
const DIFICULDADES = ["Easy", "Medium", "Hard"];
const TOTAL_FASES = MATERIAS.length * 3;

function MapPreview() {
  const navigate = useNavigate();
  const [completedPhases, setCompletedPhases] = useState([]);
  const [currentPhase, setCurrentPhase] = useState(0);

  // Carrega progresso salvo
  useEffect(() => {
    try {
      const savedCompletedPhases = localStorage.getItem("completedPhases");
      if (savedCompletedPhases) {
        const phases = JSON.parse(savedCompletedPhases);
        setCompletedPhases(phases);
        setCurrentPhase(Math.max(...phases, -1) + 1);
      }
    } catch (error) {
      console.error("Erro ao carregar progresso:", error);
    }
  }, []);

  // Calcula a matéria e dificuldade baseado na fase atual
  const getPhaseInfo = (phaseIndex) => {
    const materiaIndex = Math.floor(phaseIndex / 3);
    const faseNaMateria = phaseIndex % 3;
    const materia = MATERIAS[materiaIndex];
    const dificuldade = DIFICULDADES[faseNaMateria];
    
    return { materia, dificuldade, materiaIndex, faseNaMateria };
  };

  // Gera posições dos nós no mapa (versão compacta)
  const generateNodePositions = () => {
    const positions = [];
    const totalNodes = TOTAL_FASES;
    
    // Layout compacto para preview
    for (let i = 0; i < totalNodes; i++) {
      const row = Math.floor(i / 6);
      const col = i % 6;
      const x = col * 50 + 30;
      const y = row * 50 + 30;
      
      positions.push({ x, y });
    }
    
    return positions;
  };

  const nodePositions = generateNodePositions();

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Título */}
      <h2 className="text-center text-2xl font-bold mb-4 text-gray-900">
        Mapa de Exercícios
      </h2>

      {/* Mapa Preview */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <svg className="w-full h-64" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet">
          {/* Caminho conectando os nós */}
          {nodePositions.map((pos, index) => {
            if (index === 0) return null;
            const prevPos = nodePositions[index - 1];
            return (
              <line
                key={`path-${index}`}
                x1={prevPos.x}
                y1={prevPos.y}
                x2={pos.x}
                y2={pos.y}
                stroke="#d1d5db"
                strokeWidth="2"
                strokeDasharray="3,2"
              />
            );
          })}

          {/* Nós do mapa */}
          {nodePositions.map((pos, index) => {
            const { materia, dificuldade } = getPhaseInfo(index);
            const isCompleted = completedPhases.includes(index);
            const isAvailable = index <= currentPhase;
            const isCurrent = index === currentPhase && !isCompleted;

            return (
              <MapNode
                key={index}
                x={pos.x}
                y={pos.y}
                phaseNumber={index + 1}
                materia={materia}
                dificuldade={dificuldade}
                isCompleted={isCompleted}
                isAvailable={isAvailable}
                isCurrent={isCurrent}
                onClick={() => navigate("/map")}
              />
            );
          })}
        </svg>

        {/* Informações */}
        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
          <span>Fases: {completedPhases.length}/{TOTAL_FASES}</span>
          <button
            onClick={() => navigate("/map")}
            className="text-gray-900 font-medium hover:underline"
          >
            Ver mapa completo →
          </button>
        </div>
      </div>
    </div>
  );
}

export default MapPreview;

