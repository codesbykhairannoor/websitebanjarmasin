import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';

export default function AcilAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Halo sanak! Ulun Acil AI Banjar 🐵✨ Siap memandu pian menjelajahi kuliner legendaris, wisata susur sungai, rute BRT, atau sejarah 1526. Ada yang handak ditanyakan?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (customPrompt = null) => {
    const queryText = customPrompt || input;
    if (!queryText || !queryText.trim()) return;

    const userMessage = { sender: 'user', text: queryText };
    setMessages((prev) => [...prev, userMessage]);
    if (!customPrompt) setInput('');
    setIsLoading(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: '⚠️ API Key Gemini belum terdeteksi di file .env. Harap masukkan VITE_GEMINI_API_KEY Anda agar ulun bisa menjawab secara pintar! Untuk sementara, pian bisa langsung klik tombol WA Admin Manusia di bawah ya sanak.'
          }
        ]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `Kamu adalah 'Acil AI', asisten virtual wisata Kota Banjarmasin yang ramah, hangat, sopan, dan sangat tahu tentang Kota Seribu Sungai.
Gunakan sedikit sapaan khas Banjar seperti 'sanak' (saudara/teman), 'ulun' (saya), 'pian' (kamu/anda), atau kata 'baiman' (bersih dan nyaman).
Berikan jawaban yang ringkas, praktis, membantu, dan antusias. Fokus pada topik pariwisata, kuliner (Soto Banjar, Ketupat Kandangan), wisata sungai (Pasar Terapung Lok Baintan, Menara Pandang), rute bus BRT Banjarbakula, etika susur sungai, atau sejarah Kesultanan Banjar 1526.`;

      // Coba model terbaru gemini-2.5-flash terlebih dahulu, jika gagal fallback ke gemini-1.5-flash
      let responseText = '';
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: queryText,
          config: { systemInstruction }
        });
        responseText = response.text;
      } catch (errFirst) {
        console.warn("gemini-2.5-flash fallback:", errFirst);
        const responseFallback = await ai.models.generateContent({
          model: 'gemini-1.5-flash',
          contents: queryText,
          config: { systemInstruction }
        });
        responseText = responseFallback.text;
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: responseText }]);
    } catch (error) {
      console.error('Gemini AI Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Mohon maaf sanak, koneksi AI ulun sedang terkendala gangguan jaringan. Pian bisa langsung bertanya ke Admin Manusia melalui tombol WhatsApp di bawah ini ya! 🙏'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    'Rute bus BRT ke Pasar Terapung?',
    'Rekomendasi kuliner Soto Banjar enak?',
    'Aturan berpakaian ke Masjid Sultan Suriansyah?'
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-body">
      
      {/* Floating Widget Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 bg-gradient-to-r from-[#00A896] to-[#028090] hover:from-[#008075] hover:to-[#00A896] text-white px-5 py-3.5 rounded-full shadow-[0_10px_30px_rgba(0,168,150,0.5)] border-2 border-[#F4C038] transition-all hover:scale-105 active:scale-95"
          title="Tanya Acil AI - Asisten Wisata Live"
        >
          <span className="w-3 h-3 rounded-full bg-[#F4C038] animate-ping absolute -top-1 -right-1" />
          <span className="text-2xl animate-bounce">🐵</span>
          <div className="text-left">
            <span className="block text-[10px] font-black uppercase tracking-wider text-[#F4C038] font-heading leading-tight">AI Virtual Guide</span>
            <span className="block text-sm font-black font-heading leading-tight">Tanya Acil AI</span>
          </div>
        </button>
      )}

      {/* Chat Window Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="w-[340px] sm:w-[390px] h-[520px] rounded-[32px] bg-[var(--card-bg)] border-2 border-[#F4C038]/60 shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden text-[var(--text-main)]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#091422] to-[#1e293b] p-4 border-b border-[var(--glass-border)] flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-[#00A896] border border-[#F4C038] flex items-center justify-center text-xl shadow">🐵</span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-heading font-black text-sm text-white">Acil AI Banjar</h4>
                    <span className="bg-[#F4C038] text-[#091422] text-[9px] font-black px-1.5 py-0.5 rounded uppercase">Gemini</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Siaga 24 Jam
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm font-bold transition-colors"
                title="Tutup Jendela"
              >
                ✕
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 wadai-scroll text-xs">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#F4C038] text-[#091422] font-semibold rounded-br-none'
                        : 'bg-[var(--bg-main)]/80 border border-[var(--glass-border)] text-[var(--text-main)] rounded-bl-none font-body'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start">
                  <div className="bg-[var(--bg-main)]/80 border border-[var(--glass-border)] p-3 rounded-2xl rounded-bl-none flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <span className="w-2 h-2 rounded-full bg-[#00A896] animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-[#F4C038] animate-bounce delay-100" />
                    <span className="w-2 h-2 rounded-full bg-[#00A896] animate-bounce delay-200" />
                    <span className="ml-1 font-mono">Acil sedang berpikir...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions Pills */}
            <div className="px-3 py-2 bg-[var(--bg-main)]/50 border-t border-[var(--glass-border)] flex gap-1.5 overflow-x-auto wadai-scroll shrink-0">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-full bg-[var(--card-bg)] border border-[var(--glass-border)] hover:border-[#00A896] text-[10px] font-bold text-[var(--text-muted)] hover:text-[var(--text-main)] whitespace-nowrap transition-all shrink-0"
                >
                  💡 {q}
                </button>
              ))}
            </div>

            {/* Opsi Chat Manual WA Admin Manusia */}
            <div className="px-3 pt-2 pb-1 bg-[var(--bg-main)]/90 border-t border-[var(--glass-border)] shrink-0">
              <a
                href="https://wa.me/6281234567890?text=Halo%20Admin%20Banjarmasin%20Saku,%20ulun%20handak%20berkonsultasi%20wisata..."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 hover:border-emerald-500 flex items-center justify-center gap-2 text-xs font-heading font-black transition-all shadow-sm"
              >
                <span>💬</span> Hubungi WA Admin Manusia
              </a>
            </div>

            {/* Input Footer */}
            <div className="p-3 bg-[var(--bg-main)] border-t border-[var(--glass-border)] flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ketik pertanyaan ke Acil..."
                disabled={isLoading}
                className="flex-1 bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-xl px-3.5 py-2 text-xs text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#F4C038] transition-colors"
              >
              </input>
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="w-9 h-9 rounded-xl bg-[#00A896] hover:bg-[#008075] disabled:opacity-40 text-white flex items-center justify-center text-sm font-bold transition-all shadow shrink-0"
                title="Kirim Pesan"
              >
                ➔
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
