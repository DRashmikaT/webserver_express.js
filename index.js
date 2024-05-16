import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

let posts = [];
let editIndex = -1;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index.ejs", { posts: posts, editMode: false });
});

app.post("/submit", (req, res) => {
    const author = req.body.author;
    const title = req.body.title;
    const content = req.body.content;
    posts.push({ author: author, title: title, content: content });
    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    editIndex = parseInt(req.params.id);
    res.render("index.ejs", { posts: posts, editMode: true, editIndex: editIndex, editPost: posts[editIndex] });
});

app.post("/edit/:id", (req, res) => {
    const author = req.body.author;
    const title = req.body.title;
    const content = req.body.content;
    posts[editIndex] = { author: author, title: title, content: content };
    res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
    const postId = req.params.id;
    posts.splice(postId, 1);
    res.redirect("/");
});

app.listen(port, () => {
    console.log("Server is up and running on port " + port);
});
