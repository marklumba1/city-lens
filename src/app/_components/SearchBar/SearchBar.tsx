"use client";
import useDebounce from "@/app/_lib/hooks/useDebounce";
import fetchUtil from "@/app/_lib/util/fetch";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export interface NominatimPlace {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: [string, string, string, string];
}

export default function SearchBar({onSelect}: {onSelect: (place: NominatimPlace) => void}) {
  const [searchText, setSearchText] = useState("");
 
  const debouncedSearch = useDebounce(searchText, 300);


    const { data: places, isLoading, error } = useQuery<NominatimPlace[]>({
    queryKey: [debouncedSearch], // cache key
    queryFn: () => fetchUtil( `https://nominatim.openstreetmap.org/search?q=${debouncedSearch}&format=json&limit=1000`),
    enabled: !!debouncedSearch
  });
  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={(el) => setSearchText(el.target.value)}
        placeholder="Search"
      />
      <ul>
        {places && places.map(place => <p className="hover:bg-slate-100" onClick={() => onSelect(place)}>{place.display_name}</p>)}
        {isLoading && <p>Loading...</p>}
      </ul>
    </div>
  );
}
