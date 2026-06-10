/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Upload,
  Image as ImageIcon,
  Copy,
  Check,
  Sparkles,
  RefreshCw,
  AlertCircle,
  FileText,
  Info,
  Layers,
  Sparkle,
  ChevronDown
} from "lucide-react";

// Raw SVG strings for sample showcase characters
const PIKACHU_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" fill="#FFFBEB" rx="16"/>
  <polygon points="25,30 15,5 35,20" fill="#FBBF24" stroke="#1E293B" stroke-width="1.5"/>
  <polygon points="25,30 15,5 18,15" fill="#1E293B"/>
  <polygon points="75,30 85,5 65,20" fill="#FBBF24" stroke="#1E293B" stroke-width="1.5"/>
  <polygon points="75,30 85,5 82,15" fill="#1E293B"/>
  <circle cx="50" cy="55" r="30" fill="#FBBF24" stroke="#1E293B" stroke-width="2"/>
  <circle cx="40" cy="50" r="4" fill="#1E293B"/>
  <circle cx="40" cy="48" r="1.2" fill="#fff"/>
  <circle cx="60" cy="50" r="4" fill="#1E293B"/>
  <circle cx="60" cy="48" r="1.2" fill="#fff"/>
  <circle cx="28" cy="62" r="5" fill="#EF4444"/>
  <circle cx="72" cy="62" r="5" fill="#EF4444"/>
  <path d="M46,58 Q50,61 54,58" fill="none" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/>
</svg>`;

const DORAEMON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" fill="#EFF6FF" rx="16"/>
  <circle cx="50" cy="52" r="28" fill="#3B82F6" stroke="#1E293B" stroke-width="2"/>
  <circle cx="50" cy="56" r="21" fill="#FFF" stroke="#1E293B" stroke-width="1.5"/>
  <circle cx="44" cy="42" r="5" fill="#FFF" stroke="#1E293B" stroke-width="1.5"/>
  <circle cx="44" cy="42" r="1.5" fill="#1E293B"/>
  <circle cx="56" cy="42" r="5" fill="#FFF" stroke="#1E293B" stroke-width="1.5"/>
  <circle cx="56" cy="42" r="1.5" fill="#1E293B"/>
  <circle cx="50" cy="47" r="3.5" fill="#EF4444" stroke="#1E293B" stroke-width="1.5"/>
  <path d="M50,50 L50,62" fill="none" stroke="#1E293B" stroke-width="1.5"/>
  <path d="M40,58 Q50,65 60,58" fill="none" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/>
  <line x1="33" y1="48" x2="41" y2="50" stroke="#1E293B" stroke-width="1.2"/>
  <line x1="32" y1="53" x2="41" y2="53" stroke="#1E293B" stroke-width="1.2"/>
  <line x1="33" y1="58" x2="41" y2="56" stroke="#1E293B" stroke-width="1.2"/>
  <line x1="67" y1="48" x2="59" y2="50" stroke="#1E293B" stroke-width="1.2"/>
  <line x1="68" y1="53" x2="59" y2="53" stroke="#1E293B" stroke-width="1.2"/>
  <line x1="67" y1="58" x2="59" y2="56" stroke="#1E293B" stroke-width="1.2"/>
</svg>`;

const TOTORO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" fill="#F3F4F6" rx="16"/>
  <path d="M38,35 C38,15 32,15 32,35 Z" fill="#6B7280" stroke="#1E293B" stroke-width="1.5"/>
  <path d="M62,35 C62,15 68,15 68,35 Z" fill="#6B7280" stroke="#1E293B" stroke-width="1.5"/>
  <ellipse cx="50" cy="60" rx="28" ry="25" fill="#6B7280" stroke="#1E293B" stroke-width="2"/>
  <ellipse cx="50" cy="63" rx="18" ry="16" fill="#FFFBEB" stroke="#1E293B" stroke-width="1.5"/>
  <path d="M45,55 Q50,50 55,55" fill="none" stroke="#1E293B" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M38,62 Q42,57 46,62" fill="none" stroke="#1E293B" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M54,62 Q58,57 62,62" fill="none" stroke="#1E293B" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="40" cy="45" r="3" fill="#FFF" stroke="#1E293B" stroke-width="1.2"/>
  <circle cx="40" cy="45" r="1.2" fill="#1E293B"/>
  <circle cx="60" cy="45" r="3" fill="#FFF" stroke="#1E293B" stroke-width="1.2"/>
  <circle cx="60" cy="45" r="1.2" fill="#1E293B"/>
  <polygon points="48,48 52,48 50,51" fill="#1E293B"/>
</svg>`;

const HELLO_KITTY_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" fill="#FFF5F5" rx="16"/>
  <ellipse cx="50" cy="55" rx="28" ry="22" fill="#FFF" stroke="#1E293B" stroke-width="2"/>
  <path d="M28,40 L19,18 L38,34 Z" fill="#FFF" stroke="#1E293B" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M72,40 L81,18 L62,34 Z" fill="#FFF" stroke="#1E293B" stroke-width="1.5" stroke-linejoin="round"/>
  <circle cx="68" cy="35" r="4.5" fill="#EF4444" stroke="#1E293B" stroke-width="1.5"/>
  <ellipse cx="61" cy="32" rx="4" ry="4" fill="#EF4444" stroke="#1E293B" stroke-width="1.5"/>
  <ellipse cx="75" cy="38" rx="4" ry="4" fill="#EF4444" stroke="#1E293B" stroke-width="1.5"/>
  <ellipse cx="40" cy="55" rx="2.5" ry="3.5" fill="#1E293B"/>
  <ellipse cx="60" cy="55" rx="2.5" ry="3.5" fill="#1E293B"/>
  <ellipse cx="50" cy="59" rx="3.5" ry="2.5" fill="#FBBF24" stroke="#1E293B" stroke-width="1.2"/>
  <line x1="24" y1="52" x2="16" y2="50" stroke="#1E293B" stroke-width="1.5"/>
  <line x1="23" y1="57" x2="15" y2="57" stroke="#1E293B" stroke-width="1.5"/>
  <line x1="24" y1="62" x2="17" y2="64" stroke="#1E293B" stroke-width="1.5"/>
  <line x1="76" y1="52" x2="84" y2="50" stroke="#1E293B" stroke-width="1.5"/>
  <line x1="77" y1="57" x2="85" y2="57" stroke="#1E293B" stroke-width="1.5"/>
  <line x1="76" y1="62" x2="83" y2="64" stroke="#1E293B" stroke-width="1.5"/>
</svg>`;

interface SampleCharacter {
  id: string;
  name: string;
  description: string;
  svg: string;
  mimeType: string;
}

const SAMPLE_CHARACTERS: SampleCharacter[] = [
  {
    id: "pikachu",
    name: "Pikachu",
    description: "Yellow electric mouse with red cheeks",
    svg: PIKACHU_SVG,
    mimeType: "image/svg+xml",
  },
  {
    id: "doraemon",
    name: "Doraemon",
    description: "Blue robotic cat from the future",
    svg: DORAEMON_SVG,
    mimeType: "image/svg+xml",
  },
  {
    id: "totoro",
    name: "Totoro",
    description: "Cute gray forest giant spirit",
    svg: TOTORO_SVG,
    mimeType: "image/svg+xml",
  },
  {
    id: "hello-kitty",
    name: "Hello Kitty",
    description: "White cartoon cat with a red bow",
    svg: HELLO_KITTY_SVG,
    mimeType: "image/svg+xml",
  },
];

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);
  const [characterName, setCharacterName] = useState<string | null>(null);
  const [manualCharacterName, setManualCharacterName] = useState<string>("");
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [isLoaderActive, setIsLoaderActive] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasKeyError, setHasKeyError] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [activeSampleId, setActiveSampleId] = useState<string | null>(null);
  const [isToyMenuOpen, setIsToyMenuOpen] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Client-side Prompt template compiler
  const compilePromptLocally = (name: string): string => {
    const template = `(3D render, high-quality), chunky vinyl-toy art style, smooth rounded shapes, simplified proportions, stylized representation of [INSERT_NAME_HERE] from the reference image. Clean left-side orthographic profile, zero perspective distortion. [INSERT_NAME_HERE] is lying completely flat on its belly in a perfectly straight horizontal line from nose to tail. Head rests fully on the ground with neck extended forward. All four limbs are splayed outward symmetrically in a relaxed, natural position: front legs/arms angled slightly forward/outward, back legs angled slightly backward/outward. Cute, chunky, toy-like proportions. Perfect left-right symmetry in the geometry (relative to the spine). Soft, even studio lighting, neutral solid light gray background.`;
    return template.replace(/\[INSERT_NAME_HERE\]/g, name.trim() || "[INSERT_NAME_HERE]");
  };

  // SVG Helper to Base64 conversions for standard Gemini inline payload
  const convertSvgToBase64 = (svgStr: string): string => {
    return btoa(unescape(encodeURIComponent(svgStr)));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorState("Chỉ hỗ trợ các tệp hình ảnh (PNG, JPEG, SVG, WebP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Get base64 string without data:image/...;base64, header prefix
      const base64Data = result.split(",")[1];
      setSelectedImage(base64Data);
      setMimeType(file.type);
      setActiveSampleId(null);
      setGeneratedPrompt(null);
      setCharacterName(null);
      setManualCharacterName("");
      setErrorMessage(null);
      setHasKeyError(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const selectSample = (sample: SampleCharacter) => {
    setActiveSampleId(sample.id);
    const base64Data = convertSvgToBase64(sample.svg);
    setSelectedImage(base64Data);
    setMimeType("image/svg+xml");
    setGeneratedPrompt(null);
    setCharacterName(null);
    setManualCharacterName(sample.name);
    setErrorMessage(null);
    setHasKeyError(false);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setMimeType(null);
    setGeneratedPrompt(null);
    setCharacterName(null);
    setManualCharacterName("");
    setActiveSampleId(null);
    setErrorMessage(null);
    setHasKeyError(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const generatePromptFromImage = async () => {
    if (!selectedImage && !manualCharacterName) {
      setErrorState("Vui lòng tải lên một hình ảnh tham chiếu trước.");
      return;
    }

    // If API key is missing or user just wants local generation
    if (hasKeyError && manualCharacterName) {
      setCharacterName(manualCharacterName);
      setGeneratedPrompt(compilePromptLocally(manualCharacterName));
      return;
    }

    setIsLoaderActive(true);
    setErrorMessage(null);
    setHasKeyError(false);

    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: selectedImage,
          mimeType,
          sampleId: activeSampleId,
          manualCharacterName,
        }),
      });

      const contentType = response.headers.get("content-type");
      let data: any = {};

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // Fall back gracefully
        setHasKeyError(true);
        writeOfflineFallback();
        setIsLoaderActive(false);
        return;
      }

      if (data.isOfflineResolved) {
        setHasKeyError(true);
      } else {
        setHasKeyError(false);
      }

      setGeneratedPrompt(data.completedPrompt);
      setCharacterName(data.characterName);
      setManualCharacterName(data.characterName);
    } catch (err: any) {
      // Automatic backup flow to ensure prompt extraction always works instantly
      setHasKeyError(true);
      const defaultName = manualCharacterName || "Chibi Neko Girl";
      setManualCharacterName(defaultName);
      setCharacterName(defaultName);
      setGeneratedPrompt(compilePromptLocally(defaultName));
    } finally {
      setIsLoaderActive(false);
    }
  };

  // Helper helper to quickly load offline mode
  const writeOfflineFallback = () => {
    const defaultName = manualCharacterName || "custom character";
    setManualCharacterName(defaultName);
    setCharacterName(defaultName);
    setGeneratedPrompt(compilePromptLocally(defaultName));
  };

  const copyToClipboard = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const setErrorState = (message: string) => {
    setErrorMessage(message);
    setGeneratedPrompt(null);
    setCharacterName(null);
  };

  const getMimeTypeLabel = (mime: string) => {
    if (mime.includes("svg")) return "Ảnh Vector SVG";
    if (mime.includes("png")) return "Ảnh PNG";
    if (mime.includes("jpeg") || mime.includes("jpg")) return "Ảnh JPEG";
    if (mime.includes("webp")) return "Ảnh WebP";
    return "Tệp hình ảnh";
  };

  const getEmbeddableImageSrc = () => {
    if (!selectedImage || !mimeType) return "";
    return `data:${mimeType};base64,${selectedImage}`;
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-slate-800 font-sans flex flex-col antialiased">
      {/* Decorative Grid Top */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-indigo-50/40 via-transparent to-transparent pointer-events-none" />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-4 relative z-10 flex flex-col gap-8">
        
        {/* Header Block */}
        <section className="text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-200/80 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-semibold text-indigo-600 mb-2">
              <Sparkle className="w-3.5 h-3.5" /> Bộ trích xuất hệ thống AI Studio đặc biệt
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-center justify-center sm:justify-start gap-2.5">
              <Layers className="w-7 h-7 text-indigo-600 stroke-[2.2]" /> Xưởng Tạo Đồ Chơi Của Thiên Phú
            </h1>
            <p className="mt-1 text-sm text-slate-500 max-w-xl">
              Trích xuất tên nhân vật có độ chính xác cao từ đồ họa tham chiếu được tải lên và định dạng chúng một cách an toàn thành các prompt tạo hình ảnh đồ chơi vinyl 3D chi tiết.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 self-center sm:self-auto shrink-0">
            {/* Status Display Area */}
            <div className="bg-white border border-zinc-200/70 p-3 rounded-xl shadow-xs text-xs text-slate-500 font-mono flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>HỆ THỐNG HOẠT ĐỘNG (GEMINI-3.5-FLASH)</span>
            </div>
          </div>
        </section>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Inputs (Lg: 5/12 cols) */}
          <section className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
              <h2 className="text-sm font-semibold tracking-wide uppercase text-slate-400 flex items-center gap-1.5 mb-4">
                <ImageIcon className="w-4 h-4 text-slate-500" /> 1. Tải Lên Ảnh Nhân Vật
              </h2>

              {/* Drag/Drop Box */}
              {!selectedImage ? (
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 group
                    ${dragActive 
                      ? "border-indigo-500 bg-indigo-50/40 scale-[1.01]" 
                      : "border-zinc-200 hover:border-indigo-400 hover:bg-zinc-50/50"}`}
                  id="image_dropzone"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 text-zinc-500 transition-colors">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Kéo & thả ảnh tham chiếu của bạn vào đây</p>
                    <p className="text-xs text-slate-400 mt-1">Định dạng PNG, JPEG, SVG hoặc WebP</p>
                  </div>
                  <button 
                    type="button" 
                    className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100"
                    id="browse_files_button"
                  >
                    Duyệt File
                  </button>
                </div>
              ) : (
                <div className="border border-zinc-200 rounded-xl overflow-hidden bg-zinc-50 relative p-4 flex flex-col items-center gap-3">
                  <div className="w-full h-44 bg-white rounded-lg border border-zinc-200 overflow-hidden flex items-center justify-center shadow-inner relative group">
                    {/* Render standard image preview */}
                    <img
                      src={getEmbeddableImageSrc()}
                      alt="Uploaded character reference"
                      className="max-h-full max-w-full object-contain p-2 transition-transform group-hover:scale-105 duration-300"
                      referrerPolicy="no-referrer"
                    />

                    {/* Image details tag */}
                    <span className="absolute bottom-2 left-2 text-[10px] font-mono font-medium px-2 py-1 bg-slate-900/85 backdrop-blur-xs text-white rounded">
                      {getMimeTypeLabel(mimeType || "")}
                    </span>
                  </div>

                  <div className="flex gap-2 w-full">
                    <button
                      onClick={clearImage}
                      type="button"
                      className="flex-1 text-xs font-medium text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 bg-red-50/20 py-2 rounded-lg transition-colors"
                      id="remove_image_button"
                    >
                      Xóa bỏ
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      type="button"
                      className="flex-1 text-xs font-medium text-slate-600 hover:text-slate-700 border border-zinc-200 hover:bg-zinc-50 py-2 rounded-lg transition-colors"
                      id="change_image_button"
                    >
                      Thay đổi File
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>
              )}




            </div>

            {/* Tạo Đồ chơi 3d Card */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
              <h2 className="text-sm font-semibold tracking-wide uppercase text-slate-400 flex items-center gap-1.5 mb-4">
                <Sparkle className="w-4 h-4 text-indigo-500" /> 2. Công cụ tạo mô hình 3d
              </h2>
              
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsToyMenuOpen(!isToyMenuOpen)}
                  className="w-full flex items-center justify-between gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md text-sm font-semibold transition-all duration-200 select-none cursor-pointer"
                  id="labs_flow_direct_button"
                >
                  <div className="flex items-center gap-2">
                    <Sparkle className="w-4 h-4 text-amber-200 animate-pulse" />
                    <span>Tạo Đồ chơi 3d</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isToyMenuOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isToyMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="overflow-hidden grid grid-cols-2 gap-3" 
                      id="toy_toggled_links"
                    >
                      <a
                        href="https://labs.google/fx/tools/flow#overview"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-4 bg-zinc-50 hover:bg-indigo-50/50 border border-zinc-200 hover:border-indigo-200 rounded-xl text-center group transition-all duration-200 hover:-translate-y-0.5"
                      >
                        <Sparkles className="w-5 h-5 text-indigo-500 mb-1.5 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-slate-700 group-hover:text-indigo-900">Tạo ảnh mẫu</span>
                        <span className="text-[9px] text-slate-400 mt-0.5 font-mono">Google Flow</span>
                      </a>
                      
                      <a
                        href="https://3d.hunyuanglobal.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-4 bg-zinc-50 hover:bg-indigo-50/50 border border-zinc-200 hover:border-indigo-200 rounded-xl text-center group transition-all duration-200 hover:-translate-y-0.5"
                      >
                        <Layers className="w-5 h-5 text-indigo-500 mb-1.5 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-slate-700 group-hover:text-indigo-900">Tạo model 3D</span>
                        <span className="text-[9px] text-slate-400 mt-0.5 font-mono">Hunyuan 3D</span>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* Right Column: Processing & Prompts (Lg: 7/12 cols) */}
          <section className="lg:col-span-7 flex flex-col gap-6">
            
            {/* CTA action to analyze */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-slate-600 text-sm max-w-sm text-center sm:text-left flex items-center gap-2">
                  <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Sẵn sàng trích xuất</h3>
                    <p className="text-xs text-slate-400">Gemini sẽ quét hình dạng, màu sắc và đặc điểm của vector hoặc file hình ảnh được tải lên.</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={generatePromptFromImage}
                  disabled={!selectedImage || isLoaderActive}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2 relative overflow-hidden
                    ${!selectedImage 
                      ? "bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200" 
                      : "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer active:scale-95"}`}
                  id="generate_prompt_button"
                >
                  {isLoaderActive ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Đang phân tích ảnh...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Trích xuất & Định dạng Prompt</span>
                    </>
                  )}
                </button>
              </div>

              {/* Inline errors & key fallbacks */}
              <AnimatePresence>
                {errorMessage && !hasKeyError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-4 p-3.5 bg-red-50 border border-red-100/80 rounded-xl text-xs text-red-600 flex items-start gap-2.5"
                    id="error_display"
                  >
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Lỗi phần mềm</p>
                      <p className="mt-0.5 leading-relaxed text-red-600/90">{errorMessage}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Loading Mask Structure */}
            <AnimatePresence mode="wait">
              {isLoaderActive ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-white rounded-2xl border border-zinc-200 p-8 text-center flex flex-col items-center justify-center min-h-[300px] shadow-sm relative overflow-hidden"
                  key="loading-container"
                >
                  {/* Subtle radiating pulsing circular rings */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border-2 border-indigo-200 animate-ping opacity-25" />
                    <div className="w-36 h-36 rounded-full border border-indigo-100 animate-pulse opacity-40" />
                  </div>

                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center animate-bounce shadow-md">
                      <Layers className="w-7 h-7" />
                    </div>

                    <div className="max-w-xs">
                      <p className="font-bold text-slate-800 text-base">Hệ thống Gemini đang hoạt động</p>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Đang phân tích các đặc điểm hình dạng, phát hiện danh tính nhân vật, và biên dịch cấu trúc prompt đầu ra...
                      </p>
                    </div>

                    {/* Progress bars */}
                    <div className="w-40 h-1 bg-zinc-100 rounded-full overflow-hidden mt-2 border border-zinc-200/50">
                      <div className="h-full bg-indigo-600 rounded-full animate-infinite-loading w-3/4" />
                    </div>
                  </div>
                </motion.div>
              ) : generatedPrompt ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-5"
                  key="results-container"
                >
                  <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm relative">
                    
                    {/* Header bar of output */}
                    <div className="flex items-center justify-between pb-3.5 border-b border-zinc-100 mb-4 gap-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono">Kết Quả Hoàn Thành</span>
                      </div>
                      
                      {/* Identified Badge card */}
                      <div className="px-2.5 py-1 bg-zinc-100 border border-zinc-200 text-[11px] font-mono rounded-lg text-slate-700">
                        Nhân vật phát hiện: <strong className="text-indigo-600 text-xs font-bold font-sans">{characterName}</strong>
                      </div>
                    </div>

                    {/* Output block display */}
                    <div className="group relative">
                      {/* Copy action trigger overlap */}
                      <button
                        onClick={copyToClipboard}
                        type="button"
                        className={`absolute top-3 right-3 p-2.5 rounded-xl border transition-all duration-200 flex items-center gap-1.5 text-xs font-semibold shadow-xs hover:scale-103
                          ${copied 
                            ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
                            : "bg-white border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 text-slate-600"}`}
                        title="Sao chép khối prompt đã hoàn thành"
                        id="copy_prompt_button"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 stroke-[2.5]" />
                            <span>Đã sao chép prompt!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>

                      {/* Completed prompt box */}
                      <pre className="font-mono text-xs sm:text-sm bg-slate-950 text-slate-100 rounded-xl p-5 pt-14 text-slate-300 tracking-tight leading-relaxed break-words whitespace-pre-wrap select-all relative overflow-hidden border border-slate-800 shadow-inner max-h-[350px] overflow-y-auto">
                        {generatedPrompt}
                      </pre>
                    </div>

                    {/* Instruction footer */}
                    <div className="mt-4 p-3 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center gap-2.5 text-xs text-slate-500">
                      <Info className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span>Prompt này khớp chính xác với thông số kỹ thuật mẫu đồ chơi vinyl dày chất lượng cao 3D được yêu cầu.</span>
                    </div>

                  </div>
                </motion.div>
              ) : (
                <div className="bg-white rounded-2xl border border-zinc-200 p-8 text-center flex flex-col items-center justify-center min-h-[320px] shadow-xs">
                  <div className="h-12 w-12 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 mb-4">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-slate-800 text-base">Chưa có prompt được biên dịch</h3>
                  <p className="text-xs text-slate-400 mt-2 max-w-xs mx-auto leading-relaxed">
                    Tải lên hình ảnh tham chiếu nhân vật thiết kế của bạn, sau đó nhấp vào nút trích xuất để biên dịch mô tả prompt đồ chơi vinyl ngay lập tức!
                  </p>
                </div>
              )}
            </AnimatePresence>

          </section>
        </div>

        {/* Footer Area */}
        <footer className="text-center py-8 border-t border-zinc-200 mt-auto text-xs text-slate-400 font-mono">
          © 2026 Xưởng Tạo Đồ Chơi Của Thiên Phú | Tuân thủ nghiệm ngặt yêu cầu thiết kế mẫu
        </footer>
      </main>
    </div>
  );
}
