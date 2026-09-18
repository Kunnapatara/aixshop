import React, { useRef, useState } from 'react';
import { GlobalJourneyBar, UserJourney } from './components/common/GlobalJourneyBar';
import { ShopperExperience } from './components/shopper/ShopperExperience';
import { MerchantExperience, MerchantTab } from './components/merchant/MerchantExperience';
import { AdminExperience } from './components/admin/AdminExperience';
import { HeroSection } from './components/HeroSection';
import { FragmentationProblemSection } from './components/FragmentationProblemSection';
import { ProductIntelligencePreview } from './components/ProductIntelligencePreview';
import { EvidencePrinciplesSection } from './components/EvidencePrinciplesSection';
import { MerchantWorkflowSection } from './components/MerchantWorkflowSection';
import { Footer } from './components/Footer';
import { AnalysisPage } from './components/analysis/AnalysisPage';

export default function App() {
  // Primary Journey State: 'shopper' | 'merchant' | 'admin' | 'landing'
  const [currentJourney, setCurrentJourney] = useState<UserJourney | 'landing'>('shopper');
  
  // Secondary sub-tab states if needed
  const [merchantSubTab, setMerchantSubTab] = useState<MerchantTab>('overview');
  const [submittedUrl, setSubmittedUrl] = useState<string>('https://shop.aeropulse.com/products/vaporstride-carbon-elite');
  const urlInputRef = useRef<HTMLInputElement>(null);

  const handleSelectJourney = (journey: UserJourney) => {
    setCurrentJourney(journey);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartAnalysis = (url: string) => {
    setSubmittedUrl(url || 'https://shop.aeropulse.com/products/vaporstride-carbon-elite');
    setCurrentJourney('merchant');
    setMerchantSubTab('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans selection:bg-orange-500/20 selection:text-orange-950">
      
      {/* 1. Global Journey Navigation Bar (QRxMENU Top Header) */}
      <GlobalJourneyBar
        currentJourney={currentJourney === 'landing' ? 'shopper' : currentJourney}
        onSelectJourney={handleSelectJourney}
        onNavigateLanding={() => {
          setCurrentJourney('landing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 2. ROLE JOURNEY A: SHOPPER EXPERIENCE */}
      {currentJourney === 'shopper' && (
        <div className="flex-1 flex flex-col">
          <ShopperExperience
            onNavigateMerchant={() => {
              setCurrentJourney('merchant');
              setMerchantSubTab('overview');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}

      {/* 3. ROLE JOURNEY B: MERCHANT EXPERIENCE */}
      {currentJourney === 'merchant' && (
        <div className="flex-1 flex flex-col">
          <MerchantExperience
            initialTab={merchantSubTab}
            onNavigateShopper={() => {
              setCurrentJourney('shopper');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateAdmin={() => {
              setCurrentJourney('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}

      {/* 4. ROLE JOURNEY C: ADMIN EXPERIENCE */}
      {currentJourney === 'admin' && (
        <div className="flex-1 flex flex-col">
          <AdminExperience
            onNavigateMerchant={() => {
              setCurrentJourney('merchant');
              setMerchantSubTab('overview');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateShopper={() => {
              setCurrentJourney('shopper');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}

      {/* 5. OPTIONAL: LANDING & VALUE PROPOSITION VIEW */}
      {currentJourney === 'landing' && (
        <div className="flex-1 flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-orange-500/20 selection:text-orange-950">
          <main className="flex-1 space-y-16 pb-24">
            <HeroSection
              onStartAnalysis={handleStartAnalysis}
              onNavigateDashboard={() => {
                setCurrentJourney('merchant');
                setMerchantSubTab('overview');
              }}
              onNavigateReport={() => {
                setCurrentJourney('merchant');
                setMerchantSubTab('report');
              }}
              inputRef={urlInputRef}
            />

            {/* Quick 3-Journey Gateway Block (QRxMENU Rounded Card Style) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-6">
                <div className="text-center space-y-2 max-w-2xl mx-auto">
                  <span className="px-3.5 py-1 rounded-full text-xs font-semibold text-orange-800 bg-orange-50 border border-orange-200">
                    ONE INTELLIGENCE SYSTEM · THREE EXPERIENCES
                  </span>
                  <h2 className="text-2xl font-extrabold text-stone-900">Select Your Operational Journey</h2>
                  <p className="text-xs sm:text-sm text-stone-500">
                    Experience how product truth powers buyer trust, catalog optimization, and algorithmic governance.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  {/* Card 1: Shopper */}
                  <div
                    onClick={() => handleSelectJourney('shopper')}
                    className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 hover:border-orange-500 hover:shadow-md transition-all cursor-pointer space-y-3 group"
                  >
                    <div className="text-2xl">🛍️</div>
                    <h3 className="font-bold text-stone-900 group-hover:text-orange-600 text-lg">Shopper Journey</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Understand, verify, compare offers, and buy with authentic confidence. Plain-language specifications and verified seller links.
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600">
                      Open Buyer Experience →
                    </span>
                  </div>

                  {/* Card 2: Merchant */}
                  <div
                    onClick={() => handleSelectJourney('merchant')}
                    className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 hover:border-orange-500 hover:shadow-md transition-all cursor-pointer space-y-3 group"
                  >
                    <div className="text-2xl">🏪</div>
                    <h3 className="font-bold text-stone-900 group-hover:text-orange-600 text-lg">Merchant SaaS</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Improve, optimize, monitor, and discover. 78% intelligence coverage, 79% discovery readiness, and actionable issues workspace.
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600">
                      Open Merchant Console →
                    </span>
                  </div>

                  {/* Card 3: Admin */}
                  <div
                    onClick={() => handleSelectJourney('admin')}
                    className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 hover:border-orange-500 hover:shadow-md transition-all cursor-pointer space-y-3 group"
                  >
                    <div className="text-2xl">⚡</div>
                    <h3 className="font-bold text-stone-900 group-hover:text-orange-600 text-lg">Admin Control Tower</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Govern, audit, control, and protect. 384 raw observation signals, 194 evidence records, identity resolution, and security logs.
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600">
                      Open Control Tower →
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <FragmentationProblemSection />
            <ProductIntelligencePreview onStartAnalysis={handleStartAnalysis} />
            <EvidencePrinciplesSection />
            <MerchantWorkflowSection />
          </main>
          <Footer />
        </div>
      )}

    </div>
  );
}
