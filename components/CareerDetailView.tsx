import React from 'react';
import { CareerDetail } from '../types';
import { motion } from 'framer-motion';
import { ArrowLeft, GraduationCap, MonitorPlay, Book, Briefcase, CheckCircle, TrendingUp, DollarSign, ExternalLink, ChevronRight } from 'lucide-react';

interface CareerDetailViewProps {
  career: CareerDetail;
  onBack: () => void;
}

const CareerDetailView: React.FC<CareerDetailViewProps> = ({ career, onBack }) => {
  return (
    <div className="max-w-6xl mx-auto pb-20">
      <motion.button 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="group flex items-center text-slate-600 hover:text-blue-600 mb-8 transition-colors font-bold bg-white/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/60 shadow-sm hover:shadow-md hover:bg-white/60"
      >
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm mr-3 group-hover:bg-blue-50 transition-colors">
            <ArrowLeft size={18} strokeWidth={2.5} />
        </div>
        ย้อนกลับไปดูอาชีพอื่น
      </motion.button>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Hero Section */}
        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/10 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-violet-600 to-pink-500"></div>
          
          {/* Animated Background Shapes */}
          <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-white/10 rounded-full blur-[80px] mix-blend-overlay animate-pulse"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] bg-cyan-300/20 rounded-full blur-[60px] mix-blend-overlay"></div>
          
          <div className="relative p-8 md:p-12 text-white">
             <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center border border-white/30 shadow-inner">
                   <Briefcase size={48} className="text-white drop-shadow-md" />
                </div>
                <div className="flex flex-wrap gap-3">
                    <div className="px-5 py-2.5 bg-emerald-500/20 backdrop-blur-md text-emerald-100 text-sm font-bold rounded-2xl border border-emerald-400/30 flex items-center shadow-lg">
                        <TrendingUp size={18} className="mr-2 text-emerald-300"/> Match: {career.matchPercentage}%
                    </div>
                    <div className="px-5 py-2.5 bg-white/20 backdrop-blur-md text-white text-sm font-bold rounded-2xl border border-white/30 flex items-center shadow-lg">
                        <DollarSign size={18} className="mr-2 text-yellow-300"/> {career.salaryRange}
                    </div>
                </div>
             </div>
             
             <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-md">{career.title}</h1>
             <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-lg max-w-4xl">
                <p className="text-white/90 text-lg md:text-xl font-medium leading-relaxed">{career.description}</p>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Why This Career */}
            <div className="glass-card rounded-[2.5rem] p-8 hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-indigo-400">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                        <CheckCircle size={24} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">ทำไมถึงเหมาะกับคุณ?</h3>
                </div>
                
                <p className="text-slate-600 text-lg leading-relaxed mb-8 bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100/50 font-medium">
                    {career.reason}
                </p>
                
                <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-8 h-[2px] bg-slate-300"></span>
                        ทักษะที่ต้องมี
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {career.skillsRequired.map((skill, i) => (
                            <span key={i} className="px-4 py-2 bg-white text-slate-700 text-sm font-bold border border-slate-200 rounded-xl shadow-sm hover:scale-105 transition-transform cursor-default">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Educational Pathways */}
            <div className="glass-card rounded-[2.5rem] p-8 hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-orange-400">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shadow-sm">
                        <GraduationCap size={24} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">เส้นทางการศึกษา</h3>
                </div>

                <div className="space-y-4">
                    {career.studyPaths.map((path, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 hover:bg-orange-50 transition-colors border border-white/60 hover:border-orange-200 shadow-sm group">
                            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex-shrink-0 flex items-center justify-center text-sm font-bold shadow-inner group-hover:scale-110 transition-transform">
                                {idx + 1}
                            </div>
                            <span className="text-slate-700 font-bold text-lg">{path}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Online Courses / Resources */}
            <div className="glass-card rounded-[2.5rem] p-8 md:col-span-2 hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-blue-400 bg-gradient-to-b from-white/70 to-blue-50/30">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                        <MonitorPlay size={24} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">คอร์สเรียนแนะนำ <span className="text-slate-400 font-normal text-base ml-2">(ค้นหาเพิ่มเติม)</span></h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {career.onlineCourses.map((course, idx) => (
                        <a 
                            key={idx} 
                            href={`https://www.google.com/search?q=${encodeURIComponent(course + " course online")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col p-6 rounded-[2rem] bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                    <Book size={20} strokeWidth={2.5} />
                                </div>
                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                                   <ExternalLink size={14} strokeWidth={2.5} />
                                </div>
                            </div>
                            <h4 className="text-lg font-bold text-slate-700 group-hover:text-blue-700 transition-colors mb-2 line-clamp-2">
                                {course}
                            </h4>
                            <span className="text-sm font-semibold text-slate-400 mt-auto pt-2 flex items-center gap-1 group-hover:text-blue-500 transition-colors">
                                เริ่มค้นหา <ChevronRight size={14} strokeWidth={3} />
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CareerDetailView;