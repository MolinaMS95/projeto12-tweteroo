import express, { application } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.listen(5000);