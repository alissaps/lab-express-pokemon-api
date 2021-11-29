const express = require("express");
const { v4: uuidv4 } = require("uuid");

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");
const postRouter = express.Router();

const app = express();

app.use(express.json());
app.use("/", postRouter);

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});

// 01

postRouter.get("/pokemon", (req, res) => {
  return res.status(200).json({ ...allPokemon });
});

// 02
postRouter.get("/pokemon/:id", (req, res) => {
  const indexToSubstitute = allPokemon.findIndex((currentPost) => {
    console.log(currentPost.id == req.params.id)
    return currentPost.id == req.params.id;
  });
  
   res.status(200).json({ ...allPokemon[indexToSubstitute] });
});

// 04
postRouter.post("/pokemon", (req, res) => {
  allPokemon.push({ id: uuidv4(), ...req.body });
  return res.status(201).json({ ...allPokemon[allPokemon.length - 1] });
});

// 05

postRouter.put("/pokemon/:id", (req, res) => {
  const indexToSubstitute = allPokemon.findIndex((currentPost) => {
    
    return currentPost.id == req.params.id;
  });

  allPokemon[indexToSubstitute] = { ...allPokemon[indexToSubstitute], ...req.body };

  res.status(200).json({ ...allPokemon[indexToSubstitute] });
});

// 06

postRouter.delete("/pokemon/:id", (req, res) => {
  const indexToDelete = allPokemon.findIndex((currentPost) => {
    
    return currentPost.id == req.params.id;
  });

  allPokemon.splice(indexToDelete, 1)

  res.status(200).json({});
});