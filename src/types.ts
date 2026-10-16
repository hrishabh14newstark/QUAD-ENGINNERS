export type Sector = 
  | 'Aerospace & Defense'
  | 'Clean Energy & Grid'
  | 'Industrial Robotics'
  | 'High-Speed Rail & Transit'
  | 'Semiconductors & Cryogenics'
  | 'Advanced Materials'
  | 'Autonomous Marine';

export type SubsidiaryStatus = 'Expansion' | 'Scale' | 'Mature' | 'Consolidation';
export type GovernanceHealth = 'Exceptional' | 'Strong' | 'Under Review';

export interface QuarterlyFinancial {
  quarter: string;
  revenue: number; // in $M
  ebitda: number;  // in $M
}

export interface Subsidiary {
  id: string;
  name: string;
  code: string;
  sector: Sector;
  ownershipPercent: number; // 0-100
  valuation: number; // in millions USD
  annualRevenue: number; // in millions USD
  ebitdaMargin: number; // percentage
  growthRate: number; // YoY %
  headcount: number;
  ceo: string;
  hq: string;
  foundedYear: number;
  acquiredYear: number;
  status: SubsidiaryStatus;
  governanceHealth: GovernanceHealth;
  description: string;
  keyDivisions: string[];
  boardLead: string; // One of the 4 founders
  quarterlyRevenue: QuarterlyFinancial[];
  capexAllocation: number; // in $M
  livePriceIndex: number; // relative benchmark index (e.g. 118.4)
  dailyChange: number; // e.g. +1.4%
  cashReserves: number; // in $M
  debtToEquity: number;
}

export interface FounderDossier {
  fullBio: string;
  patentsAndDeals: string;
  governancePhilosophy: string;
  keyInitiatives2026: string[];
  academicCredentials: string[];
}

export interface Founder {
  id: string;
  name: string;
  role: string;
  title: string;
  initials: string;
  gradient: string;
  accentColor: string;
  academic: string;
  prior: string;
  focusAreas: string[];
  quote: string;
  boardSeats: string[];
  tenure: string;
  dossier: FounderDossier;
}

export type EventCategory = 
  | 'Earnings'
  | 'Capex'
  | 'M&A'
  | 'Dividend'
  | 'Operational'
  | 'Valuation';

export interface FinancialEvent {
  id: string;
  timestamp: string;
  unixTime: number;
  subsidiaryId: string;
  subsidiaryName: string;
  code: string;
  category: EventCategory;
  headline: string;
  financialImpact: string;
  type: 'positive' | 'neutral' | 'caution';
  details: string;
}

export interface ScenarioModifiers {
  interestRateShock: number; // e.g. 0 or +150 bps
  supplyChainShock: number; // % margin hit
  capexExpansion: number; // % revenue boost
}
