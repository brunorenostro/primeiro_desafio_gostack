const express = require("express");

const cors = require("cors");

const { uuid} = require("uuidv4");

const { json } = require('express');
const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories);

});

app.post("/repositories", (request, response) => {

const {title,url,techs}=request.body;
const repositorie={id:uuid(),title,url,techs,likes:0};
repositories.push(repositorie);

return response.json(repositorie);

});

app.put("/repositories/:id", (request, response) => {
 const {id}=request.params;
const {title,url,techs}=request.body;

const indexRepo= repositories.findIndex(repositorie => repositorie.id===id);
if(indexRepo<0){
return response.status(400).json({error:"repositorio não encontrado"});
}

const likes=repositories[indexRepo].likes;
const repositorie={
id,
title,
url,
techs,
likes
};
console.log(repositorie);
repositories[indexRepo]=repositorie;

return response.json(repositorie);



});

app.delete("/repositories/:id", (request, response) => {
  const {id}=request.params;
const indexRepo=repositories.findIndex(repositorie => repositorie.id===id);
if(indexRepo<0){
  console.log("teste");
return response.status(400).json({error:"repositorie not found"});
}
repositories.splice(indexRepo,1);
return response.status(204).json({});

});

app.post("/repositories/:id/like", (request, response) => {
  const {id}=request.params;
  const indexRepo= repositories.findIndex(repositorie => repositorie.id===id);
  if(indexRepo<0){
    return response.status(400).json({error:"repositorie not found"});
  };

  const title=repositories[indexRepo].title;  
  const likes=repositories[indexRepo].likes + 1;
  const url=repositories[indexRepo].url;
  const techs=repositories[indexRepo].techs;
  const repositorie={
  id,
  title,
  url,
  techs,
  likes
  };

repositories[indexRepo]=repositorie;
return response.json(repositorie);

});

module.exports = app;
