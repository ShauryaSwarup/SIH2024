import connectMongo from "@/lib/mongoose";
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);

export async function GET(req, res) {
  await connectMongo();
  try {
    const questions = await Question.find();
    return new Response(JSON.stringify(questions), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to fetch questions!" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
export async function POST(req, res) {
  await connectMongo();
  try {
    const question = new Question({ text: req.body.text });
    const newQuestion = await question.save();
    return new Response(JSON.stringify(newQuestion), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to create question" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
