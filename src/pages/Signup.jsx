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
    setErro(""); // Limpa erros anteriores

    // Validações básicas
    if (!email || !senha || !confirmSenha) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    if (senha !== confirmSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      const requestBody = {
        email: email.trim(),
        password_hash: senha,
      };
      
      console.log("Enviando requisição para API...");
      console.log("Dados enviados:", requestBody);
      
      const response = await fetch(
        "https://techcovenant.onrender.com/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      console.log("Status da resposta:", response.status);
      
      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.log("Resposta não-JSON:", text);
        data = { error: text || "Erro desconhecido" };
      }
      
      console.log("Resposta completa da API:", JSON.stringify(data, null, 2));

      if (response.ok) {
        console.log("Conta criada com sucesso!");
        navigate("/login");
      } else {
        // Tenta obter mensagem de erro da API em diferentes formatos
        let errorMessage = "Erro ao criar conta.";
        
        if (data.detail) {
          // Formato FastAPI/Pydantic
          if (Array.isArray(data.detail)) {
            errorMessage = data.detail.map(err => 
              `${err.loc?.join('.') || 'Campo'}: ${err.msg || err.message || 'Erro de validação'}`
            ).join(', ');
          } else if (typeof data.detail === 'string') {
            errorMessage = data.detail;
          } else {
            errorMessage = JSON.stringify(data.detail);
          }
        } else if (data.message) {
          errorMessage = data.message;
        } else if (data.error) {
          errorMessage = data.error;
        } else if (data.errors) {
          // Formato de erros de validação
          if (Array.isArray(data.errors)) {
            errorMessage = data.errors.join(', ');
          } else {
            errorMessage = JSON.stringify(data.errors);
          }
        } else if (typeof data === 'string') {
          errorMessage = data;
        } else {
          // Mostra o objeto completo se não conseguir extrair mensagem
          errorMessage = `Erro ${response.status}: ${JSON.stringify(data)}`;
        }
        
        setErro(errorMessage);
        console.error("Erro detalhado:", errorMessage);
        console.error("Objeto de erro completo:", data);
      }
    } catch (error) {
      console.error("Erro ao enviar para API:", error);
      setErro("Erro ao conectar com servidor. Verifique sua conexão.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        <h1 className="text-xl font-bold mb-4">Criar Conta</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            className="w-full border p-2 rounded mb-4"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            minLength={6}
          />

          <input
            type="password"
            placeholder="Confirme a senha"
            className="w-full border p-2 rounded mb-3"
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)}
            required
            minLength={6}
          />

          {erro && (
            <div className="text-red-600 text-sm mb-2 p-2 bg-red-50 rounded border border-red-200">
              <p className="font-semibold">Erro:</p>
              <p className="whitespace-pre-wrap break-words">{erro}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
