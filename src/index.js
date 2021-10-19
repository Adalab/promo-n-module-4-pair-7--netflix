const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const db = new Database("./src/db/database.db", {
  verbose: console.log,
});

// create and config server
const server = express();
server.use(cors());
server.use(express.json());
server.set("view engine", "ejs");

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});



// GET/ API

server.get("/movies", (req, res) => {
  console.log("Peticion a la ruta GET /movies");

  // preparamos la query
  const query = db.prepare("SELECT * FROM movies");
  // ejecutamos la query
  const movies = query.all();
  console.log(movies);

  res.json({
    success: true,
    movies: movies
  });
});

server.get("/movies/:movieId", (req, res) => {
  console.log(req.params.movieId);
  const requestMovieId = req.params.movieId;
  const requestMovieData = movies.find((movie) => movie.id === requestMovieId);
  console.log(requestMovieData);
  //pasarsela a la plantilla
  res.render("movie", requestMovieData);
  //busca en la carpeta de views cual es la plantilla que se llama movies
});

server.get("/user/movies", (req, res) => {
  const moviesId = req.params.moviesId;
  const requestUserId = req.params.userId;
  const movieIdsQuery = query.prepare('SELECT movieId FROM users_movies WHERE userId = ?')
  const movieIds = movieIdsQuery.all(req.header('user-id'));
  console.log(movieIds);
  res.json( {
    "success": true,
    "movies": []
 }) 
});

server.post("/sign-up", (req, res) => {
 let response = req.body;
  if(req.body.userEmail ===''||req.body.userPassword ===''){
     response = { 
       success: true, 
       error: "faltan campos por rellenar"}
  }else{
    const query = db.prepare('INSERT INTO users (email,password) VALUES (?,?)')
    const result = query.run(req.body.userEmail,req.body.userPassword);
     response = { 
      success: true, 
      userId: result.lastInsertRowId}
  }
  res.json(response);
});
server.get("/user/userId", (req, res) => {
  const requestUserId = req.params.userId;
  const movieIdsQuery = query.prepare('SELECT movieId FROM users_movies WHERE userId = ?')
  const movieIds = movieIdsQuery.all(req.header('user-id'));
  console.log(movieIds);
  res.json( {
    "success": true,
    "user": movieIds
 }) 
});

const staticServerPathWeb = "./src/public-react"; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWeb));
