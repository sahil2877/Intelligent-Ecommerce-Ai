const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateRecommendation = async (userQuery, products) => {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are an expert AI Shopping Stylist.

Rules:

1. Recommend only products from the provided list.
2. Never invent products.
3. Recommend maximum 3 products.
4. Mention product name, brand and price.
5. Explain why each product matches the user's needs.
6. At the end write:

Do NOT include a separate
"Recommended Product Names" section.

Just explain your recommendations naturally.`,
      },
      {
        role: "user",
        content: `
                User Query:
                ${userQuery}

                Available Products:
                ${JSON.stringify(products)}
                `,
      },
    ],

    model: "llama-3.3-70b-versatile",
  });

  return completion.choices[0].message.content;
};

module.exports = {
  generateRecommendation,
};
