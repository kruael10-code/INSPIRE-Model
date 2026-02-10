import React, { useState } from 'react';
import { AppStep, UserProfile, AptitudeAnswers, AptitudeAnalysis, CareerDetail } from './types';
import InputForm from './components/InputForm';
import AptitudeDashboard from './components/AptitudeDashboard';
import CareerMatches from './components/CareerMatches';
import CareerDetailView from './components/CareerDetailView';
import LoadingScreen from './components/LoadingScreen';
import { analyzeUserAptitude, matchCareers } from './services/geminiService';
import { Compass, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.INPUT);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AptitudeAnalysis | null>(null);
  const [careerMatches, setCareerMatches] = useState<CareerDetail[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<CareerDetail | null>(null);

  // Phase 1 Handler: Analyze Aptitude
  const handleInputSubmit = async (profile: UserProfile, answers: AptitudeAnswers) => {
    setUserProfile(profile);
    setStep(AppStep.ANALYZING);
    
    // Call Gemini API for Analysis
    const analysis = await analyzeUserAptitude(profile, answers);
    setAnalysisResult(analysis);
    setStep(AppStep.DASHBOARD_APTITUDE);
  };

  // Phase 2 Handler: Match Careers
  const handleAptitudeConfirm = async () => {
    if (!analysisResult) return;
    
    setStep(AppStep.MATCHING);
    // Call Gemini API for Matching
    const matches = await matchCareers(analysisResult);
    setCareerMatches(matches);
    setStep(AppStep.DASHBOARD_CAREER);
  };

  // Phase 3 Handler: Show Detail
  const handleSelectCareer = (career: CareerDetail) => {
    setSelectedCareer(career);
    setStep(AppStep.CAREER_DETAIL);
  };

  const handleBackToMatches = () => {
    setSelectedCareer(null);
    setStep(AppStep.DASHBOARD_CAREER);
  };

  const handleReset = () => {
    setStep(AppStep.INPUT);
    setUserProfile(null);
    setAnalysisResult(null);
    setCareerMatches([]);
    setSelectedCareer(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-sans pb-10 selection:bg-pink-300 selection:text-pink-900">
      
      {/* Liquid Background Blobs */}
      <div className="fixed inset-0 overflow-hidden -z-10 bg-gradient-to-br from-indigo-50 via-white to-pink-50">
         {/* Top Left - Blue/Purple */}
         <motion.div 
            animate={{ 
              x: [0, 50, 0], 
              y: [0, -30, 0],
              scale: [1, 1.1, 1] 
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 blur-[80px] opacity-40 mix-blend-multiply"
         />
         
         {/* Bottom Right - Pink/Orange */}
         <motion.div 
            animate={{ 
              x: [0, -40, 0], 
              y: [0, 40, 0],
              scale: [1, 1.2, 1] 
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-r from-pink-300 to-rose-300 blur-[80px] opacity-40 mix-blend-multiply"
         />

         {/* Center/Top Right - Violet/Yellow */}
         <motion.div 
            animate={{ 
              x: [0, 30, 0], 
              y: [0, 30, 0],
              rotate: [0, 20, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-gradient-to-r from-violet-300 to-fuchsia-300 blur-[60px] opacity-40 mix-blend-multiply"
         />
         
         {/* Floating Small Orbs */}
         <motion.div 
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-16 h-16 bg-yellow-200 rounded-full blur-xl opacity-60"
         />
      </div>

      {/* Floating Glass Header */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <header className="glass-card rounded-full px-6 py-3 flex items-center justify-between gap-6 max-w-5xl w-full mx-auto transition-all duration-300 shadow-lg shadow-indigo-500/10">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={handleReset}>
            <div className="relative w-10 h-10 flex-shrink-0">
               <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-xl blur opacity-70 group-hover:opacity-100 transition-opacity"></div>
               <div className="relative w-full h-full bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                 <Compass size={22} className="group-hover:rotate-45 transition-transform duration-500" />
               </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg md:text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 leading-tight">
                โรงเรียนสานฝันปั้นดาว
              </span>
              <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase bg-gradient-to-r from-slate-400 to-slate-600 bg-clip-text text-transparent">
                INSPIRE Model
              </span>
            </div>
          </div>
          
          {userProfile && (
            <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-white/50 rounded-full border border-white/60 shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
              <span className="text-sm font-semibold text-slate-700">
                {userProfile.name}
              </span>
            </div>
          )}
        </header>
      </div>

      {/* Main Content */}
      <main className="pt-32 px-4 sm:px-6 relative z-10 pb-20">
        <div className="max-w-7xl mx-auto">
          {step === AppStep.INPUT && (
            <InputForm onSubmit={handleInputSubmit} />
          )}

          {step === AppStep.ANALYZING && (
            <LoadingScreen message="AI กำลังดำน้ำลึกเพื่อค้นหาตัวตนของคุณ..." />
          )}

          {step === AppStep.DASHBOARD_APTITUDE && userProfile && analysisResult && (
            <AptitudeDashboard 
              user={userProfile} 
              analysis={analysisResult} 
              onConfirm={handleAptitudeConfirm} 
            />
          )}

          {step === AppStep.MATCHING && (
            <LoadingScreen message="กำลังปรุงสูตรอาชีพที่กลมกล่อมที่สุด..." />
          )}

          {step === AppStep.DASHBOARD_CAREER && (
            <CareerMatches 
              careers={careerMatches} 
              onSelectCareer={handleSelectCareer} 
            />
          )}

          {step === AppStep.CAREER_DETAIL && selectedCareer && (
            <CareerDetailView 
              career={selectedCareer} 
              onBack={handleBackToMatches} 
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-4 left-0 right-0 z-0 pointer-events-none flex justify-center">
        <div className="glass-card px-4 py-1.5 rounded-full text-[10px] text-slate-500 font-medium shadow-sm inline-flex items-center gap-1.5">
          <Sparkles size={12} className="text-pink-500"/> กลุ่ม Triple S - Smart Leader รุ่นที่ 2
        </div>
      </footer>
    </div>
  );
};

export default App;