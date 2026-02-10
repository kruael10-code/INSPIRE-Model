export interface UserProfile {
  name: string;
  age: string;
  interest: string;
}

export interface AptitudeAnswers {
  q1: string; // การแก้ปัญหา
  q2: string; // การทำงานเป็นทีม
  q3: string; // การเรียนรู้
  q4: string; // สภาพแวดล้อมที่ชอบ
  q5: string; // เป้าหมายสูงสุด
}

export interface SkillScore {
  subject: string;
  A: number; // Score out of 100
  fullMark: number;
}

export interface AptitudeAnalysis {
  personalityType: string;
  summary: string;
  topSkills: string[];
  radarData: SkillScore[];
}

export interface CareerMatch {
  id: string;
  title: string;
  matchPercentage: number;
  description: string;
  salaryRange: string;
  reason: string;
}

export interface CareerDetail extends CareerMatch {
  studyPaths: string[];
  skillsRequired: string[];
  onlineCourses: string[];
}

export enum AppStep {
  INPUT = 'INPUT',
  ANALYZING = 'ANALYZING',
  DASHBOARD_APTITUDE = 'DASHBOARD_APTITUDE',
  MATCHING = 'MATCHING',
  DASHBOARD_CAREER = 'DASHBOARD_CAREER',
  CAREER_DETAIL = 'CAREER_DETAIL',
}