export interface Video {
  id: string;
  title: string;
  description?: string;
  youtubeId: string;
}

// 2026 Summit videos (recap first, then ordered chronologically: keynote → talks → award → workshops)
export const summit2026Videos: Video[] = [
  {
    id: 'hps26-recap',
    title: 'Heatpunk Summit 2026 Recap',
    description: 'A short recap film capturing the energy of Heatpunk Summit 2026 in Denver — the second annual gathering of bitcoin mining and heating builders advancing the hashrate heating industry.',
    youtubeId: 'PsRaSv3Y0_k',
  },
  {
    id: 'hps26-keynote',
    title: 'Welcome Remarks & Defining An Industry Keynote',
    description: 'Tyler Stevens grounds attendees in the fundamentals and sets the stage for the 2026 Heatpunk Summit — launching the second annual gathering of bitcoin mining and heating experts to advance the emerging hashrate heating industry.',
    youtubeId: '0Z99qdTS4x8',
  },
  {
    id: 'hps26-talk-02',
    title: 'What Can You Build? Product Development',
    description: 'Explore the realities of engineering heating appliances powered by industrial ASIC miners — locked-down firmware, non-standard form factors, certification hurdles, and pathways to scaling distribution through traditional HVAC & plumbing channels.',
    youtubeId: 'QodHeWZu6-g',
  },
  {
    id: 'hps26-talk-03',
    title: 'Large Scale Heatpunks: Mining or Heating?',
    description: 'At industrial scale, is hashrate heating a mining operation that sells heat, or a heating utility subsidized by mining? Examines viability thresholds, heat sink matching, MW requirements, revenue splits, and hardware constraints.',
    youtubeId: 'AztBa4qPpiY',
  },
  {
    id: 'hps26-talk-04',
    title: 'Building With Intention: The Architect / Home Builder Perspective',
    description: 'Architects and builders discuss earning buy-in: translating Bitcoin\'s value proposition into client-facing benefits, navigating MEP coordination, resolving certification gaps, and transforming prototypes into viable architectural specifications.',
    youtubeId: 'DSwNslNiUN8',
  },
  {
    id: 'hps26-talk-05',
    title: 'Set & Forget: Ideal Control for Hashrate Heat',
    description: 'Dissecting control philosophy for hashrate heating: analog reliability vs. digital optimization, KISS principles vs. grid-aware automation, standardization (BACNet/Home Assistant) vs. custom hacks, and whether smarter control truly delivers tighter thermal performance.',
    youtubeId: 'tIJDsZ7fzqw',
  },
  {
    id: 'hps26-talk-06',
    title: 'Chips on the Table: Home-Mining Hardware & ASICs For All',
    description: 'Canaan and Bitaxe explore last-gen silicon for affordable heat reuse, Avalon hardware in certified heating systems, and how open-source efforts like the 256 Foundation can align corporate scale with heatpunk needs.',
    youtubeId: 'OZ954alVytM',
  },
  {
    id: 'hps26-talk-07',
    title: 'Boots on the Ground: Heatpunk Installer Success',
    description: 'Field-tested installers break down regulatory tangles, revenue-sharing models, failures, and sales tactics for skeptical clients — battle-tested insights from retrofitting homes and businesses with hardware that pays back.',
    youtubeId: 'gqJW1mlPbZ8',
  },
  {
    id: 'hps26-talk-08',
    title: 'The Sovereign Smart Home: Smart Heat, AI and Controlling your Data',
    description: 'Integrating hashrate heaters with home servers and private AI into a unified sovereign stack — energy, money, data, and heat. Architectures that make homes grid-optional, corporate-middleware-free, and intelligently adaptive.',
    youtubeId: 'K9lZusJSz5c',
  },
  {
    id: 'hps26-talk-09',
    title: 'Heatpunk & Human Rights: The Freedom Tech Angle',
    description: 'Exiled Russian activist Anna Chekhovich reframes hashrate heating as essential human rights technology — how residential miners enable private, non-KYC bitcoin acquisition for at-risk populations facing censorship and asset seizure.',
    youtubeId: '2ro83M_rUR4',
  },
  {
    id: 'hps26-talk-10',
    title: 'Building the Heatpunk Workforce',
    description: 'Mapping workforce gaps for scaling hashrate heating: training plumbers as micro-mine operators, adapting industrial mining repair programs for residential systems, and forging university partnerships to advance ASIC-as-heater R&D.',
    youtubeId: 'yua2M13XEjw',
  },
  {
    id: 'hps26-talk-11',
    title: 'Cutting Through Regulatory BS: The Path to Scalable Heatpunk',
    description: 'CPA, state official, Bitcoin lobbyist, and specialty insurer confront the existential regulatory hurdles: taxing hidden mining revenue, certifications, environmental debates, and turning fringe tech into insurable, code-compliant primary heating.',
    youtubeId: 'geMRKorVKmQ',
  },
  {
    id: 'hps26-talk-12',
    title: 'The Asset-Liability Flip: When Buildings Print Money',
    description: 'When heating systems generate bitcoin revenue, real estate economics transform. Mortgage lenders, resort owners, and VCs dissect construction debt structuring, property NOI boosts, and self-liquidating infrastructure that treats miners as appreciating collateral.',
    youtubeId: 'eeEZIJ78W-0',
  },
  {
    id: 'hps26-talk-13',
    title: 'Precision BTU: The Economics of BTC Heater Sizing & Custom Systems',
    description: 'Properly sizing hashrate heating: modeling hourly thermal demand profiles, CAPEX tradeoffs between new vs. depreciated ASICs, duty-cycle optimization, and hybrid integration strategies to maximize hardware utilization.',
    youtubeId: 'J7W-ZTTalys',
  },
  {
    id: 'hps26-talk-14',
    title: 'Your Heat, Hash & Rules: Pool Payout Sovereignty for Heatpunks',
    description: 'Pool payout mechanics for intermittent miners: Ocean\'s Tides, FPPS stability vs. Stratum V2 job negotiation, custodial risk vs. e-hash flexibility, and which structures minimize the intermittency tax while maximizing sovereignty.',
    youtubeId: '8HtS6QTYTUo',
  },
  {
    id: 'hps26-talk-15',
    title: 'Dismantling the Proprietary Mining Empire: This is the 256 Foundation',
    description: 'The 256 Foundation is rebuilding mining\'s core stack as open infrastructure: HydraPool, Mujina firmware, Ember One hashboard, and Libre Board controller — returning mining to its trustless roots and eliminating backdoors.',
    youtubeId: 'evlNZsmOYW8',
  },
  {
    id: 'hps26-talk-16',
    title: 'Closing Remarks & Calls to Action',
    description: 'Hosts Tyler Stevens, Dylan Seib, and Cody Harris conclude the 2026 Heatpunk Summit with concrete initiatives: deploy open-source standards, forge industry partnerships, and dismantle regulatory barriers to bring mining back to homes as heating infrastructure.',
    youtubeId: 'zdrAf_a3tH4',
  },
  {
    id: 'hps26-award',
    title: 'Heatpunk Innovation Award Announcement',
    description: 'Debut of the inaugural Heatpunk Hardware Award — recognizing the most innovative hashrate heating system showcased on-site at HPS 2026. Winner selected live during proceedings.',
    youtubeId: 'dNKZhRVaXbM',
  },
  {
    id: 'hps26-workshop-01',
    title: 'Home Assistant Deep Dive: Automating Hashrate Heat as IOT Devices',
    description: 'Led by Exergy\'s Dylan, this workshop integrates miners directly into Home Assistant — building local automations triggered by thermostats, solar production, or energy prices. Zero cloud required.',
    youtubeId: 'k_x48ErmSh8',
  },
  {
    id: 'hps26-workshop-02',
    title: 'Heatpunk Hydronics: Boiler Walkthrough',
    description: 'Walk through Exergy\'s real-world installation: a water-cooled Bitcoin miner heating The Space\'s radiant floors via a hydronic loop. Workshop solutions to replicate traditional boiler logic atop hashrate heating.',
    youtubeId: '4FEwVYIvvSU',
  },
  {
    id: 'hps26-workshop-03',
    title: 'Intro to Mining SDK with Tether',
    description: 'Tether\'s open-source Mining SDK team explores adapting their Holepunch-based P2P platform for thermostats, circulator pumps, and district heating systems — collaborating on worker concepts that merge physical infrastructure with hashrate.',
    youtubeId: 'EtJaUA2-okg',
  },
  {
    id: 'hps26-workshop-04',
    title: 'Architect One on One with TESSERE',
    description: 'Collaboratively outlining industry standards with leading firm TESSERE: certification roadblocks, client education frameworks, and hybrid-system specifications. Audio recording.',
    youtubeId: 'j-a0Zuy4sDk',
  },
  {
    id: 'hps26-workshop-05',
    title: 'Canaan Heatpunk Workshop: Forging Home ASIC Roadmaps',
    description: 'Direct access to Canaan\'s team to discuss firmware flexibility, thermal design priorities, and hardware modularity — builder feedback to shape home-scale ASIC development. Audio recording.',
    youtubeId: 'Pm3yMge-VWo',
  },
];

// 2025 Summit videos
export const summit2025Videos: Video[] = [
  {
    id: 'featured-2025',
    title: 'Heatpunk Summit 2025 Recap',
    description: 'Full recap from Heatpunk Summit 2025 in Denver — the first annual gathering of bitcoin mining and heating industry builders.',
    youtubeId: 'c-NrYzmPRv8',
  },
  {
    id: 'panel-01',
    title: 'Panel 1',
    description: 'Session 1 — Heatpunk Summit 2025',
    youtubeId: 'UgL4H89O73c',
  },
  {
    id: 'panel-02',
    title: 'Panel 2',
    description: 'Session 2 — Heatpunk Summit 2025',
    youtubeId: 'tR0tAfxsuSs',
  },
  {
    id: 'panel-03',
    title: 'Panel 3',
    description: 'Session 3 — Heatpunk Summit 2025',
    youtubeId: 'f3e96xtfFg4',
  },
  {
    id: 'panel-04',
    title: 'Panel 4',
    description: 'Session 4 — Heatpunk Summit 2025',
    youtubeId: 'aeEIgNOcPB0',
  },
  {
    id: 'panel-05',
    title: 'Panel 5',
    description: 'Session 5 — Heatpunk Summit 2025',
    youtubeId: '91Db7ckw3XQ',
  },
  {
    id: 'panel-06',
    title: 'Panel 6',
    description: 'Session 6 — Heatpunk Summit 2025',
    youtubeId: '5TwnzMPvjP0',
  },
  {
    id: 'panel-07',
    title: 'Panel 7',
    description: 'Session 7 — Heatpunk Summit 2025',
    youtubeId: 'G3zLz-8cB_I',
  },
  {
    id: 'panel-08',
    title: 'Panel 8',
    description: 'Session 8 — Heatpunk Summit 2025',
    youtubeId: 'otYQgWMFlJ8',
  },
  {
    id: 'panel-09',
    title: 'Panel 9',
    description: 'Session 9 — Heatpunk Summit 2025',
    youtubeId: '1SLPMWANvoU',
  },
  {
    id: 'panel-10',
    title: 'Panel 10',
    description: 'Session 10 — Heatpunk Summit 2025',
    youtubeId: '5kMTeJmEe7Q',
  },
  {
    id: 'panel-11',
    title: 'Panel 11',
    description: 'Session 11 — Heatpunk Summit 2025',
    youtubeId: 'jocM1WBbbTA',
  },
  {
    id: 'panel-12',
    title: 'Panel 12',
    description: 'Session 12 — Heatpunk Summit 2025',
    youtubeId: 'T5soho5GL2w',
  },
  {
    id: 'panel-13',
    title: 'Panel 13',
    description: 'Session 13 — Heatpunk Summit 2025',
    youtubeId: 'E6FjPhL5xWo',
  },
  {
    id: 'panel-14',
    title: 'Panel 14',
    description: 'Session 14 — Heatpunk Summit 2025',
    youtubeId: 'xarEPPMGdxU',
  },
];

// Backwards-compat alias
export const summitVideos = summit2025Videos;

// Featured video for education page
export const featuredEducationVideo: Video = summit2025Videos[0];
