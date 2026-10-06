// src/components/merchant/StoreFindingsSection.tsx
// Store-First Findings Grouped by Priority: ต้องแก้ก่อน | ควรปรับปรุง | ดีแล้ว
// Features affected products drill-down directly into Product Audit

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Package, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Tag, 
  ShieldAlert, 
  Wrench, 
  Sparkles,
  Info
} from 'lucide-react';
import { IssueItem } from '../../types/issues';
import { CANONICAL_CATALOG_PRODUCTS, CanonicalCatalogProduct } from '../../data/canonicalCatalog';

interface StoreFindingsSectionProps {
  issues: IssueItem[];
  onInspectProduct?: (productId: string, productName: string) => void;
  onOpenActionCenter?: () => void;
  onResolveIssue?: (issueId: string) => void;
}

export const StoreFindingsSection: React.FC<StoreFindingsSectionProps> = ({
  issues,
  onInspectProduct,
  onOpenActionCenter,
  onResolveIssue
}) => {
  const [activePriorityTab, setActivePriorityTab] = useState<'critical' | 'improvement' | 'good'>('critical');
  const [expandedFindingId, setExpandedFindingId] = useState<string | null>('find-1');

  // Representative finding groups mapped to canonical issues & products
  const criticalFindings = [
    {
      id: 'find-1',
      title: 'ข้อมูลสินค้าไม่ครบถ้วนสำหรับคำค้นสำคัญ',
      scope: 'PRODUCT',
      affectedCount: '8 สินค้า',
      impactText: 'ผู้ซื้อที่ถามสเปกเฉพาะเจาะจง (เช่น ดรอป, วัสดุ, แผ่นคาร์บอน) จะไม่พบคำตอบที่ชัดเจนจาก AI',
      recommendedAction: 'เข้าไปเติมสเปกสำคัญในระบบหลังบ้านของร้านค้า',
      productsAffected: [
        { id: CANONICAL_CATALOG_PRODUCTS[0].id, name: CANONICAL_CATALOG_PRODUCTS[0].name, missing: ['วัสดุผ้าอัปเปอร์', 'ความสูงสแต็คโฟม', 'นโยบายคืน'] },
        { id: CANONICAL_CATALOG_PRODUCTS[1].id, name: CANONICAL_CATALOG_PRODUCTS[1].name, missing: ['การกันน้ำ HydroGuard', 'การยึดเกาะพื้น'] },
        { id: CANONICAL_CATALOG_PRODUCTS[2].id, name: CANONICAL_CATALOG_PRODUCTS[2].name, missing: ['จำนวนตะปูสไปค์', 'ขนาดบาร์โค้ด GTIN'] }
      ]
    },
    {
      id: 'find-2',
      title: 'ข้อมูลราคาไม่ตรงกันระหว่างหน้าเว็บร้านกับแหล่งอื่น',
      scope: 'OFFER',
      affectedCount: '3 Offers',
      impactText: 'ผู้ช่วย AI ลดระดับความเชื่อมั่นในราคา เมื่อเห็นร้านค้ากับตัวแทนจำหน่ายลงราคาขัดแย้งกัน',
      recommendedAction: 'ตรวจสอบราคาขายและโปรโมชันในระบบเชื่อมต่อสต็อก',
      productsAffected: [
        { id: CANONICAL_CATALOG_PRODUCTS[0].id, name: CANONICAL_CATALOG_PRODUCTS[0].name, missing: ['ราคาโปรโมชัน $189 vs MSRP $199'] },
        { id: CANONICAL_CATALOG_PRODUCTS[1].id, name: CANONICAL_CATALOG_PRODUCTS[1].name, missing: ['ค่าธรรมเนียมจัดส่งไม่ถูกระบุ'] }
      ]
    },
    {
      id: 'find-3',
      title: 'ขาดโครงสร้างนโยบายการคืนสินค้าของร้าน (Return Policy)',
      scope: 'STORE',
      affectedCount: 'ระดับร้านค้า',
      impactText: 'ผู้ซื้อลังเลที่จะตัดสินใจซื้อ หาก AI ไม่สามารถตอบเงื่อนไขการคืนสินค้าหรือระยะเวลารับประกันได้',
      recommendedAction: 'ติดตั้ง Schema.org MerchantReturnPolicy ในหน้าตั้งค่าร้านค้า',
      productsAffected: []
    }
  ];

  const improvementFindings = [
    {
      id: 'find-4',
      title: 'ภาพสินค้าความละเอียดสูงและพื้นหลังขาว',
      scope: 'PRODUCT',
      affectedCount: '6 สินค้า',
      impactText: 'ภาพถ่ายไม่ตรงตามมาตรฐาน Google Shopping และการแสดงผลใน Shopping Cards',
      recommendedAction: 'อัปโหลดภาพขนาด 800x800px พื้นหลังสีขาวล้วน',
      productsAffected: [
        { id: CANONICAL_CATALOG_PRODUCTS[0].id, name: CANONICAL_CATALOG_PRODUCTS[0].name, missing: ['ภาพพื้นหลังขาวล้วน (White BG)'] },
        { id: CANONICAL_CATALOG_PRODUCTS[2].id, name: CANONICAL_CATALOG_PRODUCTS[2].name, missing: ['ภาพมุมมองด้านข้างความละเอียดสูง'] }
      ]
    },
    {
      id: 'find-5',
      title: 'ข้อมูลการจัดส่งและระยะเวลาส่งมอบ',
      scope: 'OFFER',
      affectedCount: '4 สินค้า',
      impactText: 'ลูกค้าที่ต้องการสินค้าด่วนไม่สามารถประเมินวันถึงได้',
      recommendedAction: 'ระบุระยะเวลาตัดรอบจัดส่งและเงื่อนไขส่งฟรีในระบบร้าน',
      productsAffected: [
        { id: CANONICAL_CATALOG_PRODUCTS[1].id, name: CANONICAL_CATALOG_PRODUCTS[1].name, missing: ['ระยะเวลาตัดรอบส่งมอบประจำวัน'] }
      ]
    },
    {
      id: 'find-6',
      title: 'คำอธิบายสินค้าเชิงลึกสำหรับค้นหาแบบภาษาพูด',
      scope: 'PRODUCT',
      affectedCount: '5 สินค้า',
      impactText: 'คำค้นหาแบบธรรมชาติ เช่น "รองเท้าวิ่งมาราธอนที่เหมาะกับเท้าแบน" ไม่จับคู่กับสินค้า',
      recommendedAction: 'เพิ่มรายละเอียดวัตถุประสงค์การใช้งานในย่อหน้าสรุปสินค้า',
      productsAffected: [
        { id: CANONICAL_CATALOG_PRODUCTS[0].id, name: CANONICAL_CATALOG_PRODUCTS[0].name, missing: ['คำอธิบายวัตถุประสงค์การใช้งานเชิงลึก'] },
        { id: CANONICAL_CATALOG_PRODUCTS[1].id, name: CANONICAL_CATALOG_PRODUCTS[1].name, missing: ['คำอธิบายประเภทสรีระเท้าที่เหมาะสม'] }
      ]
    },
    {
      id: 'find-7',
      title: 'บาร์โค้ดสากล (GTIN-14) สำหรับสีและไซส์ย่อย',
      scope: 'PRODUCT',
      affectedCount: '6 ตัวเลือก',
      impactText: 'AI ไม่สามารถระบุเจาะจงสินค้าตัวย่อยเมื่อลูกค้าค้นหาระดับไซส์',
      recommendedAction: 'ใส่รหัสบาร์โค้ดให้ครบทุก Variants',
      productsAffected: [
        { id: CANONICAL_CATALOG_PRODUCTS[2].id, name: CANONICAL_CATALOG_PRODUCTS[2].name, missing: ['GTIN-14 Variant Checksum'] }
      ]
    },
    {
      id: 'find-8',
      title: 'หน่วยวัดของสเปกสินค้าให้เป็นตัวเลขมาตรฐาน',
      scope: 'PRODUCT',
      affectedCount: '2 สินค้า',
      impactText: 'สเปกที่บันทึกเป็นข้อความธรรมดาทำให้ระบบค้นหาตามช่วงตัวเลขคัดกรองไม่ได้',
      recommendedAction: 'ปรับข้อมูลจาก "ดรอป 8 มิล" ให้เป็นช่องตัวเลข "8" หน่วย "mm"',
      productsAffected: [
        { id: CANONICAL_CATALOG_PRODUCTS[0].id, name: CANONICAL_CATALOG_PRODUCTS[0].name, missing: ['ค่าตัวเลขสแต็คโฟม (mm)'] }
      ]
    }
  ];

  const goodFindings = [
    {
      id: 'find-9',
      title: 'ชื่อสินค้าและแบรนด์ถูกต้องชัดเจนตามมาตรฐานสากล',
      affectedCount: '24 สินค้าครบ',
      detail: 'ระบุแบรนด์ AeroPulse Athletics และชื่อรุ่นชัดเจน ไม่มีการยัดคีย์เวิร์ดเกินจริง'
    },
    {
      id: 'find-10',
      title: 'สถานะสินค้ามีในสต็อกตรงกับระบบเช็คเอาท์',
      affectedCount: '24 สินค้าครบ',
      detail: 'ผู้ซื้อและ AI มั่นใจได้ว่าสินค้าที่มีป้ายพร้อมส่ง สามารถสั่งซื้อได้จริง'
    },
    {
      id: 'find-11',
      title: 'สกุลเงินและราคาสอดคล้องกับมาตรฐาน ISO 4217 (USD)',
      affectedCount: '42 Offers',
      detail: 'โครงสร้างราคาแสดงทศนิยมถูกต้อง ป้องกันปัญหาการแปลงค่าเงินผิดพลาด'
    },
    {
      id: 'find-12',
      title: 'การเชื่อมต่อแคตตาล็อกและสถาปัตยกรรมโดเมนพร้อมใช้งาน',
      affectedCount: 'ทั้งร้าน',
      detail: 'ใบรับรอง SSL และแผนผังเว็บไซต์ (Sitemap) สมบูรณ์พร้อมให้ระบบตรวจจับ'
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block">
            สิ่งที่ตรวจพบในร้าน (Store Findings)
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 tracking-tight mt-0.5">
            ปัญหาที่พบ & สิ่งที่ต้องแก้ที่ต้นทาง
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-normal">
            จัดกลุ่มตามความสำคัญ — แก้ที่ระบบร้านของคุณ (Shopify, WooCommerce, Catalog) แล้วผลตรวจจะอัปเดตอัตโนมัติ
          </p>
        </div>

        {onOpenActionCenter && (
          <button
            type="button"
            onClick={onOpenActionCenter}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto shrink-0"
          >
            <span>เปิดรายการงานที่ต้องตรวจ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* 3 Priority Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200/70 pb-3">
        <button
          type="button"
          onClick={() => setActivePriorityTab('critical')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activePriorityTab === 'critical'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>ต้องแก้ก่อน (3 เรื่อง)</span>
        </button>

        <button
          type="button"
          onClick={() => setActivePriorityTab('improvement')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activePriorityTab === 'improvement'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>ควรปรับปรุง (5 เรื่อง)</span>
        </button>

        <button
          type="button"
          onClick={() => setActivePriorityTab('good')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activePriorityTab === 'good'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>ดีแล้ว (4 เรื่อง)</span>
        </button>
      </div>

      {/* Tab Content 1: ต้องแก้ก่อน (Critical) */}
      {activePriorityTab === 'critical' && (
        <div className="space-y-4">
          {criticalFindings.map((finding) => {
            const isExpanded = expandedFindingId === finding.id;
            return (
              <div 
                key={finding.id} 
                className="rounded-2xl border border-rose-200 bg-rose-50/30 overflow-hidden transition-all"
              >
                {/* Header row */}
                <div 
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-rose-50/60"
                  onClick={() => setExpandedFindingId(isExpanded ? null : finding.id)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                      <h4 className="text-sm font-bold text-stone-900">
                        {finding.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                        {finding.affectedCount}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600">
                      <strong>ผลกระทบ:</strong> {finding.impactText}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                    <span className="text-xs font-bold text-rose-700 hidden sm:inline">
                      {isExpanded ? 'ย่อรายละเอียด' : 'ดูสินค้าที่ได้รับผลกระทบ'}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-rose-700" /> : <ChevronDown className="w-4 h-4 text-rose-700" />}
                  </div>
                </div>

                {/* Expanded Details & Affected Products Drill-Down */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-rose-100 bg-white space-y-4">
                    {/* Solution instruction */}
                    <div className="p-3.5 rounded-xl bg-orange-50 border border-orange-200 flex items-start gap-3">
                      <Wrench className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                      <div className="text-xs text-orange-950">
                        <strong className="block text-orange-900 font-bold mb-0.5">วิธีแก้ที่ร้านต้นทาง (Action at Source):</strong>
                        {finding.recommendedAction} — หลังจากแก้ในระบบ Shopify/WooCommerce แล้ว กดตรวจอีกครั้งเพื่ออัปเดตผล
                      </div>
                    </div>

                    {/* Products Affected List */}
                    {finding.productsAffected && finding.productsAffected.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-stone-700 block">
                          สินค้าที่ตรวจพบปัญหานี้ ({finding.productsAffected.length} รายการตัวอย่าง):
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {finding.productsAffected.map((prod) => (
                            <div 
                              key={prod.id} 
                              className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between gap-3 hover:border-orange-300 transition-colors"
                            >
                              <div className="space-y-1">
                                <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                                  <Package className="w-3.5 h-3.5 text-stone-500" />
                                  <span>{prod.name}</span>
                                </div>
                                <div className="text-[11px] text-rose-700 flex flex-wrap gap-1">
                                  <span>ขาดข้อมูล:</span>
                                  {prod.missing.map((m, idx) => (
                                    <span key={idx} className="bg-rose-100/70 text-rose-900 px-1.5 py-0.2 rounded text-[10px] font-medium">
                                      {m}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (onInspectProduct) {
                                    onInspectProduct(prod.id, prod.name);
                                  }
                                }}
                                className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-black text-white text-[11px] font-bold shrink-0 transition-colors cursor-pointer"
                              >
                                ตรวจสินค้านี้ →
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab Content 2: ควรปรับปรุง (Improvements) */}
      {activePriorityTab === 'improvement' && (
        <div className="space-y-4">
          {improvementFindings.map((finding) => {
            const isExpanded = expandedFindingId === finding.id;
            return (
              <div 
                key={finding.id} 
                className="rounded-2xl border border-amber-200 bg-amber-50/30 overflow-hidden transition-all"
              >
                {/* Header row */}
                <div 
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-amber-50/60"
                  onClick={() => setExpandedFindingId(isExpanded ? null : finding.id)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                      <h4 className="text-sm font-bold text-stone-900">
                        {finding.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        {finding.affectedCount}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600">
                      <strong>ผลกระทบ:</strong> {finding.impactText}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                    <span className="text-xs font-bold text-amber-800 hidden sm:inline">
                      {isExpanded ? 'ย่อรายละเอียด' : 'ดูสินค้าที่ได้รับผลกระทบ'}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-amber-800" /> : <ChevronDown className="w-4 h-4 text-amber-800" />}
                  </div>
                </div>

                {/* Expanded Details & Affected Products Drill-Down */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-amber-100 bg-white space-y-4">
                    {/* Solution instruction */}
                    <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
                      <Wrench className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div className="text-xs text-amber-950">
                        <strong className="block text-amber-900 font-bold mb-0.5">วิธีแก้ที่ร้านต้นทาง (Action at Source):</strong>
                        {finding.recommendedAction} — หลังจากแก้ในระบบ Shopify/WooCommerce แล้ว กดตรวจอีกครั้งเพื่ออัปเดตผล
                      </div>
                    </div>

                    {/* Products Affected List */}
                    {finding.productsAffected && finding.productsAffected.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-stone-700 block">
                          สินค้าที่ตรวจพบข้อแนะนำนี้ ({finding.productsAffected.length} รายการตัวอย่าง):
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {finding.productsAffected.map((prod) => (
                            <div 
                              key={prod.id} 
                              className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between gap-3 hover:border-amber-300 transition-colors"
                            >
                              <div className="space-y-1">
                                <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                                  <Package className="w-3.5 h-3.5 text-stone-500" />
                                  <span>{prod.name}</span>
                                </div>
                                <div className="text-[11px] text-amber-800 flex flex-wrap gap-1">
                                  <span>ขาดข้อมูล:</span>
                                  {prod.missing.map((m, idx) => (
                                    <span key={idx} className="bg-amber-100/70 text-amber-900 px-1.5 py-0.2 rounded text-[10px] font-medium">
                                      {m}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (onInspectProduct) {
                                    onInspectProduct(prod.id, prod.name);
                                  }
                                }}
                                className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-black text-white text-[11px] font-bold shrink-0 transition-colors cursor-pointer"
                              >
                                ตรวจสินค้านี้ →
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab Content 3: ดีแล้ว (Good / Passed) */}
      {activePriorityTab === 'good' && (
        <div className="space-y-3">
          {goodFindings.map((finding) => (
            <div 
              key={finding.id}
              className="p-4 rounded-2xl border border-emerald-200/80 bg-emerald-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                    {finding.title}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {finding.affectedCount}
                  </span>
                </div>
                <p className="text-xs text-stone-500">
                  {finding.detail}
                </p>
              </div>

              <span className="text-xs font-bold text-emerald-700 shrink-0">
                ผ่านเกณฑ์ ✓
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
