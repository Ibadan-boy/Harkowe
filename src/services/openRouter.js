export async function askOpenRouter(prompt) {

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
      "Content-Type": "application/json",
      // Optional: Identify your app (OpenRouter recommends this)
      "HTTP-Referer": "YOUR_SITE_URL",  // Replace with your app's URL
      "X-Title": "YOUR_APP_NAME",       // Replace with your app's name
    },
    body: JSON.stringify({
      model: "cognitivecomputations/dolphin3.0-r1-mistral-24b:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      // Optional: Add parameters like temperature, max_tokens, etc.
      // temperature: 0.7,
      // max_tokens: 1000,
    }),
  });

  //console.log(import.meta.env.VITE_OPENROUTER_KEY)

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "OpenRouter API error");
  }

  return data.choices[0].message.content;
}