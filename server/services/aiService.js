const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const generateRecommendation =
async (userQuery, products) => {

    const completion =
    await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content:
                `You are an AI Product Stylist.
                
                Recommend products only from the provided product list.
                
                Explain why each product is suitable.`
            },
            {
                role: "user",
                content:
                `
                User Query:
                ${userQuery}

                Available Products:
                ${JSON.stringify(products)}
                `
            }
        ],

        model: "llama-3.3-70b-versatile"
    });

    return completion.choices[0].message.content;
};

module.exports = {
    generateRecommendation
};