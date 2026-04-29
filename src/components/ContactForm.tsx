import { motion } from 'framer-motion';
import { Phone, MapPin, Send, MessageCircle } from 'lucide-react';

export default function ContactForm() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 md:pt-40 pb-20 px-4 md:px-6">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* --- LEFT SIDE: INFORMATION --- */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1"
        >
          <div className="flex items-center gap-2 mb-6 bg-blue-50 w-fit px-4 py-2 rounded-full border border-blue-100">
            <MessageCircle size={14} className="text-blue-600" />
            <span className="text-blue-600 font-bold uppercase tracking-[0.3em] text-[9px]">Get in Touch</span>
          </div>
          
          {/* Responsive Typography: 4xl on mobile, 6rem on desktop */}
          <h1 className="text-4xl md:text-6xl lg:text-[6rem] font-[900] text-slate-900 leading-[0.9] md:leading-[0.85] tracking-tighter mb-8 md:mb-12 uppercase italic">
            Let's <br/><span className="text-blue-600">Connect.</span>
          </h1>
          
          <div className="space-y-4 md:space-y-8">
            {/* Info Card 1 */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6 p-6 md:p-8 bg-white rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-sm group hover:shadow-xl transition-all">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100 shrink-0">
                <Phone size={24} className="md:w-7 md:h-7" />
              </div>
              <div>
                <p className="text-slate-400 font-black uppercase text-[8px] md:text-[10px] tracking-widest mb-1">Emergency Line</p>
                <p className="text-xl md:text-2xl text-slate-900 font-[900] tracking-tighter">(0261) 2492411</p>
              </div>
            </div>

            {/* Info Card 2 */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6 p-6 md:p-8 bg-white rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-sm group hover:shadow-xl transition-all">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                <MapPin size={24} className="md:w-7 md:h-7" />
              </div>
              <div>
                <p className="text-slate-400 font-black uppercase text-[8px] md:text-[10px] tracking-widest mb-1">Our Hub</p>
                <p className="text-lg md:text-xl text-slate-900 font-[900] tracking-tighter uppercase">Lal Darwaja & Majura Gate, Surat</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT SIDE: FORM --- */}
        <motion.form 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="order-1 lg:order-2 bg-white p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-slate-100 shadow-[0_40px_100px_rgba(0,0,0,0.04)] space-y-4 md:space-y-6"
        >
          <div className="space-y-4">
            <div>
              <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-2 block">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="w-full bg-slate-50 border border-slate-100 p-5 md:p-6 rounded-2xl md:rounded-3xl text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-all font-medium text-sm md:text-base" 
              />
            </div>

            <div>
              <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-2 block">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                className="w-full bg-slate-50 border border-slate-100 p-5 md:p-6 rounded-2xl md:rounded-3xl text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-all font-medium text-sm md:text-base" 
              />
            </div>

            <div>
              <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-2 block">Message</label>
              <textarea 
                rows={4} 
                placeholder="How can we help?" 
                className="w-full bg-slate-50 border border-slate-100 p-5 md:p-6 rounded-2xl md:rounded-3xl text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-all font-medium text-sm md:text-base"
              ></textarea>
            </div>
          </div>

          <button className="w-full bg-slate-900 text-white p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] font-black text-[10px] md:text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
            Send Message <Send size={16}/>
          </button>
        </motion.form>
      </div>
    </div>
  );
}