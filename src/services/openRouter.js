export async function askAI(prompt) {
  try {
    // Try Ollama first
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3", // change to your pulled model
        prompt: prompt,
      }),
    });

    if (!response.ok) {
      throw new Error("Ollama not available");
    }

    // Handle Ollama streaming JSONL format
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let result = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      for (const line of chunk.split("\n")) {
        if (!line.trim()) continue;
        try {
          const json = JSON.parse(line);
          if (json.response) result += json.response;
        } catch (e) {
          // ignore bad chunks
        }
      }
    }

    if (result.trim() === "") {
      throw new Error("Empty response from Ollama");
    }

    return result.trim();

  } catch (err) {
    console.warn("Ollama not running, falling back to OpenRouter...");

    // Fallback → OpenRouter
    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "YOUR_SITE_URL",
        "X-Title": "YOUR_APP_NAME",
      },
      body: JSON.stringify({
        model: "cognitivecomputations/dolphin3.0-r1-mistral-24b:free",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const openRouterData = await openRouterResponse.json();

    if (!openRouterResponse.ok) {
      throw new Error(openRouterData?.error?.message || "OpenRouter API error");
    }

    return openRouterData.choices[0].message.content;
  }
}
