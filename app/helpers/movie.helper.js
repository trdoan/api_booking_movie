const listMovie = [];
[...new Array(10)].map((item, index) =>
  listMovie.push({
    title: `Movie ${index + 1}`,
    time: 90,
    description: `Description of movie ${index + 1}`,
    director: `Director of movie ${index + 1}`,
    actor: `Actor of movie ${index + 1}`,
    rate: 9,
    trailer: "https://www.youtube.com/watch?v=IosqnBOkk2I",
    poster: "",
  })
);
