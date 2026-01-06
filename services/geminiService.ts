
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export const getCareerGuidanceStream = async (userQuery: string, onChunk: (chunk: string) => void) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const systemInstruction = `
    You are the '2026 Career Architect' for TechSkyline IT Solutions. 
    Your goal is to provide a COMPLETE ROADMAP for tech careers, emphasizing the transition from learner to production-ready engineer.
    
    When asked for guidance, always follow this structure:
    1. 🎯 **Executive Summary**: A high-level overview.
    2. 🗺️ **The 2026 Roadmap**:
       - **Phase 1: Foundation (The Sandbox)**: Focus on local dev and experimentation.
       - **Phase 2: Integration (The Staging Area)**: Focus on UAT, Peer Reviews, and CI/CD.
       - **Phase 3: Production (Live Access)**: Focus on SRE, Scalability, and Production Maintenance.
    3. 🛠️ **The Tech Stack**: List critical tools with format: [SKILL: Skill Name]
    4. 🔐 **Environment Access**: Mention which tier (Sandbox/Staging/Live) this role typically manages.
    5. 💼 **Career Outcome**: Expected roles and market demand in 2026.
    
    Use bold headers, bullet points, and clear spacing.
    TechSkyline IT Solutions internships are designed to move students through these environment tiers.
  `;

  try {
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3-pro-preview',
      contents: userQuery,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        thinkingConfig: { thinkingBudget: 4000 }
      },
    });

    for await (const chunk of responseStream) {
      const text = (chunk as GenerateContentResponse).text;
      if (text) onChunk(text);
    }
  } catch (error) {
    console.error("Gemini Guidance Error:", error);
    onChunk("The Career Architect is currently calculating global trends. Please try again or reach out to Abhinav Joseph.");
  }
};
