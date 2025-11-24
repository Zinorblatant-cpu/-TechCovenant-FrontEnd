function MapNode({
  x,
  y,
  phaseNumber,
  materia,
  dificuldade,
  isCompleted,
  isAvailable,
  isCurrent,
  onClick,
}) {
  const getDificuldadeLabel = (dificuldade) => {
    const labels = {
      Easy: "Fácil",
      Medium: "Médio",
      Hard: "Difícil",
    };
    return labels[dificuldade] || dificuldade;
  };

  // Cores neutras baseadas no estado, não na matéria
  const getNodeColor = () => {
    if (isCompleted) return "#10b981"; // verde suave para completado
    if (isAvailable) return "#4b5563"; // cinza escuro para disponível
    return "#d1d5db"; // cinza claro para bloqueado
  };

  const color = getNodeColor();
  const radius = isCurrent ? 26 : 22;

  return (
    <g
      transform={`translate(${x}, ${y})`}
      className={isAvailable ? "cursor-pointer" : "cursor-not-allowed"}
      onClick={onClick}
    >
      {/* Círculo principal */}
      <circle
        cx="0"
        cy="0"
        r={radius}
        fill={color}
        stroke="#ffffff"
        strokeWidth="2.5"
        opacity={isAvailable ? 1 : 0.4}
      />

      {/* Ícone de check se completado */}
      {isCompleted && (
        <g transform="translate(-8, -8)">
          <path
            d="M 0 4 L 4 8 L 12 0"
            stroke="#ffffff"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}

      {/* Número da fase se não completado */}
      {!isCompleted && (
        <text
          x="0"
          y="0"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#ffffff"
          fontSize="16"
          fontWeight="bold"
        >
          {phaseNumber}
        </text>
      )}

      {/* Label da matéria abaixo do nó */}
      <text
        x="0"
        y={radius + 14}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#374151"
        fontSize="9"
        fontWeight="500"
        className="select-none"
        opacity={isAvailable ? 1 : 0.5}
      >
        {materia.charAt(0).toUpperCase() + materia.slice(1)}
      </text>

      {/* Label da dificuldade */}
      <text
        x="0"
        y={radius + 26}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#6b7280"
        fontSize="8"
        className="select-none"
        opacity={isAvailable ? 1 : 0.4}
      >
        {getDificuldadeLabel(dificuldade)}
      </text>

      {/* Anel sutil se for a fase atual */}
      {isCurrent && (
        <circle
          cx="0"
          cy="0"
          r={radius + 4}
          fill="none"
          stroke="#4b5563"
          strokeWidth="1.5"
          opacity="0.5"
        />
      )}
    </g>
  );
}

export default MapNode;

