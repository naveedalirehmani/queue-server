import { Worker } from "bullmq";

interface EmailPayload {
  from: string;
  to: string;
  subject: string;
  body: string;
}

export function mockSendEmail(payload: EmailPayload): Promise<void> {
  console.log("sending email to :", payload.to);
  return new Promise((resolve) => setTimeout(resolve, 1500));
}

const emailWorker = new Worker<EmailPayload>(
  "email-queue",
  async (job) => {
    const data = job.data;
    console.log("Job Id", job.id);

    await mockSendEmail({
      from: data.from,
      to: data.to,
      subject: data.subject,
      body: data.body,
    });
  },
  {
    connection: {
        host: process.env.AIVEN_HOST,
        port: parseInt(process.env.AIVEN_PORT as string),
        username: process.env.AIVEN_USERNAME,
        password: process.env.AIVEN_PASSWORD,
    },
    limiter: {
      max: 50,
      duration: 10 * 1000,
    },
  }
);

export default emailWorker;
