import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { usePokemonContext } from "../../contexts/pokemon/PokemonContext";


const getPokemonId = (url: string): string => {
  const match = url.match(/\/pokemon\/(\d+)\//);
  return match ? match[1] : "1";
};

const PokemonList: React.FC = () => {
  const { pokemons, fetchPokemons } = usePokemonContext();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      if (pokemons.length === 0) {
        setLoading(true);
        await fetchPokemons();
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    load();
  }, [pokemons]);

  if (loading) return <p className="text-center mt-5">Chargement...</p>;

  return (
    <div className="container">
      <h2 className="text-center mb-4">Liste des Pokémons</h2>

      <div className="row">
        {pokemons.map((pokemon) => (
          <div className="col-md-4 mb-4" key={pokemon.name}>
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title">{pokemon.name.toUpperCase()}</h5>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(
                    pokemon.url
                  )}.png`}
                  alt={pokemon.name}
                  className="mb-2"
                />
                <NavLink
                  to={`/pokemon/${pokemon.name}`}
                  className="btn btn-primary mt-2"
                >
                  Détails
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
