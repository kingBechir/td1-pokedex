import React from "react";
import { Outlet } from "react-router-dom";
import { PokemonProvider } from "./contexts/pokemon/PokemonContext";

const App: React.FC = () => {
  return (
    <PokemonProvider>
      <div className="container mt-4">
          <h1 className="text-center mb-5">Explorateur de Pokémons</h1>
        <Outlet />
      </div>
    </PokemonProvider>
  );
};

export default App;
