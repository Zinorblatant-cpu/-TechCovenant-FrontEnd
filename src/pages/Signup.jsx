import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch(
        "https://techcovenant.onrender.com/api/users",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: senha,
          }),
        }
      );

      const data = await response.json();
      console.log("Resposta da API:", data);

      if (response.ok) {
        navigate("/login");
      } else {
        setErro(data.message || "Erro ao criar conta.");
      }
    } catch (error) {
      console.error("Erro ao enviar para API:", error);
      setErro("Erro ao conectar com servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        <h1 className="text-xl font-bold mb-4">Criar Conta</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setSenha(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirme a senha"
          className="w-full border p-2 rounded mb-3"
          onChange={(e) => setConfirmSenha(e.target.value)}
        />

        {erro && <p className="text-red-600 text-sm mb-2">{erro}</p>}

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white p-2 rounded"
        >
          Registrar
        </button>
      </div>
    </div>
  );
}

export default Signup;
