
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export const getCareerGuidanceStream = async (userQuery: string, onChunk: (chunk: string) => void) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const systemInstruction = `
    You are the '2026 Career Architect' for TechSkyline IT Solutions. 
    Your goal is to provide a COMPLETE ROADMAP for tech careers.
    
    When asked for guidance, always follow this structure:
    1. 🎯 **Executive Summary**: A high-level overview of the path.
    2. 🗺️ **The 2026 Roadmap**:
       - **Phase 1: Foundation (Months 0-2)**: Core skills and prerequisites.
       - **Phase 2: Deep Specialization (Months 3-5)**: Advanced frameworks and tools.
       - **Phase 3: Industry Integration (Months 6+)**: Projects, certifications, and portfolio building.
    3. 🛠️ **The Tech Stack**: List critical tools with format: [SKILL: Skill Name]
    4. 💼 **Career Outcome**: Expected roles and market demand in 2026.
    
    Use bold headers, bullet points, and clear spacing.
    TechSkyline IT Solutions internships are designed exactly around these phases.
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
