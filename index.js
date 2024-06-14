import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// Pre built dad jokes
let posts = [
  {
    id: 1,
    title: "The Batman",
    content:
      "My boss said “dress for the job you want, not for the job you have.” So I went in as Batman.",
    author: "Anonymous",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The smell fishy dad",
    content:
      "I went to the aquarium this weekend, but I didn’t stay long. There’s something fishy about that place.",
    author: "Anonymous",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "MRI",
    content:
      "Dogs can't operate MRI machines. But catscan",
    author: "Anonymous",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//1: GET All posts
app.get("/posts", (req,res) => {
  console.log(posts);
  res.json(posts);
})

//2: GET a specific post by id
app.get("/posts/:id", (req,res)=>{
  const getSpecificPostById = parseInt(req.params.id);
  const postById = posts.find((item) => item.id === getSpecificPostById);
  if (!postById) return res.status(404).json({message: "Not Found"});
  res.json(postById);
});

//3: POST a new post
app.post("/posts", (req,res)=> {
  const newPostID = lastId += 1;
  const post = {
    id: newPostID,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newPostID;
  posts.push(post);
  res.status(201).json(post);
  console.log(posts);
});

//4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req,res)=>{
  const editPostId = parseInt(req.params.id);
  const editPost = posts.find((item)=> item.id === editPostId);
  if(!editPost) return res.status(404).json({message : "Not Found"});

  if (req.body.title) editPost.title = req.body.title;
  if (req.body.content) editPost.content = req.body.content;
  if (req.body.author) editPost.author = req.body.author;
  
  res.json(editPost);
});

//5: DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req,res)=>{
  const deletingPostId = parseInt(req.params.id);
  const deletingPost = posts.findIndex((item)=> item.id === deletingPostId);
  if (deletingPost === -1) return res.status(404).json({message: "Not Found"});

  posts.splice(deletingPost , 1);
  res.json({message: "Post Deleted"});
})

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
