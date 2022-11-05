import express, { application } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users = [
  {
    username: "bobesponja",
    avatar:
      "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
  },
];

const tweets = [
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  function checkUser() {
    const doExist = users.find((user) => user.username === username);
    if (doExist) {
      return true;
    } else {
      return false;
    }
  }

  const isValidUrl = (urlString) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };

  if (!username || !avatar) {
    res.status(400).send("Todos os campos devem ser inseridos!");
    return;
  }

  if (!isValidUrl(avatar)) {
    res.status(422).send("Use uma URL de imagem válida");
    return;
  }

  if (checkUser()) {
    res.status(409).send("O usuário já existe");
    return;
  }

  const newUser = { username, avatar };
  users.push(newUser);

  res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;

  function checkUser() {
    const doExist = users.find((user) => user.username === username);
    if (!doExist) {
      return true;
    } else {
      return false;
    }
  }

  if (!username || !tweet) {
    res.status(400).send("Você deve escrever algo!");
    return;
  }

  if (checkUser()) {
    res.status(401).send("Faça login para poder postar");
    return;
  }

  const newTweet = { username, tweet };
  tweets.push(newTweet);

  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  const tweetList = [];

  for (let i = tweets.length - 1; i >= 0; i--) {
    let userImg = users.find(
      (user) => user.username === tweets[i].username
    ).avatar;

    let tweet = { ...tweets[i], avatar: userImg };
    tweetList.push(tweet);

    if (tweetList.length === 10) {
      break;
    }
  }

  res.send(tweetList);
});

app.get("/tweets/:username", (req, res) => {
  const { username } = req.params;
  const queryUser = users.find((user) => user.username === username);
  
  if(!queryUser){
    res.status(400).send("Usuário não encontrado");
    return
  }

  const userTweets = tweets.filter((tweet) => tweet.username === username);
  if(userTweets.length===0){
    res.status(400).send("Não há tweets para esse usuário");
    return
  }

  const userImg = queryUser.avatar;
  userTweets.forEach((tweet) => (tweet.avatar = userImg));

  res.send(userTweets);
});

app.listen(5000);
