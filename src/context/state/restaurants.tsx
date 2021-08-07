import React, { createContext, useState, ReactElement, useEffect } from 'react';
import camelCase from 'camelcase-keys';
import { mockImages, mocks } from '../../mock';
import { useCallback } from 'react';

const mockRestaurant = mocks['51.219448,4.402464'].results[0];

type Required<T> = {
  [P in keyof T]-?: T[P];
};
type Restaurant = Required<typeof mockRestaurant>;

const citynameToCordinate = {
  antwerp: '51.219448,4.402464',
  toronto: '43.653225,-79.383186',
  chicago: '41.878113,-87.629799',
  'san francisco': '37.7749295,-122.4194155',
};
export type Cities = keyof typeof citynameToCordinate;

export type CitiesCordinate =
  | '51.219448,4.402464'
  | '43.653225,-79.383186'
  | '41.878113,-87.629799'
  | '37.7749295,-122.4194155';

type RestaurantsModification = {
  isClosedTemporarily: boolean;
  openNow: boolean | undefined;
  photos: string[];
};

type ModifiedRestaurants = Omit<Restaurant, keyof RestaurantsModification> &
  RestaurantsModification;

type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S;

type TransformedRestaurants = {
  [K in keyof ModifiedRestaurants as SnakeToCamelCase<K>]: ModifiedRestaurants[K];
};

const fetchRestaurants = (city: string) => {
  const location = cityToCordinate(city as Cities) as CitiesCordinate;
  return new Promise<Restaurant[]>(resolve => {
    setTimeout(() => {
      if (!location) {
        return resolve([]);
      }
      let results: Restaurant[];
      results = mocks[location].results as Restaurant[];
      return resolve(results);
    }, 2000);
  });
};

const transformResult = (results: Restaurant[]): TransformedRestaurants[] => {
  return results.map(restaurant =>
    camelCase({
      ...restaurant,
      isClosedTemporarily: restaurant.business_status === 'CLOSED TEMPORARILY',
      openNow: restaurant.opening_hours?.open_now,
      photos: [mockImages[Math.floor(Math.random() * mockImages.length)]],
    })
  );
};

const cityToCordinate = (city: Cities): string => citynameToCordinate[city];

export interface RestaurantsType {
  restaurants: TransformedRestaurants[];
  loading: boolean;
  error: string | null;
  keyword: string;
  onSearch: () => void;
  setKeyword: (keyword: Cities) => void;
}

export const RestaurantsContext = createContext<RestaurantsType>(
  {} as RestaurantsType
);

export function RestaurantsProvider({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  const [restaurants, setRestaurants] = useState<TransformedRestaurants[]>(
    [] as TransformedRestaurants[]
  );
  const [keyword, setKeyword] = useState<Cities>('chicago');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const onSearch = useCallback(() => {
    setLoading(true);
    fetchRestaurants(keyword)
      .then(
        result => {
          const transformedResult = transformResult(result as Restaurant[]);
          setRestaurants(transformedResult);
        },
        reason => setError(reason)
      )
      .finally(() => {
        setLoading(false);
      });
  }, [keyword]);

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        keyword,
        setKeyword: (text: Cities): void => setKeyword(text),
        onSearch: onSearch,
        error,
        loading,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
}
