import express from "express";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { SubmitFeedbackUseCase } from "./useCases/submit-feedback-use-case";

export const routes = express.Router();

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "dac9a57bfc611f",
    pass: "6e723f2dfe7bf8",
  },
});

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  //await transport.sendMail({
  //  from: "Equipe Feedget <oi@feedget.com>",
  //  to: "devlucascardoso <lucascardoso946@gmail.com>",
  //  subject: "Novo feedback",
  //  html: [
  //    `<div style="font-family: sans-serif; font-size: 16px;  color: #191;>`,
  //    `<p>Tipo do feedback: ${type}>`,
  //    `<p>Comentário: ${comment}</p>`,
  //    `</div>`,
  //  ].join("\n"),
  // });

  return res.status(201).send();
});
