function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full border p-2 rounded mb-4"
        />

        <button className="w-full bg-black text-white p-2 rounded">
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
