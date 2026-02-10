import React from 'react';
import { AptitudeAnalysis, UserProfile } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { CheckCircle, Award, UserCheck, Zap, Star } from 'lucide-react';

interface AptitudeDashboardProps {
  user: UserProfile;
  analysis: AptitudeAnalysis;
  onConfirm: () => void;
}

const AptitudeDashboard: React.FC<AptitudeDashboardProps> = ({ user, analysis, onConfirm }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2 mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-md text-blue-600 text-sm font-bold mb-2 border border-white/60 shadow-sm">
           <Star size={14} className="fill-blue-600" /> วิเคราะห์เสร็จแล้ว!
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800">
          ตัวตนที่แท้จริงของคุณ
        </h2>
        <p className="text-slate-600 text-lg font-medium">นี่คือผลลัพธ์จากการวิเคราะห์ {user.name}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Personality & Skills */}
        <div className="lg:col-span-7 space-y-6">
          {/* Personality Card - Liquid Gradient */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="relative rounded-[2.5rem] overflow-hidden p-1 shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400"></div>
             {/* Gloss overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-white/20"></div>
             
             <div className="relative bg-white/10 backdrop-blur-2xl rounded-[2.3rem] p-8 md:p-10 text-white h-full border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                    <UserCheck size={28} className="text-white" />
                  </div>
                  <h3 className="text-white/90 font-bold tracking-wide uppercase text-sm bg-white/10 px-3 py-1 rounded-lg">Personality Type</h3>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight drop-shadow-md">
                  {analysis.personalityType}
                </h2>
                
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-lg relative overflow-hidden">
                   <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
                   <p className="text-white text-lg leading-relaxed font-medium relative z-10">
                    "{analysis.summary}"
                  </p>
                </div>
             </div>
          </motion.div>

          {/* Top Skills Card */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="glass-card rounded-[2.5rem] p-8"
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-500">
                <Zap size={24} className="fill-amber-500"/> 
              </div>
              <span className="liquid-text">จุดเด่นของคุณ</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {analysis.topSkills.map((skill, index) => (
                <div key={index} className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white/50 border border-white/70 shadow-sm hover:shadow-lg hover:bg-white/80 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-200 to-teal-200 text-teal-700 flex items-center justify-center font-bold text-xl mb-3 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <span className="text-slate-700 font-bold text-center text-lg">{skill}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Radar Chart */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-5 glass-card rounded-[2.5rem] p-6 flex flex-col relative min-h-[500px]"
        >
          <div className="mb-4 px-4 pt-2">
             <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
               <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-500">
                 <Award size={24}/> 
               </div>
               สัดส่วนความสามารถ
             </h3>
          </div>
          
          <div className="flex-grow flex items-center justify-center relative -ml-4">
            {/* Background Chart Blob */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-purple-50 rounded-[2rem] m-4 -z-10 opacity-50"></div>

            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={analysis.radarData}>
                <PolarGrid stroke="#cbd5e1" strokeDasharray="4 4" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#475569', fontSize: 14, fontWeight: 700 }} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Score"
                  dataKey="A"
                  stroke="#8b5cf6"
                  strokeWidth={4}
                  fill="url(#radarGradient)"
                  fillOpacity={0.6}
                />
                <defs>
                  <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: '1px solid rgba(255,255,255,0.8)', 
                    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    padding: '12px 18px',
                    fontWeight: 'bold',
                    color: '#475569'
                  }}
                  itemStyle={{ color: '#7c3aed' }}
                  cursor={{ stroke: '#94a3b8', strokeWidth: 2 }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center pt-8"
      >
        <button
          onClick={onConfirm}
          className="group relative inline-flex items-center justify-center px-12 py-5 text-xl font-bold text-white transition-all duration-300 bg-slate-900 rounded-[2rem] hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-500/40 hover:-translate-y-2 focus:outline-none ring-4 ring-transparent hover:ring-slate-200"
        >
          <span className="relative z-10 flex items-center gap-3">
             ค้นหาอาชีพที่ใช่ <CheckCircle size={24} className="text-emerald-400" />
          </span>
          {/* Button Gloss */}
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
        </button>
      </motion.div>
    </div>
  );
};

export default AptitudeDashboard;