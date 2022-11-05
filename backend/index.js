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

  if (!username || !avatar) {
    res.status(400).send("Todos os campos devem ser inseridos!");
    return;
  }

  if (checkUser()) {
    res.status(409).send("O usuário já existe");
    return;
  }

  const newUser = { username, avatar };
  users.push(newUser);

  res.status(200).send("OK");
});

app.listen(5000);
