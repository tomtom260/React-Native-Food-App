import React, {
  ReactElement,
  createContext,
  useState,
  useCallback,
} from 'react';
import { Restaurant } from './restaurants';

interface Favourites {
  favourites: Restaurant[];
  addToFavourites: (restaurant: Restaurant) => void;
  removeFromFavourites: (restaurant: Restaurant) => void;
}

export const FavouritesContext = createContext<Favourites>({} as Favourites);

export function FavouritesProvider({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  const [favourites, setFavourites] = useState<Restaurant[]>([]);

  const addToFavourites: Favourites['addToFavourites'] = useCallback(
    restaurant => setFavourites(fav => [...fav, restaurant]),
    []
  );

  const removeFromFavourites: Favourites['removeFromFavourites'] = useCallback(
    restaurant =>
      setFavourites(fav =>
        fav.filter(rest => rest.placeId !== restaurant.placeId)
      ),
    []
  );

  return (
    <FavouritesContext.Provider
      value={{ favourites, addToFavourites, removeFromFavourites }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}
