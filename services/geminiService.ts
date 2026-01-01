
import { GoogleGenAI, Type } from "@google/genai";
import { UserData, UserProfileType, BusinessIdea } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeFinancialProfile(userData: UserData) {
  if (!userData.transactions.length && !userData.debts.length) return null;

  const prompt = `
    Diagnóstico Financeiro Comportamental:
    Renda Mensal: R$ ${userData.monthlyIncome}
    Transações Recentes: ${JSON.stringify(userData.transactions.slice(-10))}
    Total de Dívidas: ${userData.debts.length} itens.
    
    Aja como um mentor financeiro sênior. Forneça um JSON com:
    - profileType: (Impulsivo, Equilibrado, Desorganizado, Estratégico ou Conservador)
    - limitedBeliefs: (3 strings)
    - empoweringBeliefs: (3 strings)
    - summary: (resumo acolhedor de até 250 caracteres)
    - potentialMonthlySavings: (valor numérico da economia sugerida)
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            profileType: { type: Type.STRING },
            limitedBeliefs: { type: Type.ARRAY, items: { type: Type.STRING } },
            empoweringBeliefs: { type: Type.ARRAY, items: { type: Type.STRING } },
            summary: { type: Type.STRING },
            potentialMonthlySavings: { type: Type.NUMBER }
          },
          required: ["profileType", "limitedBeliefs", "empoweringBeliefs", "summary", "potentialMonthlySavings"]
        }
      }
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Erro na análise comportamental:", error);
    return null;
  }
}

export async function generateBusinessIdeas(userData: UserData): Promise<BusinessIdea[]> {
  const prompt = `
    Sugestão de Renda Extra SaaS (Realidade Brasil):
    Perfil: ${userData.profileType || 'Não definido'}
    Renda Atual: R$ ${userData.monthlyIncome}
    
    Retorne um JSON (Array de 4 objetos):
    - title: Nome curto
    - category: (Digital, Físico ou Serviço)
    - difficulty: (Fácil, Médio ou Difícil)
    - initialInvestment: (string formatada em R$)
    - potentialReturn: (string formatada em R$)
    - steps: (Array de 3 strings acionáveis)
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              category: { type: Type.STRING },
              difficulty: { type: Type.STRING },
              initialInvestment: { type: Type.STRING },
              potentialReturn: { type: Type.STRING },
              steps: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["title", "category", "difficulty", "initialInvestment", "potentialReturn", "steps"]
          }
        }
      }
    });
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Erro ao gerar ideias de negócios:", error);
    return [];
  }
}
