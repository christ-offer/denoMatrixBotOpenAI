export class OpenAI {
  private privKey: string;

  constructor(privateKey: string) {
    this.privKey = privateKey;
  }

  public async createCompletionText(
    prompt: string,
    model = "text-davinci-002",
    temperature = 0.7,
    maxTokens = 260,
    topP = 1,
    frequencyPenalty = 0,
    presencePenalty = 0,
  ): Promise<Response> {
    const response = await fetch(
      `https://api.openai.com/v1/completions`,
      {
        body: JSON.stringify({
          prompt: prompt,
          model: model,
          temperature: temperature,
          max_tokens: maxTokens,
          top_p: topP,
          frequency_penalty: frequencyPenalty,
          presence_penalty: presencePenalty,
        }),
        headers: {
          Authorization: `Bearer ${this.privKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      },
    );
    return response.json();
  }
  public async createCompletionCode(
    prompt: string,
    model = "code-davinci-002",
    temperature = 0.1,
    maxTokens = 360,
    topP = 1,
    frequencyPenalty = 0,
    presencePenalty = 0,
  ): Promise<Response> {
    const response = await fetch(
      `https://api.openai.com/v1/completions`,
      {
        body: JSON.stringify({
          prompt: prompt,
          model: model,
          temperature: temperature,
          max_tokens: maxTokens,
          top_p: topP,
          frequency_penalty: frequencyPenalty,
          presence_penalty: presencePenalty,
        }),
        headers: {
          Authorization: `Bearer ${this.privKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      },
    );
    return response.json();
  }
}