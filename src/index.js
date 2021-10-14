const express = require("express");
const cors = require("cors");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

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
  console.log(req.query);
  const response = {
    success: true,
    movies: [
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
    ],
  };

  res.json(response);
});

// GET/ login ? email & pass

// server.get("login", (req, res)=>{
//   const email =req.query.email;
//   const pass = req.query.pass;

//   if(!email || !pass){
//     res.sendStatus(404)
//   } else {
//     if( email === "ivan@adalab.es" && pass ==="1234"){
//       res.json({ userId: "123456"});

//     }else{
//       res.json({error:"Error"});
//     }
//   }

// })
server.get('/movies/:movieId', (req, res) => {
  console.log(req.params.id);
  const requestMovieId = req.params.id;
  const requestMovieData = movies.find (movie =>movie.id === requestMovieId);
  console.log(requestMovieData);
  //pasarsela a la plantilla
  console.log(req.params.id);
  res.render('movies', requestMovieData);
  //busca en la carpeta de views cual es la plantilla que se llama views
  console.log(requestMovieData);
  
});

const staticServerPathWeb = "./src/public-react"; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWeb));
