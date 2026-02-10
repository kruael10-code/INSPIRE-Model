import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserProfile, AptitudeAnswers, AptitudeAnalysis, CareerDetail } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelName = "gemini-3-flash-preview";

// Schema for Aptitude Analysis
const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    personalityType: { type: Type.STRING, description: "A creative name for their personality type in Thai" },
    summary: { type: Type.STRING, description: "A 2-3 sentence summary of their strengths in Thai" },
    topSkills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of top 3 soft/hard skills",
    },
    radarData: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          subject: { type: Type.STRING, description: "Skill category (e.g., Logic, Creativity, Social, Tech)" },
          A: { type: Type.NUMBER, description: "Score from 0 to 100" },
          fullMark: { type: Type.NUMBER, description: "Always 100" },
        },
        required: ["subject", "A", "fullMark"],
      },
      description: "Data for 5-6 axes radar chart",
    },
  },
  required: ["personalityType", "summary", "topSkills", "radarData"],
};

// Schema for Career Matching
const careerSchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING },
      title: { type: Type.STRING, description: "Job title in Thai" },
      matchPercentage: { type: Type.NUMBER, description: "Match percentage 0-100" },
      description: { type: Type.STRING, description: "Short description of the job in Thai" },
      salaryRange: { type: Type.STRING, description: "Estimated monthly salary in THB" },
      reason: { type: Type.STRING, description: "Why this fits the user" },
      studyPaths: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Faculties or majors to study",
      },
      skillsRequired: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
      onlineCourses: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Types of courses or keywords to search for learning",
      },
    },
    required: ["id", "title", "matchPercentage", "description", "salaryRange", "reason", "studyPaths", "skillsRequired", "onlineCourses"],
  },
};

export const analyzeUserAptitude = async (
  profile: UserProfile,
  answers: AptitudeAnswers
): Promise<AptitudeAnalysis> => {
  const prompt = `
    Analyze this user based on their profile and aptitude test answers.
    Language: Thai (TH).
    
    Profile:
    Name: ${profile.name}, Age: ${profile.age}, Interest: ${profile.interest}
    
    Answers:
    1. Problem Solving: ${answers.q1}
    2. Teamwork: ${answers.q2}
    3. Learning Style: ${answers.q3}
    4. Preferred Environment: ${answers.q4}
    5. Ultimate Goal: ${answers.q5}
    
    Provide a psychological analysis, identifying their personality type, key strengths, and score them on 5-6 dimensions (e.g., Analytical, Creative, Social, Leadership, Technical, Resilience) for a radar chart.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as AptitudeAnalysis;
  } catch (error) {
    console.error("Analysis Error:", error);
    // Fallback mock data if AI fails
    return {
      personalityType: "นักคิดวิเคราะห์ผู้สร้างสรรค์ (Mock)",
      summary: "เกิดข้อผิดพลาดในการเชื่อมต่อ AI แต่โดยรวมคุณเป็นคนที่มีความคิดสร้างสรรค์และชอบแก้ปัญหา",
      topSkills: ["Critical Thinking", "Creativity", "Problem Solving"],
      radarData: [
        { subject: "Analytical", A: 80, fullMark: 100 },
        { subject: "Creative", A: 70, fullMark: 100 },
        { subject: "Social", A: 50, fullMark: 100 },
        { subject: "Tech", A: 60, fullMark: 100 },
        { subject: "Leadership", A: 40, fullMark: 100 },
      ],
    };
  }
};

export const matchCareers = async (
  analysis: AptitudeAnalysis
): Promise<CareerDetail[]> => {
  const prompt = `
    Based on this user analysis: ${JSON.stringify(analysis)}
    
    Suggest 5 future careers that match their profile.
    Language: Thai (TH).
    
    For each career, provide:
    - Match percentage based on their skills.
    - Specific university faculties or majors for "studyPaths".
    - Keywords for online courses for "onlineCourses".
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: careerSchema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as CareerDetail[];
  } catch (error) {
    console.error("Matching Error:", error);
    return [];
  }
};