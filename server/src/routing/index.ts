import { Router } from "express";

const router = Router();

router.get("/api/create-game", (req, res) => {
  const name = req.query.nickname as string;
  console.log(name);

  if(!name) {
    res.status(400).send("Nickname required");
  }

  const gameCode = generateGameCode();

  res.cookie("nickname", name, {
    httpOnly: false, //frontend
  })

  console.log(`/lobby?code=${gameCode}`);
  res.redirect(`/lobby?code=${gameCode}`);
});

function generateGameCode(): string {
  return Math.random().toString(36).substring(2, 9).toUpperCase();
}

export default router;
