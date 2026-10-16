import { Subsidiary, Founder, FinancialEvent } from '../types';

export const INITIAL_FOUNDERS: Founder[] = [
  {
    id: 'elena-rostova',
    name: 'Dr. Elena Rostova',
    role: 'Group Chief Executive Officer & Co-Founder',
    title: 'Systems Architect & Executive Chair',
    initials: 'ER',
    gradient: 'from-cyan-500/20 via-sky-600/10 to-transparent',
    accentColor: '#0ea5e9',
    academic: 'Ph.D. in Aerospace Systems Engineering, MIT · M.S. Aero/Astro, Caltech',
    prior: 'Former VP of Advanced Development Programs, Skunk Works / Lockheed Martin',
    focusAreas: ['Autonomous Systems Architecture', 'Cross-Subsidiary Synergy', 'Sovereign Defense Industrial Base'],
    quote: 'True conglomerate resilience comes from deep engineering integration, not financial engineering. We engineer what matters.',
    boardSeats: ['AeroPulse Dynamics (Chair)', 'CyberKinetic Robotics', 'Vanguard Heavy Rail'],
    tenure: 'Founding Partner (2014–Present)',
    dossier: {
      fullBio: 'Dr. Elena Rostova co-founded Quad Engineers in 2014 after fourteen years spearheading classified hypersonics and autonomous aerospace platforms. Recognizing that modern industrial prime contractors were becoming overly financialized and detached from fundamental physics, Elena conceived Quad as a pure-play engineering holding company. Under her executive stewardship, Quad has grown from a seed holding fund into a multi-billion dollar diversified industrial powerhouse controlling critical infrastructure across aerospace, robotics, clean energy, and heavy transport.',
      patentsAndDeals: 'Holds 28 aerospace patents in distributed fly-by-wire flight control and fault-tolerant multi-agent avionics. Architected the $1.2B acquisition and restructuring of Vanguard Rail and the founding carve-out of AeroPulse Dynamics.',
      governancePhilosophy: 'Engineers on the Board. Every Quad subsidiary board must maintain a minimum 60% representation of credentialed engineers with direct domain expertise, eliminating layer-upon-layer of detached non-technical bureaucracy.',
      keyInitiatives2026: [
        'Rollout of Quad Common Autonomous Operating Fabric across all aerospace and marine subsidiaries',
        'Capital expenditure ramp of $340M toward vertical integration of titanium additive manufacturing',
        'Sovereign dual-use certification for North American and European defense supply alliances'
      ],
      academicCredentials: [
        'Ph.D., Aerospace Systems Engineering, Massachusetts Institute of Technology (2001)',
        'M.S., Aeronautics & Astronautics, California Institute of Technology (1997)',
        'B.S., Applied Physics, Carnegie Mellon University (1995)'
      ]
    }
  },
  {
    id: 'marcus-vance',
    name: 'Dr. Marcus Vance',
    role: 'Chief Technology Officer & Co-Founder',
    title: 'Hardware Pioneer & Chief Scientist',
    initials: 'MV',
    gradient: 'from-amber-500/20 via-orange-600/10 to-transparent',
    accentColor: '#f59e0b',
    academic: 'Ph.D. in Mechanical Engineering & Robotics, Stanford University',
    prior: 'Former DARPA Robotics Lead & Director of Applied Cybernetics at SRI International',
    focusAreas: ['Industrial Humanoid Actuation', 'Cryogenic Thermal Physics', 'High-Density Compute Hardware'],
    quote: 'If an engineering challenge violates no laws of thermodynamics, it is merely an unresolved problem of precision tooling and software architecture.',
    boardSeats: ['CyberKinetic Robotics (Chair)', 'HyperScale Cryo-Cooling', 'BioSynthetica Materials'],
    tenure: 'Founding Partner (2014–Present)',
    dossier: {
      fullBio: 'Dr. Marcus Vance is the technical bedrock of Quad Engineers. Prior to co-founding Quad, he led landmark DARPA robotics challenges and pioneered high-torque harmonic drive actuators that today power mission-critical automated factory floors globally. Marcus chairs the Quad Technical Council, a bi-weekly summit of chief scientists across all seven subsidiaries that facilitates rapid horizontal IP transfer and proprietary hardware modularity.',
      patentsAndDeals: 'Over 140 granted patents spanning harmonic gearboxes, cryogenic micro-channel heat sinks, brushless DC motor controllers, and autonomous subsea positioning. Spearheaded Quad’s proprietary cryogenic patents underpinning HyperScale Cryo-Cooling.',
      governancePhilosophy: 'Radical IP Portability. Breakthrough discoveries in one portfolio subsidiary (such as thermal cooling in quantum chips) must be open-licensed horizontally across sister companies (such as aerospace engine thermal management).',
      keyInitiatives2026: [
        'Next-generation 400A solid-state actuator rollout for CyberKinetic industrial manipulators',
        'Sub-Kelvin closed-cycle cryogenic chiller deployment for sovereign AI compute clusters',
        'Establishment of the Quad Advanced Metrology & Materials Testing Facility in Zurich'
      ],
      academicCredentials: [
        'Ph.D., Mechanical Engineering (Robotics & Mechatronics), Stanford University (2004)',
        'M.S., Electrical Engineering, Stanford University (2000)',
        'B.S., Mechanical Engineering, University of Michigan (1998)'
      ]
    }
  },
  {
    id: 'priya-sunderam',
    name: 'Priya Sunderam, CFA',
    role: 'Chief Financial Officer & Co-Founder',
    title: 'Capital Strategist & Chief M&A Officer',
    initials: 'PS',
    gradient: 'from-emerald-500/20 via-teal-600/10 to-transparent',
    accentColor: '#10b981',
    academic: 'MBA in Finance with Distinction, Wharton School · B.Tech Mechanical Engineering, IIT Madras',
    prior: 'Former Managing Director, Infrastructure & Energy Private Equity, Blackstone Group',
    focusAreas: ['Balance Sheet Optimization', 'Asset-Heavy Debt Structuring', 'Long-Horizon Capital Allocation'],
    quote: 'We deploy capital with thirty-year horizon conviction. Our subsidiaries do not answer to the whims of quarterly sentiment, but to compounding free cash flow.',
    boardSeats: ['TerraWatt Grid Solutions', 'Vanguard Heavy Rail', 'OmniNav Marine Autonomous'],
    tenure: 'Founding Partner (2014–Present)',
    dossier: {
      fullBio: 'Priya Sunderam combines rigorous mechanical engineering training with master-class financial stewardship. At Blackstone, she structured over $18B in cross-border energy and industrial acquisitions before joining forces with Elena, Marcus, and Henrik to build Quad Engineers. Priya established the Quad Capital Framework: allocating 65% of subsidiary free cash flow back into high-IRR R&D and manufacturing capacity while maintaining pristine balance sheet leverage and robust corporate liquidity.',
      patentsAndDeals: 'Orchestrated the syndication of Quad’s $4.5B low-cost credit facility backed by industrial real estate assets and long-term utility power purchase agreements. Led seven successful bolt-on acquisitions without issuing dilutive common parent stock.',
      governancePhilosophy: 'Primacy of Compounded Cash Returns. No financial engineering tricks or excessive leverage. Subsidiaries are capitalized conservatively so they can aggressively invest during industrial downturns when competitors retreat.',
      keyInitiatives2026: [
        'Green Infrastructure Bond issuance ($750M) for TerraWatt utility storage expansion',
        'Execution of bilateral currency hedging facility for cross-Atlantic aerospace deliveries',
        'Consolidated treasury automated netting platform reducing subsidiary foreign exchange drag by $24M annually'
      ],
      academicCredentials: [
        'MBA, Finance & Strategic Management, The Wharton School of the University of Pennsylvania (2003)',
        'B.Tech, Mechanical Engineering, Indian Institute of Technology Madras (1998)',
        'Chartered Financial Analyst (CFA) Charterholder'
      ]
    }
  },
  {
    id: 'henrik-lindqvist',
    name: 'Henrik Lindqvist',
    role: 'Chief Operating Officer & Co-Founder',
    title: 'Industrial Operations Architect & Group COO',
    initials: 'HL',
    gradient: 'from-violet-500/20 via-purple-600/10 to-transparent',
    accentColor: '#8b5cf6',
    academic: 'M.Sc. Industrial Engineering & Operations Research, KTH Royal Institute of Technology, Stockholm',
    prior: 'Former Chief Operating Officer, ABB Industrial Automation & Global VP of Manufacturing, Northvolt',
    focusAreas: ['Gigafactory Manufacturing', 'High-Tolerance Quality Systems', 'Global Resilient Supply Chains'],
    quote: 'An elegant design on paper is a hypothesis; producing 50,000 flawless assemblies a week within two microns of tolerance is industrial mastery.',
    boardSeats: ['TerraWatt Grid Solutions (Chair)', 'AeroPulse Dynamics', 'OmniNav Marine Autonomous'],
    tenure: 'Founding Partner (2014–Present)',
    dossier: {
      fullBio: 'Henrik Lindqvist is one of Europe and North America’s most respected industrial operations leaders. He has designed and commissioned 26 major manufacturing campuses and gigafactories across three continents over a 25-year career. At Quad Engineers, Henrik governs operational health across 48 manufacturing facilities, standardizing lean high-precision assembly lines, ISO 9001/AS9100 quality rigor, and automated predictive maintenance loops.',
      patentsAndDeals: 'Designed the proprietary "Quad Production System" (QPS), which reduced subsidiary manufacturing cycle times by an average of 34% within 18 months of acquisition. Chaired the commissioning of TerraWatt’s 40 GWh Swedish cell plant.',
      governancePhilosophy: 'Factory-Floor Accountability. Senior Quad executives spend at least 25% of their working time inside subsidiary cleanrooms, foundries, and assembly hangars alongside frontline floor engineers.',
      keyInitiatives2026: [
        'Deployment of automated optical inspection (AOI) with sub-micron laser triangulation across all plants',
        'Dual-sourcing transition for 100% of critical rare earth magnets and structural titanium',
        'Group-wide carbon neutrality operational program targeting zero Scope 1 and Scope 2 emissions by 2028'
      ],
      academicCredentials: [
        'M.Sc., Industrial Engineering & Production Management, KTH Royal Institute of Technology, Stockholm (1999)',
        'Executive Program in Global Supply Chain Operations, INSEAD (2005)',
        'Certified Six Sigma Black Belt & Lean Master'
      ]
    }
  }
];

export const INITIAL_SUBSIDIARIES: Subsidiary[] = [
  {
    id: 'sub-aeropulse',
    name: 'AeroPulse Dynamics',
    code: 'APD',
    sector: 'Aerospace & Defense',
    ownershipPercent: 84,
    valuation: 4250, // $4.25B
    annualRevenue: 840, // $840M
    ebitdaMargin: 24.8,
    growthRate: 28.5,
    headcount: 2480,
    ceo: 'Claire Moreau',
    hq: 'Toulouse, France & Seattle, WA',
    foundedYear: 2012,
    acquiredYear: 2016,
    status: 'Scale',
    governanceHealth: 'Exceptional',
    description: 'Pioneering supersonic autonomous transport systems, tactical unmanned atmospheric platforms, and modular hybrid turbofan propulsion.',
    keyDivisions: ['Autonomous Flight Avionics', 'High-Temp Turbine Materials', 'Tactical Unmanned Systems'],
    boardLead: 'Dr. Elena Rostova',
    capexAllocation: 145,
    livePriceIndex: 124.6,
    dailyChange: 2.1,
    cashReserves: 210,
    debtToEquity: 0.38,
    quarterlyRevenue: [
      { quarter: 'Q1', revenue: 195, ebitda: 48 },
      { quarter: 'Q2', revenue: 205, ebitda: 51 },
      { quarter: 'Q3', revenue: 215, ebitda: 54 },
      { quarter: 'Q4', revenue: 225, ebitda: 55 }
    ]
  },
  {
    id: 'sub-terrawatt',
    name: 'TerraWatt Grid Solutions',
    code: 'TWG',
    sector: 'Clean Energy & Grid',
    ownershipPercent: 100,
    valuation: 3820,
    annualRevenue: 660,
    ebitdaMargin: 20.2,
    growthRate: 34.2,
    headcount: 1840,
    ceo: 'Dr. Aris Thorne',
    hq: 'Gothenburg, Sweden & Austin, TX',
    foundedYear: 2015,
    acquiredYear: 2018,
    status: 'Expansion',
    governanceHealth: 'Exceptional',
    description: 'Utility-scale iron-flow and sodium battery energy storage architectures, smart high-voltage DC substations, and grid stability software.',
    keyDivisions: ['Long-Duration Flow Batteries', 'HVDC Inverter Hardware', 'Autonomous Grid Dispatch AI'],
    boardLead: 'Henrik Lindqvist',
    capexAllocation: 190,
    livePriceIndex: 138.2,
    dailyChange: 3.4,
    cashReserves: 340,
    debtToEquity: 0.42,
    quarterlyRevenue: [
      { quarter: 'Q1', revenue: 140, ebitda: 28 },
      { quarter: 'Q2', revenue: 160, ebitda: 32 },
      { quarter: 'Q3', revenue: 175, ebitda: 36 },
      { quarter: 'Q4', revenue: 185, ebitda: 37 }
    ]
  },
  {
    id: 'sub-cyberkinetic',
    name: 'CyberKinetic Robotics',
    code: 'CKR',
    sector: 'Industrial Robotics',
    ownershipPercent: 72,
    valuation: 2980,
    annualRevenue: 430,
    ebitdaMargin: 16.5,
    growthRate: 41.8,
    headcount: 990,
    ceo: 'Kenji Takahashi',
    hq: 'Nagoya, Japan & Pittsburgh, PA',
    foundedYear: 2017,
    acquiredYear: 2020,
    status: 'Expansion',
    governanceHealth: 'Strong',
    description: 'High-payload humanoid industrial manipulators, micro-precision assembly cobots, and deterministic real-time motion control firmware.',
    keyDivisions: ['Bipedal Industrial Humanoids', 'Force-Torque Haptic Grippers', 'Fleet Tele-Operation'],
    boardLead: 'Dr. Marcus Vance',
    capexAllocation: 88,
    livePriceIndex: 145.8,
    dailyChange: 4.8,
    cashReserves: 145,
    debtToEquity: 0.28,
    quarterlyRevenue: [
      { quarter: 'Q1', revenue: 85, ebitda: 14 },
      { quarter: 'Q2', revenue: 100, ebitda: 16 },
      { quarter: 'Q3', revenue: 115, ebitda: 19 },
      { quarter: 'Q4', revenue: 130, ebitda: 22 }
    ]
  },
  {
    id: 'sub-vanguard',
    name: 'Vanguard Heavy Rail & Transit',
    code: 'VHR',
    sector: 'High-Speed Rail & Transit',
    ownershipPercent: 92,
    valuation: 5350,
    annualRevenue: 1180,
    ebitdaMargin: 29.4,
    growthRate: 14.1,
    headcount: 4200,
    ceo: 'Gottfried Weber',
    hq: 'Munich, Germany & Chicago, IL',
    foundedYear: 1998,
    acquiredYear: 2017,
    status: 'Mature',
    governanceHealth: 'Exceptional',
    description: 'Next-generation electrified high-speed bogies, automated train protection signaling (ETCS-3), and maglev linear motor propulsion.',
    keyDivisions: ['Maglev Propulsion Systems', 'Automated Train Signaling', 'Heavy Freight Bogie Works'],
    boardLead: 'Priya Sunderam, CFA',
    capexAllocation: 160,
    livePriceIndex: 112.5,
    dailyChange: 0.8,
    cashReserves: 480,
    debtToEquity: 0.55,
    quarterlyRevenue: [
      { quarter: 'Q1', revenue: 285, ebitda: 84 },
      { quarter: 'Q2', revenue: 290, ebitda: 85 },
      { quarter: 'Q3', revenue: 300, ebitda: 88 },
      { quarter: 'Q4', revenue: 305, ebitda: 90 }
    ]
  },
  {
    id: 'sub-hyperscale',
    name: 'HyperScale Cryo-Cooling',
    code: 'HSC',
    sector: 'Semiconductors & Cryogenics',
    ownershipPercent: 66,
    valuation: 1820,
    annualRevenue: 310,
    ebitdaMargin: 22.8,
    growthRate: 46.5,
    headcount: 640,
    ceo: 'Dr. Sarah Lin',
    hq: 'Hsinchu, Taiwan & San Jose, CA',
    foundedYear: 2019,
    acquiredYear: 2022,
    status: 'Scale',
    governanceHealth: 'Strong',
    description: 'Direct-to-chip two-phase dielectric liquid immersion and sub-Kelvin closed-loop refrigeration for wafer-scale AI accelerators and quantum processors.',
    keyDivisions: ['Two-Phase Liquid Immersion', 'Cryogenic Helium Compressors', 'Microchannel Cold Plates'],
    boardLead: 'Dr. Marcus Vance',
    capexAllocation: 75,
    livePriceIndex: 154.2,
    dailyChange: 5.2,
    cashReserves: 95,
    debtToEquity: 0.22,
    quarterlyRevenue: [
      { quarter: 'Q1', revenue: 60, ebitda: 13 },
      { quarter: 'Q2', revenue: 75, ebitda: 17 },
      { quarter: 'Q3', revenue: 85, ebitda: 20 },
      { quarter: 'Q4', revenue: 90, ebitda: 21 }
    ]
  },
  {
    id: 'sub-biosynthetica',
    name: 'BioSynthetica Materials',
    code: 'BSM',
    sector: 'Advanced Materials',
    ownershipPercent: 80,
    valuation: 1460,
    annualRevenue: 195,
    ebitdaMargin: 14.6,
    growthRate: 26.2,
    headcount: 480,
    ceo: 'Mateo Alvarez',
    hq: 'Basel, Switzerland & Boston, MA',
    foundedYear: 2018,
    acquiredYear: 2021,
    status: 'Expansion',
    governanceHealth: 'Strong',
    description: 'High-modulus carbon-negative bio-resins, self-healing aerospace matrix laminates, and continuous silicon-carbide ceramic matrix fibers.',
    keyDivisions: ['Bio-Resin Aerostructures', 'SiC Ceramic Fibers', 'Structural Conductive Polymers'],
    boardLead: 'Dr. Marcus Vance',
    capexAllocation: 48,
    livePriceIndex: 119.4,
    dailyChange: 1.6,
    cashReserves: 78,
    debtToEquity: 0.31,
    quarterlyRevenue: [
      { quarter: 'Q1', revenue: 42, ebitda: 6 },
      { quarter: 'Q2', revenue: 48, ebitda: 7 },
      { quarter: 'Q3', revenue: 52, ebitda: 8 },
      { quarter: 'Q4', revenue: 53, ebitda: 7.5 }
    ]
  },
  {
    id: 'sub-omninav',
    name: 'OmniNav Marine Autonomous',
    code: 'ONM',
    sector: 'Autonomous Marine',
    ownershipPercent: 78,
    valuation: 2140,
    annualRevenue: 355,
    ebitdaMargin: 23.4,
    growthRate: 22.0,
    headcount: 910,
    ceo: 'Astrid Lind',
    hq: 'Oslo, Norway & Singapore',
    foundedYear: 2016,
    acquiredYear: 2021,
    status: 'Scale',
    governanceHealth: 'Exceptional',
    description: 'Uncrewed container vessel propulsion units, deep-ocean bathymetric surveying submersibles, and autonomous docking robotic tugs.',
    keyDivisions: ['Autonomous Cargo Tugs', 'Deep Submersible Systems', 'Acoustic Subsea Telemetry'],
    boardLead: 'Henrik Lindqvist',
    capexAllocation: 62,
    livePriceIndex: 128.0,
    dailyChange: 1.9,
    cashReserves: 112,
    debtToEquity: 0.36,
    quarterlyRevenue: [
      { quarter: 'Q1', revenue: 80, ebitda: 18 },
      { quarter: 'Q2', revenue: 88, ebitda: 21 },
      { quarter: 'Q3', revenue: 92, ebitda: 22 },
      { quarter: 'Q4', revenue: 95, ebitda: 22 }
    ]
  }
];

export const INITIAL_EVENTS: FinancialEvent[] = [
  {
    id: 'evt-001',
    timestamp: '1 min ago',
    unixTime: Date.now() - 60000,
    subsidiaryId: 'sub-aeropulse',
    subsidiaryName: 'AeroPulse Dynamics',
    code: 'APD',
    category: 'Earnings',
    headline: 'Secures $115M defense avionic contract for NATO multi-role tactical drones',
    financialImpact: '+$115.0M Backlog',
    type: 'positive',
    details: 'Firm fixed-price production delivery covering 2026-2028; projected gross margin expected to exceed 32%.'
  },
  {
    id: 'evt-002',
    timestamp: '4 min ago',
    unixTime: Date.now() - 240000,
    subsidiaryId: 'sub-hyperscale',
    subsidiaryName: 'HyperScale Cryo-Cooling',
    code: 'HSC',
    category: 'Valuation',
    headline: 'Secondary transaction values entity at $1.82B following Tier-1 Cloud AI deployment',
    financialImpact: '+$160M Equity Mark',
    type: 'positive',
    details: 'Tier-1 hyperscaler signs enterprise supply agreement for two-phase immersion systems in 4 new regional mega-datacenters.'
  },
  {
    id: 'evt-003',
    timestamp: '11 min ago',
    unixTime: Date.now() - 660000,
    subsidiaryId: 'sub-vanguard',
    subsidiaryName: 'Vanguard Heavy Rail & Transit',
    code: 'VHR',
    category: 'Dividend',
    headline: 'Approves $42.5M quarterly capital distribution to Quad Engineers Treasury',
    financialImpact: '$42.5M Group Cashflow',
    type: 'positive',
    details: 'Full repayment of subordinated shareholder note and distribution of accrued operating surplus from European operations.'
  },
  {
    id: 'evt-004',
    timestamp: '25 min ago',
    unixTime: Date.now() - 1500000,
    subsidiaryId: 'sub-terrawatt',
    subsidiaryName: 'TerraWatt Grid Solutions',
    code: 'TWG',
    category: 'Capex',
    headline: 'Quad Board sanctions $65M Phase II automation of Gothenburg battery line',
    financialImpact: '$65M Capex Outlay',
    type: 'neutral',
    details: 'Facility expansion increases annualized sodium-ion pack output from 12 GWh to 28 GWh by late 2027.'
  },
  {
    id: 'evt-005',
    timestamp: '42 min ago',
    unixTime: Date.now() - 2520000,
    subsidiaryId: 'sub-cyberkinetic',
    subsidiaryName: 'CyberKinetic Robotics',
    code: 'CKR',
    category: 'Operational',
    headline: 'Deploys 200th industrial humanoid at automotive partner assembly line in Michigan',
    financialImpact: '+85 bps Line Efficiency',
    type: 'positive',
    details: 'Zero reported hardware downtime across 140,000 continuous operating hours; client exercises option for 400 additional units.'
  },
  {
    id: 'evt-006',
    timestamp: '1 hr ago',
    unixTime: Date.now() - 3600000,
    subsidiaryId: 'sub-biosynthetica',
    subsidiaryName: 'BioSynthetica Materials',
    code: 'BSM',
    category: 'M&A',
    headline: 'Completes tuck-in acquisition of Zurich Nanotech patent portfolio for $14.2M',
    financialImpact: '+$14.2M Asset Addition',
    type: 'positive',
    details: 'Acquires 12 fundamental European patents governing ultra-high tensile carbon nanotube yarn weaving.'
  },
  {
    id: 'evt-007',
    timestamp: '2 hr ago',
    unixTime: Date.now() - 7200000,
    subsidiaryId: 'sub-omninav',
    subsidiaryName: 'OmniNav Marine Autonomous',
    code: 'ONM',
    category: 'Earnings',
    headline: 'Delivers first autonomous electric feeder barge to North Sea shipping consortium',
    financialImpact: '+$38.0M Revenue Milestone',
    type: 'positive',
    details: 'Demonstrates full commercial transit without human crew intervention across 420 nautical miles in sea state 5.'
  }
];

export const SIMULATION_TEMPLATES = [
  {
    subsidiaryId: 'sub-terrawatt',
    subsidiaryName: 'TerraWatt Grid Solutions',
    code: 'TWG',
    category: 'Earnings' as const,
    headline: 'Signs 1.2 GWh storage pact with Nordic Energy Grid Authority',
    financialImpact: '+$94.0M Backlog',
    type: 'positive' as const,
    details: 'Delivery schedule scheduled across four quarters, accelerating full-year cash generation.',
    revenueBump: 18,
    marginBump: 0.4
  },
  {
    subsidiaryId: 'sub-aeropulse',
    subsidiaryName: 'AeroPulse Dynamics',
    code: 'APD',
    category: 'Operational' as const,
    headline: 'Completes Mach 4.2 wind tunnel certification for scramjet hybrid duct',
    financialImpact: 'Milestone Unlocked',
    type: 'positive' as const,
    details: 'Defense research arm approves advance payment disbursement of $34.5M.',
    revenueBump: 12,
    marginBump: 0.3
  },
  {
    subsidiaryId: 'sub-cyberkinetic',
    subsidiaryName: 'CyberKinetic Robotics',
    code: 'CKR',
    category: 'Valuation' as const,
    headline: 'Series C investor syndicate reprices valuation to $3.15B (+5.7%)',
    financialImpact: '+$170M Valuation Uplift',
    type: 'positive' as const,
    details: 'Reinforces Quad Engineers holding net asset value without capital dilution.',
    revenueBump: 0,
    marginBump: 0.2
  },
  {
    subsidiaryId: 'sub-hyperscale',
    subsidiaryName: 'HyperScale Cryo-Cooling',
    code: 'HSC',
    category: 'Dividend' as const,
    headline: 'Issues interim $12.0M dividend payment to Quad treasury',
    financialImpact: '$12.0M Cashflow',
    type: 'positive' as const,
    details: 'Operating cash conversion hits 94% on strong enterprise customer billings.',
    revenueBump: 5,
    marginBump: 0.5
  },
  {
    subsidiaryId: 'sub-vanguard',
    subsidiaryName: 'Vanguard Heavy Rail & Transit',
    code: 'VHR',
    category: 'Capex' as const,
    headline: 'Allocates $45M for automated maglev testing track outside Nuremberg',
    financialImpact: '$45M Capital Outlay',
    type: 'neutral' as const,
    details: 'Supported by federal industrial infrastructure grants covering 40% of civil construction costs.',
    revenueBump: 8,
    marginBump: 0.1
  },
  {
    subsidiaryId: 'sub-biosynthetica',
    subsidiaryName: 'BioSynthetica Materials',
    code: 'BSM',
    category: 'Operational' as const,
    headline: 'Achieves aerospace flight-readiness clearance for bio-polymer winglet fairing',
    financialImpact: 'AS9100 Verified',
    type: 'positive' as const,
    details: 'Commercial airliner OEM authorizes standard production fitment across 350 airframes.',
    revenueBump: 14,
    marginBump: 0.6
  }
];
