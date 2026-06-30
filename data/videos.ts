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

// 2025 Summit videos (recap first, then chronological order from the playlist)
export const summit2025Videos: Video[] = [
  {
    id: 'hps25-recap',
    title: 'Heatpunk Summit 2025 Recap',
    description: 'Full recap from Heatpunk Summit 2025 in Denver — the first annual gathering of bitcoin mining and heating industry builders.',
    youtubeId: 'c-NrYzmPRv8',
  },
  {
    id: 'hps25-opening',
    title: 'UnderMine 2025 Opening Remarks',
    description: 'Opening remarks with Cody Harris and Tyler Stevens launching the first-ever Heatpunk Summit — then branded "UnderMine" — in Denver.',
    youtubeId: 'UgL4H89O73c',
  },
  {
    id: 'hps25-talk-02',
    title: 'Overview of Bitcoin Mining for Novices',
    description: 'A foundational session breaking down how Bitcoin mining works for attendees new to the technical side of proof-of-work.',
    youtubeId: 'tR0tAfxsuSs',
  },
  {
    id: 'hps25-talk-03',
    title: 'Exploring the Heat Reuse Potential of Bitcoin Mining',
    description: 'A deep look at the opportunity: how waste heat from ASIC miners can be captured and redirected as useful thermal energy for homes and businesses.',
    youtubeId: 'f3e96xtfFg4',
  },
  {
    id: 'hps25-talk-04',
    title: 'Bitcoin Mining Business Models Roundtable',
    description: 'Roundtable discussion exploring the different business models emerging around bitcoin mining — from residential heat reuse to commercial-scale operations.',
    youtubeId: 'aeEIgNOcPB0',
  },
  {
    id: 'hps25-talk-05',
    title: 'Bitcoin Mining Heat Reuse Book Release',
    description: 'Tyler Stevens presents the release of "Bitcoin Mining Heat Reuse" — a comprehensive guide to understanding and implementing hashrate heating solutions.',
    youtubeId: '91Db7ckw3XQ',
  },
  {
    id: 'hps25-talk-06',
    title: 'Small-Scale Bitcoin Mining Panel',
    description: 'Panel discussion on the realities, challenges, and opportunities of small-scale residential and small-business bitcoin mining.',
    youtubeId: '5TwnzMPvjP0',
  },
  {
    id: 'hps25-talk-07',
    title: 'Exploring the Bitcoin Mining Adoption Landscape',
    description: 'An examination of where bitcoin mining adoption stands — who is building, who is buying, and what barriers remain to mainstream hashrate heating.',
    youtubeId: 'G3zLz-8cB_I',
  },
  {
    id: 'hps25-talk-08',
    title: "The Heatpunk's Manifesto",
    description: 'A defining session articulating the philosophy and mission behind the heatpunk movement — why bringing bitcoin mining back to homes and businesses matters.',
    youtubeId: 'otYQgWMFlJ8',
  },
  {
    id: 'hps25-talk-09',
    title: 'Controlling Hashrate Heaters',
    description: 'Technical discussion on control systems for hashrate heating — thermostats, automation, and integration with existing HVAC infrastructure.',
    youtubeId: '1SLPMWANvoU',
  },
  {
    id: 'hps25-talk-10',
    title: 'Debate on Bitcoin Mining Heat Delivery Systems',
    description: 'An open debate comparing different approaches to heat delivery from bitcoin mining systems — air, water, and hybrid configurations.',
    youtubeId: '5kMTeJmEe7Q',
  },
  {
    id: 'hps25-talk-11',
    title: 'Bitcoin Mining Firmware Discussion',
    description: 'A technical session on mining firmware — the software layer controlling ASIC behavior, and opportunities for open-source development tailored to heating applications.',
    youtubeId: 'jocM1WBbbTA',
  },
  {
    id: 'hps25-talk-12',
    title: 'Datum Setup Tutorial with Bitcoin Mechanic',
    description: 'Hands-on tutorial walking through the setup and configuration of Datum, an open-source mining pool protocol, with the Bitcoin Mechanic.',
    youtubeId: 'T5soho5GL2w',
  },
  {
    id: 'hps25-talk-13',
    title: 'The Bitcoin ASIC Frontier',
    description: 'An exploration of the state of ASIC hardware — what chips exist, what is coming, and how the hardware landscape shapes the future of hashrate heating.',
    youtubeId: 'E6FjPhL5xWo',
  },
  {
    id: 'hps25-talk-14',
    title: 'What Are the Challenges Ahead for Hashrate Heating?',
    description: 'A candid closing session identifying the biggest technical, regulatory, and commercial obstacles facing the hashrate heating industry.',
    youtubeId: 'xarEPPMGdxU',
  },
];

// Backwards-compat alias
export const summitVideos = summit2025Videos;

// Featured video for education page
export const featuredEducationVideo: Video = summit2025Videos[0];
