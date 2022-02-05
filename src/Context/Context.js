import { createContext } from "react";

export const SongContext = createContext({
  song: {
    id: '86c1d4b9-9676-4f2e-9e8d-cf2c6e08eae2',
    title: 'Mr. & Mrs. Smith',
    artist: 'Егор Крид feat. Nyusha',
    thumbnail: 'http://img.youtube.com/vi/m0nnxzt3dHA/0.jpg',
    url: 'https://www.youtube.com/watch?v=m0nnxzt3dHA',
    duration: 424,
  },
  isPlaying: false
})
