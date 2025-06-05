import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { usePokemonContext } from "../../contexts/pokemon/PokemonContext";

const PokemonDetail: React.FC = () => {
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const { selectedPokemon, fetchPokemonDetails } = usePokemonContext();
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const load = async () => {
    if (pokemonName) {
      setLoading(true);
      await fetchPokemonDetails(pokemonName);
      setLoading(false);
    }
  };

  load();
}, [pokemonName]);

  if (loading) return <p>Chargement du Pokémon...</p>;
  if (!selectedPokemon && !loading) return <p>Pokémon non trouvé.</p>;
  if (!selectedPokemon) return null;

return (
  <div className="container d-flex justify-content-center mt-5">
    <div className="card shadow p-4 text-center" style={{ maxWidth: "500px", width: "100%" }}>
      <h2 className="mb-3">{selectedPokemon.name.toUpperCase()}</h2>

      <img
        src={selectedPokemon.sprites.front_default}
        alt={selectedPokemon.name}
        className="mb-3 mx-auto d-block"
        style={{ width: "120px", height: "120px" }}
      />

      <h4 className="mt-3">Types :</h4>
      <ul className="list-unstyled">
        {selectedPokemon.types.map((t, index) => (
          <li key={index}>{t.type.name}</li>
        ))}
      </ul>

      <h4 className="mt-3">Capacités :</h4>
      <ul className="list-unstyled">
        {selectedPokemon.abilities.map((a, index) => (
          <li key={index}>{a.ability.name}</li>
        ))}
      </ul>

      <NavLink to="/pokemon" className="btn btn-primary mt-3">
         Retour à la liste
      </NavLink>
    </div>
  </div>
);
};

export default PokemonDetail;
