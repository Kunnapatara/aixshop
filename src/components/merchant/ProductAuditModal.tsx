// src/components/merchant/ProductAuditModal.tsx
// Product Audit Modal: Direct Single-Product Diagnostic
// Formatted directly according to Prompt Product Audit specification:
// สินค้า | สถานะ | ปัญหาที่พบ | สิ่งที่ควรทำ | [ ตรวจอีกครั้ง ]

import React, { useState } from 'react';
import { 
  X, 
  Package, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  Wrench, 
  ExternalLink,
  ShieldCheck,
  Check,
  Info
} from 'lucide-react';
import { CanonicalCatalogProduct } from '../../data/canonicalCatalog';

interface ProductAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string;
  productName?: string;
  onRecheckProduct?: () => void;
}

export const ProductAuditModal: React.FC<ProductAuditModalProps> = ({
  isOpen,
  onClose,
  productId,
  productName = 'AeroPulse VaporStride Carbon Elite',
  onRecheckProduct
}) => {
  const [isRechecking, setIsRechecking] = useState(false);
  const [recheckSuccess, setRecheckSuccess] = useState(false);

  if (!isOpen) return null;

  const handleRecheck = () => {
    setIsRechecking(true);
    setRecheckSuccess(false);
    if (onRecheckProduct) {
      onRecheckProduct();
    }
    setTimeout(() => {
      setIsRechecking(false);
      setRecheckSuccess(true);
      setTimeout(() => setRecheckSuccess(false), 3500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="ปิด"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. สินค้า (Product Identity) */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200/60">
              การตรวจสินค้า (Product Audit)
            </span>
            <span className="text-xs text-stone-400 font-mono">ID: {productId || 'AP-VSE-001'}</span>
          </div>

          <h3 className="text-xl font-extrabold text-stone-900 tracking-tight pt-1">
            {productName}
          </h3>
          <p className="text-xs text-stone-500">
            AeroPulse Athletics · หมวดหมู่รองเท้าวิ่งมาราธอน
          </p>
        </div>

        {/* 2. สถานะ (Status) */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-amber-800 font-semibold block">สถานะความพร้อม</span>
            <span className="text-base font-extrabold text-amber-950 mt-0.5 block">
              {recheckSuccess ? 'พร้อมสำหรับการค้นหา (ปรับปรุงแล้ว)' : 'ต้องปรับปรุง (Needs Improvement)'}
            </span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${recheckSuccess ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'}`}>
            {recheckSuccess ? '94% พร้อม' : '68% พร้อม'}
          </span>
        </div>

        {/* 3. ปัญหาที่พบ (Problems Found) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              ปัญหาที่พบ ({recheckSuccess ? '0' : '2'} รายการ)
            </span>
            <span className="text-[11px] text-rose-700 font-semibold">กระทบการตอบของผู้ช่วย AI</span>
          </div>

          {!recheckSuccess ? (
            <div className="space-y-2">
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-rose-900">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>1. ข้อมูลวัสดุผ้าอัปเปอร์ไม่ชัดเจนและขัดแย้งกัน</span>
                </div>
                <p className="text-stone-500 text-[11px] pl-5 leading-relaxed">
                  ร้านระบุ Engineered Mesh แต่ฟีดภายนอกระบุ Synthetic Knit ทำให้ระบบ AI ไม่กล้ายืนยันคำตอบ
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-rose-900">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>2. ขาดข้อมูลเงื่อนไขการจัดส่งและระยะเวลาส่งมอบ</span>
                </div>
                <p className="text-stone-500 text-[11px] pl-5 leading-relaxed">
                  ไม่มีข้อมูลระยะเวลาตัดรอบจัดส่งในสคีมา ทำให้ลูกค้าที่ต้องการของด่วนไม่พบตัวเลือกนี้
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>ตรวจพบการอัปเดตข้อมูลสเปกแล้ว — สินค้านี้มีข้อมูลครบถ้วนสำหรับ AI Shopping</span>
            </div>
          )}
        </div>

        {/* 4. สิ่งที่ควรทำ (Action at Source) */}
        <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/80 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-orange-950">
            <Wrench className="w-4 h-4 text-orange-600" />
            <span>สิ่งที่ควรทำ (แก้ที่ร้านต้นทาง):</span>
          </div>

          <ul className="space-y-1.5 text-stone-700 pl-6 list-disc text-[11px]">
            <li>
              <strong>เพิ่มข้อมูลวัสดุ:</strong> เข้าสู่หลังบ้าน Shopify / WooCommerce แล้วกรอกข้อมูลวัสดุในช่องสเปกสินค้าให้ตรงกัน
            </li>
            <li>
              <strong>ตรวจสอบข้อมูลการจัดส่ง:</strong> ระบุนโยบายส่งฟรีและระยะเวลาส่งมอบในหน้า Product / Settings
            </li>
          </ul>

          <div className="pt-1 text-[10px] text-stone-400">
            * ระบบร้านค้าของคุณคือแหล่งข้อมูลจริง — AIXSHOP ทำหน้าที่ตรวจและยืนยันความพร้อม
          </div>
        </div>

        {/* 5. [ ตรวจอีกครั้ง ] Re-check Button */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-3 rounded-2xl text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            ปิดหน้าต่าง
          </button>

          <button
            type="button"
            onClick={handleRecheck}
            disabled={isRechecking}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold shadow-xs hover:shadow transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRechecking ? 'animate-spin' : ''}`} />
            <span>{isRechecking ? 'กำลังตรวจอีกครั้ง...' : 'ตรวจอีกครั้ง'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
