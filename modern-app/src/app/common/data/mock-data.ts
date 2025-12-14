import { Movie } from '../../models/movie';
import { Series } from '../../models/series';

export const MOVIES: Movie[] = [
  {
    id: 1,
    name: "Inception",
    categories: "Sci-Fi, Action",
    language: "English",
    releaseddate: "2010-07-16",
    story: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    forkid: "1",
    imageurl: "assets/images/movies/inception.png",
    videourl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    views: 15400,
    duration: "2h 28m"
  },
  {
    id: 2,
    name: "Interstellar",
    categories: "Sci-Fi, Adventure",
    language: "English",
    releaseddate: "2014-11-07",
    story: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    forkid: "1",
    imageurl: "assets/images/movies/interstellar.png",
    videourl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    views: 12300,
    duration: "2h 49m"
  },
  {
    id: 3,
    name: "The Dark Knight",
    categories: "Action, Crime",
    language: "English",
    releaseddate: "2008-07-18",
    story: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    forkid: "1",
    imageurl: "assets/images/movies/dark-knight.png",
    videourl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    views: 20000,
    duration: "2h 32m"
  },
  {
    id: 4,
    name: "Avengers: Endgame",
    categories: "Action, Adventure",
    language: "English",
    releaseddate: "2019-04-26",
    story: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    forkid: "1",
    imageurl: "assets/images/movies/avengers-endgame.png",
    videourl: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
    views: 25000,
    duration: "3h 1m"
  },
  {
    id: 5,
    name: "Parasite",
    categories: "Thriller, Drama",
    language: "Korean",
    releaseddate: "2019-05-30",
    story: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    forkid: "1",
    imageurl: "assets/images/movies/parasite.png",
    videourl: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
    views: 18000,
    duration: "2h 12m"
  }
];

export const SERIES: Series[] = [
  {
    id: 1,
    name: "Breaking Bad",
    categories: "Crime, Drama",
    language: "English",
    story: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
    forkid: "1",
    imageurl: "assets/images/movies/breaking-bad.png",
    videourl: "https://www.youtube.com/watch?v=HhesaQXLuRY",
    count: 62
  },
  {
    id: 2,
    name: "Stranger Things",
    categories: "Sci-Fi, Horror",
    language: "English",
    story: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
    forkid: "1",
    imageurl: "assets/images/movies/stranger-things.png",
    videourl: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
    count: 34
  },
  {
    id: 3,
    name: "Game of Thrones",
    categories: "Action, Adventure",
    language: "English",
    story: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    forkid: "1",
    imageurl: "assets/images/movies/game-of-thrones.png",
    videourl: "https://www.youtube.com/watch?v=gcTkNV5Vg1E",
    count: 73
  },
  {
    id: 4,
    name: "The Crown",
    categories: "Drama, History",
    language: "English",
    story: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
    forkid: "1",
    imageurl: "assets/images/movies/the-crown.png",
    videourl: "https://www.youtube.com/watch?v=JWtnJjn6ng0",
    count: 60
  }
];
