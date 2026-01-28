export interface CountryData {
  name: string;
  coordinates: [number, number]; // [Longitude, Latitude] for standard GeoJSON usage (d3-geo)
}

// Origin: Lucknow, India
export const origin: CountryData = {
  name: "Lucknow, India",
  coordinates: [80.9462, 26.8467],
};

// Destination Countries
export const destinationCountries: CountryData[] = [
  { name: "Australia", coordinates: [133.7751, -25.2744] },
  { name: "Belgium", coordinates: [4.4699, 50.5039] },
  { name: "Bulgaria", coordinates: [25.4858, 42.7339] },
  { name: "Canada", coordinates: [-106.3468, 56.1304] },
  { name: "China", coordinates: [104.1954, 35.8617] },
  { name: "Germany", coordinates: [10.4515, 51.1657] },
  { name: "Greece", coordinates: [21.8243, 39.0742] },
  { name: "Indonesia", coordinates: [113.9213, -0.7893] },
  { name: "Italy", coordinates: [12.5674, 41.8719] },
  { name: "Lebanon", coordinates: [35.8623, 33.8547] },
  { name: "Malaysia", coordinates: [101.9758, 4.2105] },
  { name: "Mexico", coordinates: [-102.5528, 23.6345] },
  { name: "Morocco", coordinates: [-7.0926, 31.7917] },
  { name: "New Zealand", coordinates: [174.886, -40.9006] },
  { name: "Poland", coordinates: [19.1451, 51.9194] },
  { name: "Portugal", coordinates: [-8.2245, 39.3999] },
  { name: "Spain", coordinates: [-3.7492, 40.4637] },
  { name: "Sri Lanka", coordinates: [80.7718, 7.8731] },
  { name: "The Netherlands", coordinates: [5.2913, 52.1326] },
  { name: "Trinidad & Tobago", coordinates: [-61.2225, 10.6918] },
  { name: "Turkey", coordinates: [35.2433, 38.9637] },
  { name: "UAE", coordinates: [53.8478, 23.4241] },
  { name: "UK", coordinates: [-3.436, 55.3781] },
  { name: "USA", coordinates: [-95.7129, 37.0902] },
];
