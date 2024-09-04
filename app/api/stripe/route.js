export async function POST(req, res) {
    const { amount } = await req.json();
    const response = await fetch(
        `${process.env.FAST_API_URI}/create-payment-intent?amount=${amount}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    const data = await response.json();

    if (response.ok) {
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } else {
        return new Response(JSON.stringify({ error: data.detail }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
