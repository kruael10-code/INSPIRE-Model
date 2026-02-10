import React, { useState } from 'react';
import { UserProfile, AptitudeAnswers } from '../types';
import { User, Brain, Heart, Briefcase, Zap, Target, BookOpen, Users, ChevronRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InputFormProps {
  onSubmit: (profile: UserProfile, answers: AptitudeAnswers) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [profile, setProfile] = useState<UserProfile>({ name: '', age: '', interest: '' });
  const [answers, setAnswers] = useState<AptitudeAnswers>({ q1: '', q2: '', q3: '', q4: '', q5: '' });
  const [step, setStep] = useState(1);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAnswerChange = (key: keyof AptitudeAnswers, value: string) => {
    setAnswers({ ...answers, [key]: value });
  };

  const isProfileValid = profile.name && profile.age && profile.interest;
  const isAnswersValid = Object.values(answers).every((a: string) => a.length > 0);

  const containerVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, type: "spring", bounce: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <div className="max-w-3xl mx-auto perspective-1000">
      {/* Progress Header */}
      <div className="mb-10 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block"
        >
          <div className="flex items-center gap-2 mb-4 bg-white/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/50 shadow-sm">
             <div className={`h-2.5 w-2.5 rounded-full ${step === 1 ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'bg-slate-300'}`}></div>
             <div className={`h-1 w-8 rounded-full ${step === 2 ? 'bg-gradient-to-r from-blue-400 to-purple-400' : 'bg-slate-200'}`}></div>
             <div className={`h-2.5 w-2.5 rounded-full ${step === 2 ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]' : 'bg-slate-300'}`}></div>
          </div>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-3 drop-shadow-sm">
          <span className="liquid-text">
             {step === 1 ? "เริ่มค้นหาตัวตนของคุณ" : "วัดระดับความถนัด"}
          </span>
        </h1>
        <p className="text-slate-600 max-w-lg mx-auto font-medium">
          {step === 1 ? "กรอกข้อมูลพื้นฐานเพื่อให้ AI รู้จักคุณมากขึ้น" : "ตอบคำถามสั้นๆ 5 ข้อเพื่อวิเคราะห์จุดแข็งของคุณ"}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="glass-card rounded-[2.5rem] p-8 md:p-12"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-100 to-cyan-100 flex items-center justify-center text-blue-600 shadow-inner">
                <User size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">ข้อมูลส่วนตัว</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-bold text-slate-600 mb-2 ml-2">ชื่อเล่น / ชื่อจริง</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleProfileChange}
                      className="glass-input w-full px-5 py-4 pl-12 rounded-2xl text-slate-800 font-medium placeholder:text-slate-400 outline-none transition-all duration-300"
                      placeholder="กรอกชื่อของคุณ"
                    />
                    <User className="absolute left-4 top-4.5 text-blue-400" size={20} />
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-sm font-bold text-slate-600 mb-2 ml-2">อายุ</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="age"
                      value={profile.age}
                      onChange={handleProfileChange}
                      className="glass-input w-full px-5 py-4 pl-12 rounded-2xl text-slate-800 font-medium placeholder:text-slate-400 outline-none transition-all duration-300"
                      placeholder="เช่น 18"
                    />
                    <Heart className="absolute left-4 top-4.5 text-rose-400" size={20} />
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-bold text-slate-600 mb-2 ml-2">งานอดิเรก / สิ่งที่สนใจ</label>
                <textarea
                  name="interest"
                  value={profile.interest}
                  onChange={handleProfileChange}
                  className="glass-input w-full px-5 py-4 rounded-2xl text-slate-800 font-medium placeholder:text-slate-400 outline-none transition-all duration-300 resize-none h-32"
                  placeholder="เช่น เล่นเกมวางแผน, วาดรูป, เขียนโค้ด, ปลูกต้นไม้"
                />
              </div>
            </div>

            <div className="mt-12 flex justify-end">
              <button
                onClick={() => isProfileValid && setStep(2)}
                disabled={!isProfileValid}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 ${
                  isProfileValid 
                    ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50' 
                    : 'bg-white/50 text-slate-400 cursor-not-allowed border border-white/60'
                }`}
              >
                ไปต่อเลย <ChevronRight size={22} strokeWidth={3} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="glass-card rounded-[2.5rem] p-8 md:p-12"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-100 to-fuchsia-100 flex items-center justify-center text-purple-600 shadow-inner">
                <Brain size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">แบบทดสอบความถนัด</h2>
            </div>
            
            <div className="space-y-6">
              {[
                { id: 'q1', icon: <Zap size={20} className="text-amber-500"/>, label: "เมื่อเจอปัญหาคุณมักจะ...", placeholder: "เช่น วิเคราะห์สาเหตุทีละจุด, ปรึกษาเพื่อน", color: "from-amber-100 to-orange-100" },
                { id: 'q2', icon: <Users size={20} className="text-blue-500"/>, label: "บทบาทของคุณในงานกลุ่มคือ?", placeholder: "เช่น เป็นผู้นำ, เป็นคนเก็บข้อมูล", color: "from-blue-100 to-cyan-100" },
                { id: 'q3', icon: <BookOpen size={20} className="text-green-500"/>, label: "คุณชอบเรียนรู้สิ่งใหม่ด้วยวิธีไหน?", placeholder: "เช่น ลงมือทำจริง, ดูวิดีโอ", color: "from-green-100 to-emerald-100" },
                { id: 'q4', icon: <Briefcase size={20} className="text-purple-500"/>, label: "สภาพแวดล้อมการทำงานในฝัน?", placeholder: "เช่น เงียบสงบ, ออฟฟิศที่สนุกสนาน", color: "from-purple-100 to-violet-100" },
                { id: 'q5', icon: <Target size={20} className="text-red-500"/>, label: "เป้าหมายสูงสุดในชีวิตการทำงาน?", placeholder: "เช่น สร้างการเปลี่ยนแปลงสังคม, รวย", color: "from-red-100 to-rose-100" },
              ].map((q, idx) => (
                <motion.div 
                  key={q.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-2 flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-lg bg-gradient-to-br ${q.color} flex items-center justify-center text-xs shadow-sm border border-white`}>{idx + 1}</span> {q.label}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={answers[q.id as keyof AptitudeAnswers]}
                      onChange={(e) => handleAnswerChange(q.id as keyof AptitudeAnswers, e.target.value)}
                      className="glass-input w-full px-5 py-4 pl-12 rounded-2xl text-slate-800 font-medium placeholder:text-slate-400 outline-none transition-all duration-300"
                      placeholder={q.placeholder}
                    />
                    <div className="absolute left-4 top-4.5 opacity-80 bg-white/50 rounded-md p-0.5">
                      {q.icon}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 flex justify-between items-center">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-slate-500 hover:text-blue-600 hover:bg-white/50 transition-colors"
              >
                <ArrowLeft size={20} strokeWidth={3} /> ย้อนกลับ
              </button>
              <button
                onClick={() => isAnswersValid && onSubmit(profile, answers)}
                disabled={!isAnswersValid}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 ${
                  isAnswersValid 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50' 
                    : 'bg-white/50 text-slate-400 cursor-not-allowed border border-white/60'
                }`}
              >
                วิเคราะห์ความถนัด <Brain size={22} strokeWidth={3} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InputForm;