import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MapNode from "./components/MapNode";
import QuestionModal from "./components/QuestionModal";

const MATERIAS = ["introducao", "gastos", "planejamento", "poupanca"];
const DIFICULDADES = ["Easy", "Medium", "Hard"];

// Cada fase tem 3 questões
const QUESTOES_POR_FASE = 3;
const TOTAL_FASES = MATERIAS.length * 3; // 4 matérias x 3 fases cada = 12 fases

function MapExercises() {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState(0);
  const [completedPhases, setCompletedPhases] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userProgress, setUserProgress] = useState({
    totalXP: 0,
    completedQuestions: 0,
  });

  // Funções para gerenciar questões respondidas
  const getAnsweredQuestions = () => {
    try {
      const answered = localStorage.getItem("answeredQuestions");
      return answered ? JSON.parse(answered) : [];
    } catch (error) {
      console.error("Erro ao ler questões respondidas:", error);
      return [];
    }
  };

  const addAnsweredQuestion = (questionId) => {
    try {
      const answered = getAnsweredQuestions();
      if (!answered.includes(questionId)) {
        answered.push(questionId);
        localStorage.setItem("answeredQuestions", JSON.stringify(answered));
      }
    } catch (error) {
      console.error("Erro ao salvar questão respondida:", error);
    }
  };

  const clearAnsweredQuestions = () => {
    localStorage.removeItem("answeredQuestions");
  };

  // Calcula a matéria e dificuldade baseado na fase atual
  const getPhaseInfo = (phaseIndex) => {
    const materiaIndex = Math.floor(phaseIndex / 3);
    const faseNaMateria = phaseIndex % 3;
    const materia = MATERIAS[materiaIndex];
    const dificuldade = DIFICULDADES[faseNaMateria];
    
    return { materia, dificuldade, materiaIndex, faseNaMateria };
  };

  // Busca questões aleatórias da API
  const fetchQuestions = async (materia, dificuldade, count = QUESTOES_POR_FASE) => {
    // Usa o token do ambiente para acessar questões
    const secretToken = import.meta.env.VITE_SECRET_TOKEN;
    
    if (!secretToken) {
      console.error("VITE_SECRET_TOKEN não configurado no arquivo .env");
      alert("Erro de configuração: Token não encontrado. Verifique o arquivo .env");
      return [];
    }

    try {
      const response = await fetch(
        `https://techcovenant.onrender.com/api/questions?subject=${materia}&difficulty=${dificuldade}`,
        {
          headers: {
            Authorization: `Bearer ${secretToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar questões");
      }

      let questions = await response.json();
      
      // Garante que questions é um array
      if (!Array.isArray(questions)) {
        questions = questions.questions || questions.data || [];
      }
      
      if (questions.length === 0) {
        return [];
      }

      // Filtra questões já respondidas
      const answeredQuestions = getAnsweredQuestions();
      console.log(`Buscando questões para ${materia} - ${dificuldade}`);
      console.log(`Total de questões da API: ${questions.length}`);
      console.log(`Questões já respondidas: ${answeredQuestions.length}`);
      
      const availableQuestions = questions.filter(
        (q) => {
          const isAnswered = answeredQuestions.includes(q.id);
          if (isAnswered) {
            console.log(`Questão ${q.id} já foi respondida, filtrando...`);
          }
          return !isAnswered;
        }
      );

      console.log(`Questões disponíveis após filtro: ${availableQuestions.length}`);

      if (availableQuestions.length === 0) {
        console.warn("Todas as questões desta categoria já foram respondidas!");
        return [];
      }

      // Se não houver questões suficientes, avisa mas continua
      if (availableQuestions.length < count) {
        console.warn(
          `Apenas ${availableQuestions.length} questões disponíveis de ${count} solicitadas`
        );
      }
      
      // Embaralha e pega as primeiras 'count' questões disponíveis
      const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, Math.min(count, availableQuestions.length));
    } catch (error) {
      console.error("Erro ao buscar questões:", error);
      return [];
    }
  };

  // Inicia uma fase
  const startPhase = async (phaseIndex) => {
    if (completedPhases.includes(phaseIndex)) {
      return; // Fase já completada
    }

    if (phaseIndex > currentPhase) {
      alert("Complete as fases anteriores primeiro!");
      return;
    }

    setLoading(true);
    const { materia, dificuldade } = getPhaseInfo(phaseIndex);
    const questions = await fetchQuestions(materia, dificuldade, QUESTOES_POR_FASE);

    if (questions.length === 0) {
      const answeredQuestions = getAnsweredQuestions();
      const totalAnswered = answeredQuestions.length;
      
      if (totalAnswered > 0) {
        alert(
          `Todas as questões desta fase já foram respondidas!\n\n` +
          `Total de questões respondidas: ${totalAnswered}\n` +
          `Para resetar e ver todas as questões novamente, limpe o histórico no menu.`
        );
      } else {
        alert("Não há questões disponíveis para esta fase no momento.");
      }
      setLoading(false);
      return;
    }

    setCurrentQuestion({
      phaseIndex,
      questions,
      currentQuestionIndex: 0,
      materia,
      dificuldade,
    });
    setShowQuestionModal(true);
    setLoading(false);
  };

  // Quando uma questão é respondida
  const handleQuestionAnswered = async (questionId, isCorrect, xpEarned) => {
    // Marca a questão como respondida IMEDIATAMENTE para evitar repetição
    addAnsweredQuestion(questionId);
    console.log("Questão marcada como respondida:", questionId);
    console.log("Questões respondidas:", getAnsweredQuestions());

    // Usa o token do ambiente para enviar respostas
    const secretToken = import.meta.env.VITE_SECRET_TOKEN;
    
    if (secretToken && questionId) {
      try {
        const requestBody = {
          is_correct: isCorrect,
        };
        
        console.log("Enviando resposta para API:", {
          questionId,
          isCorrect,
          body: requestBody,
        });

        const response = await fetch(
          `https://techcovenant.onrender.com/api/questions/${questionId}/answer`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${secretToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch {
            errorData = await response.text();
          }
          console.error("Erro ao enviar resposta:", {
            status: response.status,
            statusText: response.statusText,
            error: errorData,
          });
          // Não bloqueia o fluxo mesmo se a API falhar - a questão já foi marcada como respondida
        } else {
          console.log("Resposta enviada com sucesso para a API");
        }
      } catch (error) {
        console.error("Erro ao enviar resposta:", error);
        // Não bloqueia o fluxo mesmo se a API falhar - a questão já foi marcada como respondida
      }
    } else {
      console.warn("Token ou questionId não disponível para enviar resposta");
    }

    if (isCorrect) {
      setUserProgress((prev) => ({
        totalXP: prev.totalXP + xpEarned,
        completedQuestions: prev.completedQuestions + 1,
      }));
    }

    // Verifica se completou todas as questões da fase
    const nextQuestionIndex = currentQuestion.currentQuestionIndex + 1;
    if (nextQuestionIndex >= currentQuestion.questions.length) {
      // Fase completada!
      setCompletedPhases((prev) => [...prev, currentQuestion.phaseIndex]);
      setCurrentPhase((prev) => Math.max(prev, currentQuestion.phaseIndex + 1));
      setShowQuestionModal(false);
      setCurrentQuestion(null);
    } else {
      // Próxima questão
      setCurrentQuestion((prev) => ({
        ...prev,
        currentQuestionIndex: nextQuestionIndex,
      }));
    }
  };

  // Carrega progresso salvo e verifica login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Carrega progresso salvo
    try {
      const savedProgress = localStorage.getItem("userProgress");
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        setUserProgress(progress);
      }

      const savedCompletedPhases = localStorage.getItem("completedPhases");
      if (savedCompletedPhases) {
        const phases = JSON.parse(savedCompletedPhases);
        setCompletedPhases(phases);
        setCurrentPhase(Math.max(...phases, -1) + 1);
      }
    } catch (error) {
      console.error("Erro ao carregar progresso:", error);
    }
  }, [navigate]);

  // Salva progresso no localStorage
  useEffect(() => {
    localStorage.setItem("userProgress", JSON.stringify(userProgress));
  }, [userProgress]);

  useEffect(() => {
    localStorage.setItem("completedPhases", JSON.stringify(completedPhases));
  }, [completedPhases]);

  // Função para limpar questões respondidas (útil para testes)
  const handleClearAnsweredQuestions = () => {
    if (
      window.confirm(
        "Tem certeza que deseja limpar todas as questões respondidas?\n\nIsso permitirá que você veja todas as questões novamente, mas seu progresso de fases será mantido."
      )
    ) {
      clearAnsweredQuestions();
      alert("Questões respondidas foram limpas! Recarregue a página para ver todas as questões novamente.");
    }
  };

  // Gera posições dos nós no mapa (estilo Duolingo - caminho sinuoso)
  const generateNodePositions = () => {
    const positions = [];
    const totalNodes = TOTAL_FASES;
    
    // Caminho sinuoso estilo Duolingo
    const pathPattern = [
      { x: 100, y: 150 },   // 1
      { x: 200, y: 150 },   // 2
      { x: 300, y: 150 },   // 3
      { x: 400, y: 150 },   // 4
      { x: 400, y: 250 },   // 5
      { x: 300, y: 250 },   // 6
      { x: 200, y: 250 },   // 7
      { x: 100, y: 250 },   // 8
      { x: 100, y: 350 },   // 9
      { x: 200, y: 350 },   // 10
      { x: 300, y: 350 },   // 11
      { x: 400, y: 350 },   // 12
    ];
    
    for (let i = 0; i < totalNodes; i++) {
      if (i < pathPattern.length) {
        positions.push(pathPattern[i]);
      } else {
        // Se houver mais nós, continua o padrão
        const lastPos = positions[positions.length - 1];
        positions.push({ x: lastPos.x + 100, y: lastPos.y });
      }
    }
    
    return positions;
  };

  const nodePositions = generateNodePositions();

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 h-16 sticky top-0 z-20 shadow-sm">
        <div className="max-w-screen-xl mx-auto h-full px-6 flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="text-gray-700 hover:text-gray-900 transition font-medium"
          >
            ← Voltar
          </button>
          
          <div className="flex items-center gap-6">
            <div className="text-gray-700 font-medium">
              XP: {userProgress.totalXP}
            </div>
            <div className="text-sm text-gray-600">
              Fases: {completedPhases.length}/{TOTAL_FASES}
            </div>
            <div className="text-xs text-gray-500">
              {getAnsweredQuestions().length} respondidas
            </div>
            <button
              onClick={handleClearAnsweredQuestions}
              className="text-xs text-gray-600 hover:text-gray-900 px-3 py-1.5 border border-gray-300 rounded transition"
              title="Limpar histórico de questões respondidas"
            >
              Resetar
            </button>
          </div>
        </div>
      </header>

      {/* Mapa */}
      <div className="relative w-full h-screen overflow-auto bg-gray-50">
        <svg className="w-full h-full min-h-screen" viewBox="0 0 500 450">
          {/* Caminho conectando os nós */}
          {nodePositions.map((pos, index) => {
            if (index === 0) return null;
            const prevPos = nodePositions[index - 1];
            const midX = (prevPos.x + pos.x) / 2;
            const midY = (prevPos.y + pos.y) / 2;
            
            return (
              <path
                key={`path-${index}`}
                d={`M ${prevPos.x} ${prevPos.y} Q ${midX} ${midY} ${pos.x} ${pos.y}`}
                stroke="#d1d5db"
                strokeWidth="4"
                strokeDasharray="6,4"
                fill="none"
                strokeLinecap="round"
              />
            );
          })}

          {/* Ponto inicial */}
          <g transform="translate(100, 50)">
            <circle cx="0" cy="0" r="12" fill="#6b7280" />
            <circle cx="0" cy="0" r="8" fill="#9ca3af" />
          </g>

          {/* Linha do ponto inicial ao primeiro nó */}
          <line
            x1="100"
            y1="62"
            x2={nodePositions[0]?.x || 100}
            y2={nodePositions[0]?.y - 20 || 150}
            stroke="#d1d5db"
            strokeWidth="4"
            strokeDasharray="6,4"
          />

          {/* Ponto final */}
          <g transform={`translate(${nodePositions[nodePositions.length - 1]?.x || 400}, ${(nodePositions[nodePositions.length - 1]?.y || 600) - 40})`}>
            <circle cx="0" cy="0" r="14" fill="#374151" />
            <circle cx="0" cy="0" r="10" fill="#4b5563" />
          </g>

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
                onClick={() => isAvailable && !loading && startPhase(index)}
              />
            );
          })}
        </svg>
      </div>

      {/* Modal de Questão */}
      {showQuestionModal && currentQuestion && (
        <QuestionModal
          question={currentQuestion.questions[currentQuestion.currentQuestionIndex]}
          questionNumber={currentQuestion.currentQuestionIndex + 1}
          totalQuestions={currentQuestion.questions.length}
          onAnswer={handleQuestionAnswered}
          onClose={() => {
            setShowQuestionModal(false);
            setCurrentQuestion(null);
          }}
        />
      )}

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white p-6 rounded-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
            <p className="mt-4 text-center">Carregando questões...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapExercises;

