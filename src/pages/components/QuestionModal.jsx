import { useState } from "react";

function QuestionModal({ question, questionNumber, totalQuestions, onAnswer, onClose }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Parse das opções
  const options = question.options
    ? typeof question.options === "string"
      ? JSON.parse(question.options)
      : question.options
    : {};

  const handleSelectAnswer = (answerKey) => {
    if (showResult) return; // Não permite mudar após responder
    setSelectedAnswer(answerKey);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) {
      alert("Por favor, selecione uma resposta!");
      return;
    }

    const correct = selectedAnswer === question.correct_answer;
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleNext = () => {
    onAnswer(question.id, isCorrect, question.xp_value || 10);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-30 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-200 p-5">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Questão {questionNumber} de {totalQuestions}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {question.subject.charAt(0).toUpperCase() + question.subject.slice(1)} • {question.difficulty}
              </p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-700">
                +{question.xp_value || 10} XP
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          {/* Contexto (se houver) */}
          {question.context && (
            <div className="bg-gray-50 border-l-2 border-gray-300 p-3 mb-5 rounded">
              <p className="text-sm text-gray-700">{question.context}</p>
            </div>
          )}

          {/* Pergunta */}
          <h3 className="text-lg font-medium text-gray-900 mb-6 leading-relaxed">
            {question.question}
          </h3>

          {/* Opções */}
          <div className="space-y-3 mb-6">
            {Object.entries(options).map(([key, value]) => {
              const isSelected = selectedAnswer === key;
              const isCorrectOption = key === question.correct_answer;
              const showCorrect = showResult && isCorrectOption;
              const showIncorrect = showResult && isSelected && !isCorrectOption;

              return (
                <button
                  key={key}
                  onClick={() => handleSelectAnswer(key)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    showCorrect
                      ? "bg-green-50 border-green-300"
                      : showIncorrect
                      ? "bg-red-50 border-red-300"
                      : isSelected
                      ? "bg-gray-100 border-gray-400"
                      : "bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  } ${showResult ? "cursor-default" : "cursor-pointer"}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                        showCorrect
                          ? "bg-green-600 text-white"
                          : showIncorrect
                          ? "bg-red-600 text-white"
                          : isSelected
                          ? "bg-gray-700 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {key.toUpperCase()}
                    </div>
                    <span className="flex-1 text-gray-900">{value}</span>
                    {showCorrect && (
                      <span className="text-green-600 font-bold">✓</span>
                    )}
                    {showIncorrect && (
                      <span className="text-red-600 font-bold">✗</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explicação (quando mostrar resultado) */}
          {showResult && question.explanation && (
            <div
              className={`p-4 rounded-lg mb-5 border ${
                isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
              }`}
            >
              <p className={`font-medium mb-2 ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                {isCorrect ? "✓ Correto!" : "✗ Incorreto"}
              </p>
              <p className={`text-sm leading-relaxed ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                {question.explanation}
              </p>
            </div>
          )}

          {/* Botões */}
          <div className="flex gap-3">
            {!showResult ? (
              <>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!selectedAnswer}
                  className="flex-1 px-4 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Responder
                </button>
              </>
            ) : (
              <button
                onClick={handleNext}
                className="w-full px-4 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition"
              >
                {questionNumber < totalQuestions ? "Próxima Questão" : "Concluir Fase"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionModal;

