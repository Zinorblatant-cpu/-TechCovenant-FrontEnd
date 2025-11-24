import logo from "./assets/LOGOXP2.jpg";
import perfil from "./assets/perfil.jpg";

function App() {
  return (
    <body className="bg-slate-200">
      <header className="bg-black h-20 text-white sticky top-0 z-10">
        <section className="max-w-screen-xl mx-auto h-full px-6 flex justify-between items-center">

          {/* Logo */}
          <img src={logo} alt="Logo XP" className="h-16 object-contain" />

          {/* Level + Perfil alinhados no canto direito */}
          <div className="flex items-center gap-3">
            
            {/* Texto Level */}
            <p className="text-yellow-400 font-semibold text-sm">
              Level 10
            </p>

              {/* Barra de XP centralizada */}
            <div className="flex flex-col items-start">
              <div className="h-2 w-28 bg-neutral-700 rounded">
                <div
                  className="h-2 bg-yellow-400 rounded"
                  style={{ width: "10%" }}
                ></div>
              </div>
            </div>

            {/* Foto de perfil */}
            <img
              src={perfil}
              alt="imagem do lego batman"
              className="h-16 w-16 rounded-full object-cover"
            />
          </div>

      </section>
    </header>

    <section className="flex justify-center items-center h-96 gap-96">
      <div className="bg-yellow-500 w-72 h-40 flex items-center justify-center rounded-xl">
        <h1 className="text-slate-200 font-bold text-2xl ">Map</h1>
      </div>

      
      <div className="outline outline-yellow-500 w-80 min-h-44 rounded-2xl p-5 bg-white shadow-sm">

        <h2 className="text-xl font-semibold mb-3 text-gray-900">
          Missões
        </h2>

        <ul className="space-y-2 text-gray-700 text-[0.95rem] leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 font-bold">•</span>
            <span>Missão 1 — Sprint de Foco</span>
          </li>

          <li className="flex items-start gap-2">
            <span className="text-yellow-500 font-bold">•</span>
            <span>Missão 2 — Exploração Teórica</span>
          </li>

          <li className="flex items-start gap-2">
            <span className="text-yellow-500 font-bold">•</span>
            <span>Missão 3 — Desafio Prático</span>
          </li>
        </ul>

      </div>


    </section>
    
    <section className="flex justify-center items-center h-96 gap-96 ">
      <div className="bg-yellow-500 w-10/12 h-20 flex items-center justify-center rounded-xl">
        <h1 className="text-slate-200 font-bold text-2xl">Conquistas Recentes</h1>
      </div>
    </section>

    <section className="flex justify-center items-center h-96 gap-96 ">
      <div className="bg-black  w-10/12 h-20 flex items-center justify-center rounded-xl">
        <h1 className="text-slate-200 font-bold text-2xl">Estatísticas</h1>
      </div>
    </section>






    </body>
  );
}

export default App;
