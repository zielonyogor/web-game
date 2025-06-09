import { Router } from "express";
import * as GM from "../gameManager";

const router = Router();

router.get("/api/create-game", (req, res) => {
  const nickname = req.query.nickname as string;
  console.log(nickname);

  if(!nickname) {
    res.status(400).send({error: "Nickname required"});
    return;
  }

  const code = generateGameCode();
  GM.createGameSession(code);

  res.cookie("nickname", nickname, {
    httpOnly: false, //frontend
  })
  res.cookie("code", code, {
    httpOnly: false, //frontend
  })

  res.status(200).send(`Created game ${code}`);
});

router.get("/api/join-game", (req, res) => {
  const code = req.query.code as string;
  const nickname = req.query.nickname as string;
  
  if(!nickname) {
    res.status(400).send({error: "Nickname required"});
    return;
  }
  
  const game = GM.getGame(code);
  if (!game) {
    res.status(400).send({ error: "No such game exists" });
    return;
  }

  const nameTaken = game.players.some(player => player.nickname === nickname);
  if (nameTaken) {
    res.status(400).send({ error: "A player in this match already has this nickname" });
    return;
  }
  
  res.cookie("nickname", nickname, {
    httpOnly: false, //frontend
  })
  res.cookie("code", code, {
    httpOnly: false, //frontend
  })
  
  res.status(200).send(`Created game ${code}`);
});

function generateGameCode(): string {
  return Math.random().toString(36).substring(2, 9).toUpperCase();
}

export default router;
