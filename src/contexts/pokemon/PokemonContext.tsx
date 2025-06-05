import React, { createContext, useState, useContext } from "react";

type PokemonBasic = {
  name: string;
  url: string;
};

type PokemonDetail = {
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: { name: string };
  }[];
  abilities: {
    ability: { name: string };
  }[];
};

type PokemonContextType = {
  pokemons: PokemonBasic[];
  selectedPokemon: PokemonDetail | null;
  fetchPokemons: () => Promise<void>;
  fetchPokemonDetails: (name: string) => Promise<void>;
};

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pokemons, setPokemons] = useState<PokemonBasic[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(null);

  const fetchPokemons = async () => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
      const data = await res.json();
      setPokemons(data.results);
    } catch (error) {
      console.error("Erreur fetchPokemons :", error);
    }
  };

  const fetchPokemonDetails = async (name: string) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!res.ok) {
        setSelectedPokemon(null);
        return;
      }
      const data = await res.json();
      setSelectedPokemon(data);
    } catch (error) {
      console.error("Erreur fetchPokemonDetails :", error);
    }
  };

  return (
    <PokemonContext.Provider
      value={{ pokemons, selectedPokemon, fetchPokemons, fetchPokemonDetails }}
    >
      {children}
    </PokemonContext.Provider>
  );
};


export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemonContext doit être utilisé dans un PokemonProvider");
  }
  return context;
};
