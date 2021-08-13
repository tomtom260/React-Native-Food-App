import React, {
  ReactElement,
  createContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Restaurant } from './restaurants';
import { useContext } from 'react';
import { AuthContext } from '../auth';
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
  const { user } = useContext(AuthContext);

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

  useEffect(() => {
    const loadFavourites = async () => {
      const fav = await AsyncStorage.getItem(`@favourites-${user?.uid}`);
      if (fav) setFavourites(JSON.parse(fav));
      else setFavourites([]);
    };

    loadFavourites();
  }, [user]);

  useEffect(() => {
    const saveFavourites = async () => {
      await AsyncStorage.setItem(
        `@favourites-${user?.uid}`,
        JSON.stringify(favourites)
      );
    };

    saveFavourites();
  }, [favourites, user]);

  return (
    <FavouritesContext.Provider
      value={{ favourites, addToFavourites, removeFromFavourites }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}
