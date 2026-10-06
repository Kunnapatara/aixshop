// src/components/merchant/StoreAuditHero.tsx
// Store-First Diagnostic Header & 2-Layer Store Audit for AIXSHOP
// Answers: 1. How is my store doing? 2. What needs attention? 3. What should I do next?

import React, { useState } from 'react';
import { 
  Store, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  RefreshCw, 
  ShieldCheck, 
  Globe, 
  Sparkles, 
  Layers, 
  ExternalLink,
  ChevronDown,
  Info
} from 'lucide-react';
import { CANONICAL_MERCHANT, CANONICAL_SYSTEM_KPIS } from '../../data/canonicalCatalog';
import { READINESS_TRUTH_BOUNDARIES } from '../../state/canonicalReadiness';

interface StoreAuditHeroProps {
  readinessScore: number;
  openIssuesCount: number;
  onAuditStore?: (url: string) => void;
  onStartFixing?: () => void;
  onRecheckStore?: () => void;
  isRechecking?: boolean;
}

export const StoreAuditHero: React.FC<StoreAuditHeroProps> = ({
  readinessScore,
  openIssuesCount,
  onAuditStore,
  onStartFixing,
  onRecheckStore,
  isRechecking = false
}) => {
  const [storeUrlInput, setStoreUrlInput] = useState<string>(CANONICAL_MERCHANT.domain);
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);
  const [auditLayerActive, setAuditLayerActive] = useState<'both' | 'store' | 'catalog'>('both');

  const handleRunAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAuditStore) {
      onAuditStore(storeUrlInput);
    } else if (onRecheckStore) {
      onRecheckStore();
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
      
      {/* 1. Store Header & Simple Scan Entry */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-100">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200/80 flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-orange-600" />
              <span>ตรวจร้านของคุณ</span>
            </span>
            <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-stone-400" />
              <span>{CANONICAL_MERCHANT.domain}</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              เชื่อมต่อแล้ว
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {CANONICAL_MERCHANT.name}
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
            ดูว่าสินค้า ข้อมูล และข้อเสนอของร้านพร้อมสำหรับ AI Shopping แค่ไหน — รู้จุดที่ต้องแก้เพื่อเพิ่มโอกาสถูกค้นพบและแนะนำ
          </p>
        </div>

        {/* Quick Re-audit Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 self-start lg:self-center shrink-0">
          {!showUrlInput ? (
            <>
              <button
                type="button"
                onClick={() => {
                  if (onAuditStore) {
                    onAuditStore(storeUrlInput);
                  } else if (onRecheckStore) {
                    onRecheckStore();
                  }
                }}
                disabled={isRechecking}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-stone-900 hover:bg-black text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRechecking ? 'animate-spin' : ''}`} />
                <span>{isRechecking ? 'กำลังตรวจร้าน...' : 'ตรวจร้านของฉัน'}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowUrlInput(true)}
                className="px-3 py-3 rounded-2xl text-xs text-stone-500 hover:text-stone-800 hover:bg-stone-50 border border-stone-200 font-medium transition-colors cursor-pointer"
                title="เปลี่ยน URL ร้านค้า"
              >
                ตรวจ URL อื่น
              </button>
            </>
          ) : (
            <form onSubmit={handleRunAudit} className="flex items-center gap-2">
              <input
                type="text"
                value={storeUrlInput}
                onChange={(e) => setStoreUrlInput(e.target.value)}
                placeholder="https://your-store.com"
                className="px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-orange-500 w-56 font-mono text-stone-800"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-black cursor-pointer"
              >
                ตรวจเลย
              </button>
              <button
                type="button"
                onClick={() => setShowUrlInput(false)}
                className="text-xs text-stone-400 hover:text-stone-600 px-1"
              >
                ✕
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 2. Store Audit Result: 4 Clear Pillars (Human Language) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        
        {/* Pillar 1: Readiness Score Card */}
        <div className="md:col-span-4 p-6 rounded-3xl bg-[#FAF8F5] border border-stone-200/80 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider block">
              ความพร้อมของร้าน
            </span>
            <h2 className="text-base font-bold text-stone-800 mt-0.5">
              พร้อมระดับไหน?
            </h2>
            <p className="text-xs text-stone-500 mt-1 leading-normal">
              ความสมบูรณ์ของข้อมูลสินค้าที่ผู้ช่วย AI ใช้ประเมินและแนะนำ
            </p>
          </div>

          <div className="flex items-baseline gap-3 my-2">
            <span className="text-5xl font-black text-stone-900 tracking-tight">
              {readinessScore}%
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full self-start">
                {readinessScore >= 95 ? 'พร้อมระดับสูง' : readinessScore >= 75 ? 'พื้นฐานดี' : 'ต้องปรับปรุง'}
              </span>
              <span className="text-[11px] text-stone-400 mt-1">
                เป้าหมาย: 95%+
              </span>
            </div>
          </div>

          <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${readinessScore}%` }}
            />
          </div>

          <div className="text-[10px] text-stone-400 font-medium">
            {READINESS_TRUTH_BOUNDARIES.previewModel} · {READINESS_TRUTH_BOUNDARIES.externalUnchanged}
          </div>
        </div>

        {/* Pillar 2: Findings Priority Breakdown */}
        <div className="md:col-span-5 p-6 rounded-3xl bg-white border border-stone-200/80 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                ผลการตรวจสอบร้าน
              </span>
              <span className="text-xs font-mono font-bold text-stone-600">
                12 เรื่องที่ควรแก้
              </span>
            </div>
            <h3 className="text-base font-bold text-stone-900 mt-0.5">
              จัดลำดับตามความเร่งด่วน
            </h3>
          </div>

          {/* 3 Priority Tiers */}
          <div className="grid grid-cols-3 gap-2.5 py-1">
            <div className="p-3 rounded-2xl bg-rose-50/80 border border-rose-200 text-center space-y-1">
              <span className="text-xs font-bold text-rose-800 block">ต้องแก้ก่อน</span>
              <span className="text-2xl font-black text-rose-900 block">3</span>
              <span className="text-[10px] text-rose-600">กระทบการค้นพบ</span>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-center space-y-1">
              <span className="text-xs font-bold text-amber-800 block">ควรปรับปรุง</span>
              <span className="text-2xl font-black text-amber-900 block">5</span>
              <span className="text-[10px] text-amber-600">เพิ่มความชัดเจน</span>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center space-y-1">
              <span className="text-xs font-bold text-emerald-800 block">ดีแล้ว</span>
              <span className="text-2xl font-black text-emerald-900 block">4</span>
              <span className="text-[10px] text-emerald-600">ข้อมูลครบถ้วน</span>
            </div>
          </div>

          <p className="text-xs text-stone-500">
            แก้ปัญหาในกลุ่ม <strong>ต้องแก้ก่อน (3 เรื่อง)</strong> เพื่อเปิดโอกาสให้ผู้ช่วย AI ดึงข้อมูลไปตอบผู้ซื้อได้ทันที
          </p>
        </div>

        {/* Pillar 3: Next Immediate Action */}
        <div className="md:col-span-3 p-6 rounded-3xl bg-gradient-to-br from-stone-900 to-stone-800 text-white flex flex-col justify-between space-y-4 shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-400">
              สิ่งที่ควรทำต่อ
            </span>
            <h3 className="text-base font-bold text-white">
              เริ่มแก้จุดสำคัญ
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed pt-1">
              มี <strong>{openIssuesCount} สินค้า</strong> ที่ข้อมูลไม่ครบถ้วนและต้องการการยืนยัน
            </p>
          </div>

          <div className="space-y-2 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-orange-500/30 text-orange-400 flex items-center justify-center font-bold text-[10px]">1</span>
              <span>ตรวจสิ่งที่ต้องแก้</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-stone-700 text-stone-400 flex items-center justify-center font-bold text-[10px]">2</span>
              <span>แก้ที่ร้านต้นทาง (Shopify)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-stone-700 text-stone-400 flex items-center justify-center font-bold text-[10px]">3</span>
              <span>กดตรวจอีกครั้งเพื่อดูคะแนน</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onStartFixing}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold transition-all shadow-xs hover:shadow cursor-pointer mt-2"
          >
            <span>ดูสิ่งที่ต้องแก้</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* 3. Two-Layer Store Audit: Store-Level vs Catalog-Level Signals */}
      <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/60 pb-2.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <h4 className="text-xs font-bold text-stone-900">
              สัญญาณการตรวจสอบ 2 ระดับ (Store & Catalog Signals)
            </h4>
          </div>
          <span className="text-[11px] text-stone-500">
            รวม {CANONICAL_MERCHANT.catalogSize} สินค้า · {CANONICAL_MERCHANT.activeCommercialOffers} ข้อเสนอ
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Layer A: Store-Level Signals */}
          <div className="bg-white p-4 rounded-xl border border-stone-200/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">1. ระดับร้านค้า (Store Signals)</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">ผ่าน 3 / 4</span>
            </div>
            <ul className="text-xs text-stone-600 space-y-1">
              <li className="flex items-center gap-2 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>ตัวตนร้านและโดเมน: ยืนยันแล้ว ({CANONICAL_MERCHANT.domain})</span>
              </li>
              <li className="flex items-center gap-2 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>แบรนด์หลักและสิทธิ์การจำหน่าย: ตรวจสอบแล้ว</span>
              </li>
              <li className="flex items-center gap-2 text-[11px]">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>นโยบายการคืนสินค้า (Return Policy): ขาดข้อมูลระดับ Schema.org</span>
              </li>
            </ul>
          </div>

          {/* Layer B: Catalog-Level Signals */}
          <div className="bg-white p-4 rounded-xl border border-stone-200/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">2. ระดับสินค้า (Catalog Signals)</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800">8 สินค้าต้องปรับ</span>
            </div>
            <ul className="text-xs text-stone-600 space-y-1">
              <li className="flex items-center gap-2 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>ราคาและสต็อกสินค้า: สอดคล้องกับเช็คเอาท์</span>
              </li>
              <li className="flex items-center gap-2 text-[11px]">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>ความครบถ้วนของสเปกสินค้า: 8 สินค้าขาดสเปกเชิงลึก</span>
              </li>
              <li className="flex items-center gap-2 text-[11px]">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>ข้อมูลที่ช่วยยืนยัน: พบคู่แข่งและร้านอื่นให้ข้อมูลวัสดุขัดแย้งกัน</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. AI Commerce Visibility & Readiness Surfaces (5 Supported Surfaces) */}
      <div className="p-5 rounded-2xl bg-white border border-stone-200/80 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <h4 className="text-xs font-bold text-stone-900">
              ความพร้อมและการเตรียมตัวสำหรับ AI Commerce (5 Supported Surfaces)
            </h4>
          </div>
          <span className="text-[10px] text-stone-400 font-medium">
            * ประเมินจากคุณภาพและความครบถ้วนของข้อมูลแคตตาล็อกร้านค้า (Catalog Readiness) ไม่ใช่การการันตีอันดับการค้นหาภายนอก
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
          {/* Surface 1: Google */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">Google</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800">84% พร้อม</span>
            </div>
            <p className="text-[11px] text-stone-500 leading-normal">
              Search & Shopping feeds ผ่านเกณฑ์ข้อมูลพื้นฐาน
            </p>
          </div>

          {/* Surface 2: ChatGPT */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">ChatGPT</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800">68% ปรับปรุง</span>
            </div>
            <p className="text-[11px] text-stone-500 leading-normal">
              ขาดสเปกเฉพาะทาง (Drop, Plate, Materials)
            </p>
          </div>

          {/* Surface 3: Gemini */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">Gemini</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800">72% ปรับปรุง</span>
            </div>
            <p className="text-[11px] text-stone-500 leading-normal">
              พบข้อมูลวัสดุขัดแย้งกับฟีดตัวแทนจำหน่าย
            </p>
          </div>

          {/* Surface 4: Bing */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">Bing Copilot</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800">76% พร้อม</span>
            </div>
            <p className="text-[11px] text-stone-500 leading-normal">
              สเปกพื้นฐานพร้อมสำหรับคำค้นหาทั่วไป
            </p>
          </div>

          {/* Surface 5: TikTok */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">TikTok Shop</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-stone-200 text-stone-700">เตรียมฟีด</span>
            </div>
            <p className="text-[11px] text-stone-500 leading-normal">
              อยู่ในขั้นตอนจัดเตรียมโครงสร้างแคตตาล็อก
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
