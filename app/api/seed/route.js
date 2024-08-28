export async function GET() {
  const questions = [
    { text: "What is the capital of France?" },
    { text: "Who wrote 'Pride and Prejudice'?" },
    { text: "What is the square root of 144?" },
    { text: "What is the chemical symbol for gold?" },
    { text: "Who painted the Mona Lisa?" },
  ];

  for (const question of questions) {
    await fetch("http://localhost:3000/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    });
  }
  return new Response(JSON.stringify({ message: "Seeded questions!" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
