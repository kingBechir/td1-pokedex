import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import PokemonList from "./routes/pokemon/pokemon-list";
import PokemonDetail from "./routes/pokemon/pokemon-detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "pokemon",
        children: [
          {
            index: true,
            element: <PokemonList />,
          },
          {
            path: ":pokemonName",
            element: <PokemonDetail />,
          },
        ],
      },
    ],
  },
]);

export default router;
