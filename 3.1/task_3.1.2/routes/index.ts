import { Router, Request, Response, NextFunction } from "express";

const router = Router();

enum Button {
  Button1 = "button1",
  Button2 = "button2",
}

let counter1: number = 0;
let counter2: number = 0;

router.post("/", (req, res) => {
  const { buttonId } = req.body;
  console.log(`Button ID: ${buttonId}`);

  if (buttonId === Button.Button1) {
    counter1++;
    console.log("button1 counter: ", counter1);
    res.json({ success: true, buttonId, counter: counter1 });
  } else if (buttonId === Button.Button2) {
    counter2++;
    console.log("button2 counter: ", counter2);
    res.json({ success: true, buttonId, counter: counter2 });
  }
});

export default router;
