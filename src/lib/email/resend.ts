interface ResendPayload {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
}

class ResendClient {
  async send(payload: ResendPayload) {
    if (!process.env.RESEND_API_KEY) {
      console.info("RESEND_API_KEY missing. Email payload:", payload);
      return { data: null, error: null };
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Resend error: ${text}`);
    }

    return response.json();
  }
}

export const resend = {
  emails: {
    send: (payload: ResendPayload) => new ResendClient().send(payload),
  },
};
