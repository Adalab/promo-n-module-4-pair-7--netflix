const express = require("express");
const cors = require("cors");
const Database = require('better-sqlite3');
const db = new Database('./src/db/database.db', { 
  verbose: console.log
});

// create and config server
const server = express();
server.use(cors());
server.use(express.json());
server.set('view engine', 'ejs');

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

const movies = [
  {
    id: "1",
    title: "Gambita de dama",
    gender: "Drama",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    title: "Friends",
    gender: "Comedia",
    image: "https://via.placeholder.com/150",
  },
];



// GET/ API

server.get("/movies", (req, res) => {
  console.log("Peticion a la ruta GET /movies");
  console.log(movies);
  
   // preparamos la query
const query = db.prepare('SELECT * FROM movies');
// ejecutamos la query
const movies = query.all();
console.log(movies);
 
  res.json(movies);
});


server.get('/movies/:movieId', (req, res) => {
  console.log(req.params.movieId);
  const requestMovieId = req.params.movieId;
  const requestMovieData = movies.find (movie =>movie.id === requestMovieId);
  console.log(requestMovieData);
  //pasarsela a la plantilla
  res.render('movie', requestMovieData);
  //busca en la carpeta de views cual es la plantilla que se llama movies
});

const staticServerPathWeb = "./src/public-react"; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWeb));