import React from 'react';
import { CareerDetail } from '../types';
import { motion } from 'framer-motion';
import { Briefcase, DollarSign, ChevronRight, BarChart2, Star, TrendingUp } from 'lucide-react';

interface CareerMatchesProps {
  careers: CareerDetail[];
  onSelectCareer: (career: CareerDetail) => void;
}

const CareerMatches: React.FC<CareerMatchesProps> = ({ careers, onSelectCareer }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-10">
      <div className="text-center space-y-4 mb-12">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="w-20 h-20 bg-gradient-to-tr from-yellow-300 to-orange-400 rounded-3xl flex items-center justify-center text-white mx-auto shadow-lg shadow-orange-300/50 rotate-3 border-4 border-white/50 backdrop-blur-sm"
        >
           <Star size={40} fill="currentColor" className="drop-shadow-sm" />
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800">
          5 อาชีพ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600">Perfect Match</span>
        </h2>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
          นี่คือเส้นทางที่ AI คัดสรรมาแล้วว่า "ใช่" สำหรับคุณที่สุด
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {careers.map((career, index) => (
          <motion.div
            key={career.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", bounce: 0.3 }}
            className="group relative cursor-pointer perspective-1000"
            onClick={() => onSelectCareer(career)}
          >
            {/* Floating Glass Card */}
            <div className="relative glass-card rounded-[2.5rem] p-1 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-blue-200/50">
                
                {/* Content Container */}
                <div className="bg-white/40 backdrop-blur-md rounded-[2.3rem] p-6 md:p-8 h-full flex flex-col md:flex-row items-center gap-6 md:gap-10 border border-white/50">
                
                  {/* Match Percentage Liquid Gauge */}
                  <div className="flex-shrink-0 relative group-hover:scale-105 transition-transform duration-500">
                     <div className="w-28 h-28 rounded-full bg-white shadow-inner flex items-center justify-center relative overflow-hidden border-4 border-white">
                        <div 
                           className={`absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out ${career.matchPercentage > 85 ? 'bg-gradient-to-t from-emerald-400 to-teal-300' : 'bg-gradient-to-t from-blue-400 to-indigo-300'}`}
                           style={{ height: `${career.matchPercentage}%`, opacity: 0.2 }}
                        ></div>
                        
                        <svg className="w-full h-full transform -rotate-90 absolute top-0 left-0" viewBox="0 0 36 36">
                          <path
                            className="text-slate-100"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          />
                          <path
                            className={`${career.matchPercentage > 85 ? 'text-emerald-500' : 'text-blue-500'}`}
                            strokeDasharray={`${career.matchPercentage}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                           <span className={`text-3xl font-extrabold ${career.matchPercentage > 85 ? 'text-emerald-600' : 'text-blue-600'}`}>
                             {career.matchPercentage}%
                           </span>
                           <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Match</span>
                        </div>
                     </div>
                  </div>

                  {/* Info */}
                  <div className="flex-grow text-center md:text-left space-y-3">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start">
                       <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                          {career.title}
                       </h3>
                       {index === 0 && (
                         <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-200 to-yellow-200 text-yellow-800 text-xs font-bold rounded-full shadow-sm self-center md:self-auto">
                            <Star size={12} fill="currentColor"/> แนะนำสูงสุด
                         </span>
                       )}
                    </div>
                    
                    <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed">
                       {career.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
                       <span className="inline-flex items-center text-sm font-bold text-slate-600 bg-white/60 px-4 py-2 rounded-xl border border-white/60 shadow-sm">
                         <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2 text-green-600"><DollarSign size={12} strokeWidth={3}/></div> {career.salaryRange}
                       </span>
                       <span className="inline-flex items-center text-sm font-bold text-slate-600 bg-white/60 px-4 py-2 rounded-xl border border-white/60 shadow-sm">
                         <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-blue-600"><TrendingUp size={12} strokeWidth={3}/></div> {career.reason.substring(0, 40)}...
                       </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                     <button className="w-16 h-16 rounded-full bg-white text-slate-300 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-violet-500 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:shadow-blue-500/40 group-hover:scale-110">
                        <ChevronRight size={32} strokeWidth={3} />
                     </button>
                  </div>
                </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CareerMatches;