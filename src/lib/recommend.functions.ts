import { createOpenAI } from "@ai-sdk/openai";
import { createServerFn } from "@tanstack/react-start";
import { Output, streamText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayRunIdFetch } from "@/lib/ai-gateway.server";
import { programs } from "@/data/site";

const RecommendInput = z.object({
  age: z.number().int().min(1).max(18),
  interests: z.string().min(2).max(400),
  lang: z.enum(["ar", "en"]),
  notes: z.string().max(400).nullable(),
});

const RecommendOutput = z.object({
  programId: z.string(),
  headline: z.string(),
  why: z.string(),
  tips: z.array(z.string()),
  alternativeId: z.string().nullable(),
});

export type Recommendation = z.infer<typeof RecommendOutput>;

const catalogue = () =>
  programs
    .map(
      (p) =>
        `- id: ${p.id} | ${p.title.ar} / ${p.title.en} | ${p.age.ar} | ${p.time} | ${p.plans
          .map((pl) => `${pl.label.ar}: ${pl.price} SAR`)
          .join(" ، ")}`,
    )
    .join("\n");

export const recommendProgram = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => RecommendInput.parse(input))
  .handler(async ({ data }): Promise<Recommendation> => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const runIdFetch = createLovableAiGatewayRunIdFetch();
    const lovable = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey: key,
      headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
      fetch: runIdFetch.fetch,
    });

    const result = streamText({
      model: lovable.responses("openai/gpt-6-astra"),
      output: Output.object({ schema: RecommendOutput }),
      system:
        "You are an academic advisor for Kristina Kidz Academy in Al Qatif, Saudi Arabia. " +
        "Choose the single best program for the child from the catalogue, using the child's age and interests. " +
        "programId and alternativeId MUST be ids from the catalogue (alternativeId may be null). " +
        `Write headline, why and tips in ${data.lang === "ar" ? "natural warm Modern Standard Arabic" : "warm natural English"}. ` +
        "why: 2-3 sentences. tips: exactly 3 short practical tips for the parent. Never invent prices or contact details.",
      prompt: `Catalogue:\n${catalogue()}\n\nChild age: ${data.age}\nInterests: ${data.interests}\nParent notes: ${data.notes ?? "-"}`,
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });

    return await result.output;
  });
