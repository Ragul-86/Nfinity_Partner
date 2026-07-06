// Seed data sourced verbatim from the approved Nfinity_Partner_Website_System.docx
// (Sections 0, 3.3–3.9, 3.12). One copy variant per field is selected for the
// live site; the master document retains all 10 hero/subhead/CTA options per
// page for future A/B testing once the CMS (Phase 2) ships.

export const caseStudies = [
  {
    title: 'Fashion Brand — Maternity Wear: 18X Peak Return',
    slug: 'fashion-maternity-wear',
    clientName: 'Fashion Brand',
    industry: 'Fashion',
    heroMetric: '29X Peak Return',
    summary:
      'A growing D2C fashion brand needed profitable scaling without increasing customer acquisition costs. By combining performance creatives, offer testing, and conversion-driven campaigns, we helped the brand achieve a peak return of 29X.',
    challenge:
      'A maternity-wear brand was running Meta Ads with inconsistent returns and no clear creative testing process, leaving them unsure which campaigns to scale.',
    strategy:
      'Built a structured creative-testing system paired with conversion-focused campaign architecture, targeting the specific buying triggers of the maternity audience.',
    execution:
      'Rolled out iterative creative testing cycles, refined audience segments, and restructured campaign budgets around what was actually converting profitably.',
    results: '18X peak return on ad spend, with materially reduced acquisition costs.',
    metrics: [{ label: 'Peak ROAS', after: '18X' }],
    services: ['performance-marketing'],
    isFeatured: true,
    order: 1,
    seo: {
      title: 'Fashion Brand Case Study — 18X Peak ROAS | Nfinity Partner',
      description:
        'How Nfinity Partner took a maternity-wear fashion brand to an 18X peak return on ad spend through structured creative testing.',
    },
  },
  {
    title: 'CCTV & Networking Business: ₹1Cr+ Revenue In 3 Months',
    slug: 'cctv-networking',
    clientName: 'CCTV & Networking Business',
    industry: 'CCTV & Networking',
    heroMetric: '₹1Cr+ In 3 Months',
    summary:
      'A B2B-leaning CCTV and networking business had high-intent demand but no system to qualify or convert leads efficiently. A complete Meta advertising system with built-in lead qualification generated ₹1Cr+ in revenue within 3 months.',
    challenge:
      'A B2B-leaning CCTV and networking business had high-intent demand but no system to qualify or convert leads efficiently.',
    strategy:
      'Built a complete Meta advertising system paired with a lead qualification process to filter for serious buyers.',
    execution: 'Deployed targeted lead-gen campaigns with qualification logic built directly into the funnel.',
    results: '₹1Cr+ in revenue generated within 3 months.',
    metrics: [{ label: 'Revenue', after: '₹1Cr+ in 90 days' }],
    services: ['performance-marketing'],
    isFeatured: true,
    order: 3,
    seo: {
      title: 'CCTV & Networking Case Study — ₹1Cr+ in 3 Months | Nfinity Partner',
      description:
        'How Nfinity Partner built a lead-qualification-driven Meta advertising system that generated ₹1Cr+ in revenue in 3 months.',
    },
  },
  {
    title: 'Educational Institute: ₹2Cr+ Revenue In 6 Months',
    slug: 'educational-institute',
    clientName: 'Educational Institute',
    industry: 'Education',
    heroMetric: '₹2Cr+ In 6 Months',
    summary:
      'An educational institute needed consistent, qualified enrollment leads in a competitive local market. Applying the same profit-first acquisition framework used for D2C brands generated ₹2Cr+ in revenue in 6 months.',
    challenge: 'An educational institute needed consistent, qualified enrollment leads in a competitive local market.',
    strategy: 'Applied the same profit-first acquisition framework used for D2C brands to an education-sector funnel.',
    execution: 'Built and scaled lead generation campaigns with ongoing optimization across a 6-month period.',
    results: '₹2Cr+ in revenue generated in 6 months.',
    metrics: [{ label: 'Revenue', after: '₹2Cr+ in 6 months' }],
    services: ['performance-marketing'],
    isFeatured: true,
    order: 2,
    seo: {
      title: 'Educational Institute Case Study — ₹2Cr+ in 6 Months | Nfinity Partner',
      description:
        'How a profit-first acquisition framework generated ₹2Cr+ in revenue for an educational institute in 6 months.',
    },
  },
];

export const services = [
  {
    name: 'Performance Marketing',
    slug: 'performance-marketing',
    icon: 'TrendingUp',
    shortDescription: 'Data-driven Meta advertising systems designed to acquire customers profitably.',
    heroHeadline: 'The Meta Ads Framework Behind ₹50Cr+ In Client Revenue.',
    heroSubheadline:
      "We build Meta advertising systems designed to acquire customers profitably — not just generate impressive-looking ROAS.",
    sections: [
      {
        order: 1,
        heading: 'Why Most Ads Fail',
        body:
          'Most ad accounts don’t fail because of "the algorithm" or rising CPMs. They fail because of weak offers, untested creative, and acquisition cost decisions made without contribution margin in view. We diagnose the actual failure point before we touch a single campaign.',
      },
      {
        order: 2,
        heading: 'Meta Ads Framework',
        body:
          'Our system: Meta Ads → Creatives → Offers → CRO → Retention → Profitability → Scaling. Every stage feeds the next — creative testing informs offer positioning, offer positioning informs conversion rate, and only profitable, validated campaigns get scaled.',
      },
      {
        order: 3,
        heading: 'Creative Testing',
        body:
          "Structured testing cycles across hooks, angles, and formats — not random creative refreshes. We've used this exact process to take accounts from inconsistent returns to 18X and 39X peak campaigns.",
      },
      {
        order: 4,
        heading: 'Audience Research',
        body: 'We build audiences around actual buying triggers for your category, not just lookalike defaults.',
      },
      {
        order: 5,
        heading: 'Offer Positioning',
        body:
          "Sometimes the fastest profit lift isn't a better ad — it's a better offer. We test offer structure as rigorously as we test creative.",
      },
      {
        order: 6,
        heading: 'Scaling Framework',
        body: 'We scale spend behind validated winners only, increasing profit, not just spend, as budgets grow.',
      },
      {
        order: 7,
        heading: 'Results',
        body:
          '18X peak return (Fashion/Maternity Wear)); up to 39X return (Saree Brand); ₹1Cr+ revenue in 3 months (CCTV & Networking); ₹2Cr+ revenue in 6 months (Education).',
      },
    ],
    faqs: [
      {
        q: 'What platforms do you run ads on?',
        a: 'Meta (Facebook/Instagram) is our core specialty, paired with the tracking infrastructure (pixel, CAPI, GTM) to measure it accurately.',
      },
      {
        q: 'How do you decide what to scale?',
        a: 'Only campaigns that are profitable against contribution margin get more budget — ROAS alone never triggers a scale decision.',
      },
      {
        q: "Do you work with brands that haven't run ads before?",
        a: 'Yes — we build the acquisition system from the ground up, including offer and creative testing.',
      },
      {
        q: 'What do you need from us to get started?',
        a: 'Access to your ad account, basic margin/cost data, and a founder who wants to be measured on profit, not just spend.',
      },
    ],
    finalCtaHeadline: "Find Out What's Actually Capping Your Profit.",
    finalCtaBody: 'Get a free, no-pressure teardown of your current Meta Ads account.',
    order: 1,
    seo: {
      title: 'Performance Marketing | Profit-First Meta Ads — Nfinity Partner',
      description:
        'Meta Ads systems built around contribution margin, not vanity ROAS. 18X and 39X campaign results for D2C brands. Get a free account teardown.',
    },
  },
  {
    name: 'Website Development',
    slug: 'website-development',
    icon: 'Code2',
    shortDescription: 'High-converting websites and landing pages built to turn traffic into customers.',
    heroHeadline: 'We Build Websites Like Conversion Assets, Not Brochures.',
    heroSubheadline:
      'We build high-converting websites and landing pages designed to turn traffic into customers, not just visitors into bounces.',
    sections: [
      {
        order: 1,
        heading: 'Why Websites Fail',
        body:
          "Most underperforming websites aren't ugly — they're slow, unclear, and built without conversion logic. We diagnose load speed, message clarity, and funnel friction before recommending a single design change.",
      },
      {
        order: 2,
        heading: 'CRO Framework',
        body:
          'Every build follows a conversion-first structure: clear value proposition above the fold, frictionless navigation, trust signals placed where doubt naturally occurs, and a singular, obvious next step on every page.',
      },
      {
        order: 3,
        heading: 'Landing Pages',
        body:
          'Built specifically for paid traffic — message-matched to the ad that drove the click, stripped of distractions, optimized for one conversion action.',
      },
      {
        order: 4,
        heading: 'Ecommerce Websites',
        body:
          'Full ecommerce builds designed around browse-to-cart-to-checkout flow, with retention infrastructure (email/WhatsApp capture) built in from day one, not added later.',
      },
      {
        order: 5,
        heading: 'Development Process',
        body: 'Discovery & CRO Audit → Wireframe & Content → Design System → Build & QA → Launch & Performance Monitoring.',
      },
      {
        order: 6,
        heading: 'Portfolio',
        body: 'A showcase of completed landing pages and ecommerce builds, with before/after conversion metrics where available.',
      },
    ],
    faqs: [
      {
        q: 'Do you build on a specific platform?',
        a: 'We recommend the platform based on your needs — from headless/React builds for performance-critical sites to ecommerce platforms for catalog-heavy stores.',
      },
      {
        q: 'How long does a website build take?',
        a: 'Landing pages typically launch in 1–2 weeks; full ecommerce builds vary by scope, discussed during the strategy call.',
      },
      {
        q: 'Will my new website be fast?',
        a: 'Performance (target 90+ Lighthouse score) is a build requirement, not an afterthought.',
      },
      {
        q: 'Can you redesign my existing site instead of starting from scratch?',
        a: 'Yes — many engagements start with a CRO audit of the existing site before deciding what to rebuild vs. optimize.',
      },
    ],
    finalCtaHeadline: 'Find Out How Much Revenue Your Website Is Leaving On The Table.',
    finalCtaBody: 'Get a free site audit and see exactly where the friction is.',
    order: 2,
    seo: {
      title: 'Website Development | High-Converting Websites — Nfinity Partner',
      description:
        'CRO-built websites and landing pages designed to turn traffic into customers. Fast, conversion-focused, built for D2C and ecommerce brands.',
    },
  },
  {
    name: 'SEO',
    slug: 'seo',
    icon: 'Search',
    shortDescription: 'Search-driven visibility systems that compound organic traffic and lower blended acquisition cost.',
    heroHeadline: "Traffic You Don't Have To Pay For, Every Single Month.",
    heroSubheadline:
      'We build SEO systems that compound organic visibility over time, reducing your blended acquisition cost instead of just adding another paid channel.',
    sections: [
      {
        order: 1,
        heading: 'Why Most SEO Fails',
        body:
          "Most SEO work stalls because it chases rankings instead of revenue — targeting keywords with no buying intent, publishing content nobody searches for, or fixing technical issues with no clear link to traffic or sales.",
      },
      {
        order: 2,
        heading: 'Technical SEO',
        body:
          "Site speed, crawlability, indexing, and structured data fixed first — no keyword strategy outperforms a site search engines can't properly crawl or render.",
      },
      {
        order: 3,
        heading: 'Keyword & Intent Research',
        body:
          'We map keywords to actual buying intent — informational, comparison, and transactional — so content is built to convert, not just rank.',
      },
      {
        order: 4,
        heading: 'On-Page & Content Strategy',
        body:
          'Product pages, category pages, and supporting content structured around what your category is actually searching for, not generic blog filler.',
      },
      {
        order: 5,
        heading: 'Link Building & Authority',
        body:
          'A measured approach to building domain authority through relevant, earned links — not volume-based link schemes that put your domain at risk.',
      },
      {
        order: 6,
        heading: 'Reporting',
        body:
          'Organic traffic, keyword rankings, and — most importantly — organic-driven revenue, reported alongside your paid performance so you see the full acquisition picture.',
      },
    ],
    faqs: [
      {
        q: 'How long does SEO take to show results?',
        a: 'Meaningful movement typically starts in 3–4 months, with compounding gains from month 6 onward — SEO is a medium-to-long-term channel by nature.',
      },
      {
        q: 'Does SEO replace paid advertising?',
        a: 'No — it reduces your dependency on it over time by lowering blended acquisition cost; the two channels work best run together.',
      },
      {
        q: 'Do you write the content yourselves?',
        a: 'Yes, or we work with your existing content team — either way, every piece is built around mapped keyword intent, not generic topics.',
      },
    ],
    finalCtaHeadline: "Find Out How Much Organic Traffic You're Leaving On The Table.",
    finalCtaBody: 'Get a free SEO audit of your current site and keyword opportunity.',
    order: 3,
    seo: {
      title: 'SEO | Organic Growth Systems — Nfinity Partner',
      description:
        'SEO systems built around buying intent and technical fundamentals, designed to compound organic traffic and lower blended acquisition cost for D2C and ecommerce brands.',
    },
  },
  {
    name: 'Social Media Marketing',
    slug: 'social-media-marketing',
    icon: 'Share2',
    shortDescription: 'Organic and paid social systems built to grow an engaged audience that feeds your acquisition funnel.',
    heroHeadline: 'Social That Builds An Audience, Not Just A Highlight Reel.',
    heroSubheadline:
      'Organic and paid social media systems designed to grow an engaged audience that actually feeds your acquisition and retention funnels.',
    sections: [
      {
        order: 1,
        heading: 'Why Most Social Strategy Fails',
        body:
          'Posting consistently without a strategy behind it grows a feed, not a business. We build social around the same funnel logic as every other channel: attention, trust, and a clear next step.',
      },
      {
        order: 2,
        heading: 'Content Strategy',
        body:
          "A content calendar built around what your audience actually engages with — not a generic content-pillars template copied across every brand.",
      },
      {
        order: 3,
        heading: 'Community Management',
        body:
          'Responsive, on-brand engagement that turns comments and DMs into relationships, not ignored notifications.',
      },
      {
        order: 4,
        heading: 'Platform Strategy',
        body:
          "The right mix of Instagram, Facebook, and emerging platforms for your audience — we don't spread you thin across every platform by default.",
      },
      {
        order: 5,
        heading: 'Paid Social Amplification',
        body:
          "Boosting and promoting what's already proving organically, instead of paying to push content nobody engaged with for free.",
      },
      {
        order: 6,
        heading: 'Reporting',
        body:
          'Engagement, follower growth, and audience quality tracked against actual business outcomes — leads and sales — not vanity metrics alone.',
      },
    ],
    faqs: [
      {
        q: 'Do you handle both organic posting and paid social?',
        a: 'Yes — we run them as one connected system, with paid amplifying what organic content is already proving works.',
      },
      {
        q: 'How many platforms will you manage for us?',
        a: 'Whichever platforms your audience actually uses — usually 1–2 done well outperforms 5 done thinly.',
      },
      {
        q: 'Can you work alongside our existing in-house social person?',
        a: "Yes — many engagements are strategy and systems, with content execution handled by your team or ours, depending on what's needed.",
      },
    ],
    finalCtaHeadline: 'See What A Strategic Social Presence Could Do For Your Funnel.',
    finalCtaBody: 'Get a free audit of your current social channels.',
    order: 4,
    seo: {
      title: 'Social Media Marketing | Organic & Paid Social — Nfinity Partner',
      description:
        'Social media systems built to grow an engaged audience and feed your acquisition funnel — content strategy, community management, and paid amplification.',
    },
  },
  {
    name: 'LinkedIn Automation',
    slug: 'linkedin-automation',
    icon: 'Linkedin',
    shortDescription: 'Automated outreach systems that generate conversations and opportunities consistently.',
    heroHeadline: 'Fill Your Calendar Without Filling Your Spam Folder.',
    heroSubheadline:
      'Automated outreach systems that help businesses generate conversations and opportunities consistently.',
    sections: [
      {
        order: 1,
        heading: 'ICP Research',
        body:
          'We define your ideal customer profile with precision before writing a single outreach message — the single biggest driver of response and meeting-booking rates.',
      },
      {
        order: 2,
        heading: 'Lead Generation',
        body: 'Systematic, ICP-targeted outreach built to generate consistent conversations, not one-off spikes.',
      },
      {
        order: 3,
        heading: 'Outreach Framework',
        body:
          'ICP Research → Connection → Conversation → Meeting Booked — each stage tracked so we know exactly where the pipeline is working and where it isn’t.',
      },
      {
        order: 4,
        heading: 'Meeting Booking',
        body: 'Messaging sequences designed to move qualified conversations toward a booked call without feeling like a script.',
      },
      {
        order: 5,
        heading: 'Results',
        body: 'Tracked meeting-booking rate and pipeline volume reported transparently, the same way we report performance marketing results.',
      },
    ],
    faqs: [
      {
        q: 'Is this just automated spam messaging?',
        a: 'No — every sequence is built on ICP research first; volume without targeting is exactly what we avoid.',
      },
      {
        q: 'What industries does this work best for?',
        a: 'B2B, service businesses, and founders selling considered-purchase products or services.',
      },
      {
        q: 'How many meetings can I expect?',
        a: 'Discussed transparently on the strategy call based on your ICP size and offer — we won’t promise a number we can’t back with the framework.',
      },
    ],
    finalCtaHeadline: "See Exactly How We'd Fill Your Calendar.",
    finalCtaBody: 'Get a free outreach audit of your current pipeline.',
    order: 9,
    seo: {
      title: 'LinkedIn Automation | Outreach & Lead Generation — Nfinity Partner',
      description:
        'ICP-driven LinkedIn outreach systems built to generate consistent conversations and booked meetings, not vanity connections.',
    },
  },
  {
    name: 'Personal Branding & Product Photography',
    slug: 'personal-branding-product-photography',
    icon: 'Camera',
    shortDescription: 'Founder personal branding and product photography built to build trust before a customer ever clicks "buy."',
    heroHeadline: 'People Buy From People — And From Photos That Look Worth Buying.',
    heroSubheadline:
      'Personal branding for founders and high-quality product photography built to build trust and lift conversion before a single ad even runs.',
    sections: [
      {
        order: 1,
        heading: 'Why This Matters',
        body:
          "A founder with a visible, credible presence converts skepticism into trust faster than any ad copy can — and product photography is often the single biggest lever on a product page's conversion rate.",
      },
      {
        order: 2,
        heading: 'Founder Personal Branding',
        body:
          'Positioning, content strategy, and on-camera coaching that builds a founder into a recognizable, trusted voice in their category, not just a logo.',
      },
      {
        order: 3,
        heading: 'Product Photography',
        body:
          'Studio and lifestyle product photography shot specifically for ecommerce conversion — clean catalog shots paired with in-context lifestyle imagery.',
      },
      {
        order: 4,
        heading: 'Content Direction',
        body:
          'Every shoot planned around how the imagery will actually be used — ads, product pages, social, and packaging — not a generic photoshoot with no funnel in mind.',
      },
      {
        order: 5,
        heading: 'Brand Consistency',
        body:
          'A consistent visual and personal voice across every touchpoint, so trust compounds instead of resetting with every new piece of content.',
      },
    ],
    faqs: [
      {
        q: 'Do you provide the photographer/studio, or just direction?',
        a: 'Both — we can run full shoots end-to-end, or direct your existing photography team toward conversion-focused output.',
      },
      {
        q: "I'm not comfortable on camera — can personal branding still work?",
        a: "Yes — coaching and content formats are tailored to your comfort level; visibility doesn't have to mean constant video.",
      },
      {
        q: 'How often do we need new product photography?',
        a: 'Typically refreshed per major product launch or seasonal collection — discussed during the strategy call based on your catalog.',
      },
    ],
    finalCtaHeadline: 'See What Better Photography And A Visible Founder Could Do For Conversion.',
    finalCtaBody: 'Get a free review of your current product imagery and founder presence.',
    order: 5,
    seo: {
      title: 'Personal Branding & Product Photography — Nfinity Partner',
      description:
        'Founder personal branding and conversion-focused product photography built to build trust and lift conversion for D2C and ecommerce brands.',
    },
  },
  {
    name: 'Online Marketing',
    slug: 'online-marketing',
    icon: 'Globe',
    shortDescription: 'Cross-channel digital marketing strategy that connects every channel into one coherent growth system.',
    heroHeadline: 'One Strategy. Every Channel. No Channel Working Against Another.',
    heroSubheadline:
      'Cross-channel digital marketing strategy that connects paid, organic, email, and content into one coherent system measured against profit.',
    sections: [
      {
        order: 1,
        heading: 'Why Channels Need To Be Connected',
        body:
          "Most brands run paid, social, email, and SEO as separate efforts with separate owners — each optimizing in isolation, sometimes working against each other for the same customer's attention.",
      },
      {
        order: 2,
        heading: 'Channel Strategy',
        body:
          'A single strategy that decides what each channel is responsible for — awareness, conversion, or retention — instead of every channel trying to do everything.',
      },
      {
        order: 3,
        heading: 'Budget Allocation',
        body:
          'Spend allocated across channels based on where the marginal customer is actually most profitable to acquire, reviewed and adjusted on a regular cadence.',
      },
      {
        order: 4,
        heading: 'Campaign Orchestration',
        body:
          'Paid, organic, and email campaigns timed and messaged to reinforce each other instead of running in silos with no shared calendar.',
      },
      {
        order: 5,
        heading: 'Marketing Funnel Design',
        body:
          'A mapped funnel from first touch to repeat purchase, with each channel assigned a specific stage rather than competing for the same conversion.',
      },
      {
        order: 6,
        heading: 'Reporting',
        body:
          'A single blended view of performance across every channel, measured against contribution margin, not channel-by-channel vanity metrics.',
      },
    ],
    faqs: [
      {
        q: 'Do you replace our existing channel specialists, or work with them?',
        a: 'Either — some clients want us running every channel directly, others want us providing the unifying strategy while specialist teams execute.',
      },
      {
        q: 'How is this different from just running performance marketing?',
        a: 'Performance marketing is one channel within this; online marketing strategy is the layer that decides how all your channels work together.',
      },
      {
        q: 'How often does the strategy get reviewed?',
        a: 'On a regular cadence — typically monthly — since channel performance and budget allocation shift as the market and your offers do.',
      },
    ],
    finalCtaHeadline: 'Find Out If Your Channels Are Working Together Or Against Each Other.',
    finalCtaBody: 'Get a free cross-channel marketing audit.',
    order: 6,
    seo: {
      title: 'Online Marketing | Cross-Channel Growth Strategy — Nfinity Partner',
      description:
        'Cross-channel digital marketing strategy connecting paid, organic, email, and content into one system measured against profit, not vanity metrics.',
    },
  },
  {
    name: 'Digital Branding',
    slug: 'digital-branding',
    icon: 'Palette',
    shortDescription: 'Brand identity and positioning systems that make every other channel work harder.',
    heroHeadline: 'A Brand People Remember Converts Better Than An Ad They Forget.',
    heroSubheadline:
      'Brand identity, positioning, and visual systems built to make every ad, page, and post instantly recognizable as yours.',
    sections: [
      {
        order: 1,
        heading: 'Why Branding Affects Performance',
        body:
          'Generic branding makes every ad look replaceable and every discount feel necessary to win attention. A distinct brand earns trust faster, lowering the work every other channel has to do.',
      },
      {
        order: 2,
        heading: 'Brand Positioning',
        body:
          'A clear answer to why a customer should choose you specifically, not just what category you sell in — the foundation every other piece of branding builds on.',
      },
      {
        order: 3,
        heading: 'Visual Identity',
        body:
          'Logo, color, typography, and visual systems designed for consistency across ads, packaging, website, and social, not a one-off logo file that gets used inconsistently.',
      },
      {
        order: 4,
        heading: 'Brand Voice & Messaging',
        body:
          'A defined tone and message framework so copy across every channel sounds like one brand, not five different freelancers.',
      },
      {
        order: 5,
        heading: 'Brand Guidelines',
        body:
          'A practical, usable guideline document your team and any vendor can follow, so brand consistency survives beyond the initial project.',
      },
    ],
    faqs: [
      {
        q: 'Do we need a full rebrand, or can you work with our existing identity?',
        a: "Most engagements start with an audit to decide — often it's a refinement, not a full rebrand, that's actually needed.",
      },
      {
        q: 'How does branding connect to the performance marketing you run?',
        a: "A distinct, trusted brand consistently lowers cost-per-result across every paid channel — it's not separate from performance, it's an input into it.",
      },
      {
        q: 'How long does a branding project take?',
        a: 'Positioning and guidelines typically take 3–4 weeks; full visual identity builds vary by scope, discussed on the strategy call.',
      },
    ],
    finalCtaHeadline: 'Find Out If Generic Branding Is Quietly Taxing Your Ad Performance.',
    finalCtaBody: 'Get a free brand audit alongside your next strategy call.',
    order: 7,
    seo: {
      title: 'Digital Branding | Brand Identity & Positioning — Nfinity Partner',
      description:
        'Brand identity, positioning, and visual systems built to make every channel work harder for D2C and ecommerce brands.',
    },
  },
  {
    name: 'Software & App Development',
    slug: 'software-app-development',
    icon: 'Smartphone',
    shortDescription: 'Custom software and mobile app builds for brands that have outgrown off-the-shelf tools.',
    heroHeadline: 'When Off-The-Shelf Stops Being Enough, We Build What You Actually Need.',
    heroSubheadline:
      'Custom software and mobile app development for brands and businesses that have outgrown generic tools and templated platforms.',
    sections: [
      {
        order: 1,
        heading: 'When Custom Software Makes Sense',
        body:
          "Most businesses don't need custom software — until a specific workflow, customer experience, or integration genuinely can't be solved by an off-the-shelf tool anymore. We help you figure out which side of that line you're on before recommending a build.",
      },
      {
        order: 2,
        heading: 'Mobile App Development',
        body:
          'Native and cross-platform app builds designed around a clear core use case, not a feature list copied from competitors.',
      },
      {
        order: 3,
        heading: 'Custom Software Solutions',
        body:
          'Internal tools, customer portals, and workflow systems built around how your business actually operates, not how a generic SaaS template assumes it does.',
      },
      {
        order: 4,
        heading: 'Integration & API Development',
        body:
          'Connecting your existing tools, platforms, and data sources into one working system instead of disconnected point solutions.',
      },
      {
        order: 5,
        heading: 'Development Process',
        body:
          'Discovery & Scoping → Architecture & Design → Build & QA → Launch → Ongoing Support — the same rigor we apply to website builds, applied to software.',
      },
      {
        order: 6,
        heading: 'Ongoing Support',
        body:
          'Post-launch monitoring, maintenance, and iteration, since software that stops evolving with your business quickly becomes the next bottleneck.',
      },
    ],
    faqs: [
      {
        q: 'Do you build native apps, or web-based apps?',
        a: 'Whichever fits the use case — recommended during scoping based on performance needs, budget, and target platforms.',
      },
      {
        q: "We're not sure if we need an app or just a better website — can you help us decide?",
        a: 'Yes — this is usually the first conversation, before any build commitment, on the strategy call.',
      },
      {
        q: 'Do you provide ongoing maintenance after launch?',
        a: 'Yes — ongoing support is discussed and scoped alongside the initial build, not treated as an afterthought.',
      },
    ],
    finalCtaHeadline: 'Find Out If Custom Software Is Actually What You Need.',
    finalCtaBody: 'Get a free scoping call to figure out the right build for your business.',
    order: 8,
    seo: {
      title: 'Software & App Development | Custom Builds — Nfinity Partner',
      description:
        'Custom software and mobile app development for brands that have outgrown off-the-shelf tools — from scoping through ongoing support.',
    },
  },
];

export const testimonials = [
  {
    clientName: 'Mr. Ram Sudheer',
    role: 'Founder',
    brandName: 'Ramji',
    quote:
      'The best content writer and strategist I have ever seen. Their ability to understand the market and communicate ideas clearly made a significant impact on our brand.',
    isFeatured: true,
    order: 1,
  },
  {
    clientName: 'Mr. Vasudevan',
    role: 'Founder',
    brandName: 'Fortune Innovatives',
    quote:
      'They understood our audience and provided creative suggestions that helped us generate more walk-ins. Their insights and execution brought measurable results.',
    isFeatured: true,
    order: 2,
  },
  {
    clientName: 'Mr. Gokula Krishnan',
    role: 'Founder',
    brandName: 'GK Naturals',
    quote:
      'Very knowledgeable and profit-focused. They helped us understand the economics behind every order and improved our decision-making process.',
    isFeatured: true,
    order: 3,
  },
  {
    clientName: 'Administrator',
    role: 'Administrator',
    brandName: 'Educational Institute',
    quote:
      'We needed consistent, qualified enrollment leads in a crowded local market. The same profit-first framework Nfinity uses for D2C brands worked just as well for us — ₹2Cr+ in revenue in 6 months.',
    isFeatured: false,
    order: 4,
  },
];

// Blog category names match the Service.name values where relevant, so
// the contextual CTA in BlogPost.relatedService can resolve to a Service.slug.
export const blogPosts = [
  {
    title: 'How We Took A Saree Brand From 10X To 39X',
    slug: 'saree-brand-10x-to-39x',
    category: 'General',
    excerpt:
      'A behind-the-scenes look at the offer positioning and creative testing process that took a saree brand’s campaign from a 10X return to 39X.',
    content: `Most agencies would have called the first campaign a win. A 10X return on ad spend is, by most standards, a strong result. We treated it as a starting point.

The brand had built real traction around a single hero product, but scaling further with the same creative and the same offer was starting to show diminishing returns — a familiar plateau for D2C brands that lean on one winning SKU for too long.

**The diagnosis**

Before touching the media buying, we looked at two things most teams skip: offer structure and creative fatigue. The offer hadn't changed in months. The creative had been refreshed, but not tested — refreshed and tested are not the same thing.

**The fix**

We layered in structured offer positioning alongside a CRO pass on the landing experience, and ran creative testing in parallel rather than sequentially. Multiple angles — price-led, social-proof-led, and occasion-led — went into market at once, with budget allocated only to what was actually converting.

**The result**

The follow-up campaign reached 39X. Not because the algorithm got smarter — because the inputs feeding it did.

If your best campaign ever was also your most recent plateau, the offer and the creative are usually the first place to look — not the targeting.`,
    coverImage: '',
    readTimeMinutes: 5,
    relatedService: 'performance-marketing',
    isFeatured: true,
    publishedAt: new Date('2026-05-12T09:00:00.000Z'),
    seo: {
      title: 'How We Took A Saree Brand From 10X To 39X | Nfinity Partner Blog',
      description:
        'The offer positioning and creative testing process behind a saree brand’s jump from a 10X to a 39X return on ad spend.',
    },
  },
  {
    title: 'Why ROAS Is Lying To You About Your Ad Performance',
    slug: 'why-roas-is-lying-to-you',
    category: 'Performance Marketing',
    excerpt:
      'ROAS tells you a campaign performed. It doesn’t tell you whether your business got healthier. Here’s the metric that actually does.',
    content: `Return on ad spend is the most quoted number in performance marketing, and it's also one of the most misleading on its own.

ROAS can climb while your contribution margin shrinks. A campaign can post a 4X return and lose money once you account for product cost, discounts, and shipping. A different campaign can post a 2.5X return and be the most profitable thing running in your ad account.

**Why this happens**

ROAS measures revenue against spend. It says nothing about what it cost to fulfill that revenue. Two campaigns with identical ROAS can have wildly different profit outcomes depending on what they're selling and at what margin.

**What to track instead**

Contribution margin — revenue minus the variable costs of fulfilling it, including the ad spend itself — is the number that tells you whether a campaign is actually making the business healthier. It's also the number every scaling decision in our Meta Ads framework gets measured against, not ROAS alone.

**The practical shift**

Pull product cost and fulfillment cost into your reporting, even roughly. Once contribution margin sits next to ROAS in your weekly numbers, scaling decisions stop being guesses.`,
    coverImage: '',
    readTimeMinutes: 4,
    relatedService: 'performance-marketing',
    isFeatured: false,
    publishedAt: new Date('2026-05-19T09:00:00.000Z'),
    seo: {
      title: 'Why ROAS Is Lying To You About Your Ad Performance | Nfinity Partner Blog',
      description:
        'ROAS can climb while your margin shrinks. Here’s why contribution margin is the number that actually matters for D2C ad accounts.',
    },
  },
  {
    title: 'The Meta Ads Framework We Use For Every New Client',
    slug: 'meta-ads-framework-every-client',
    category: 'Performance Marketing',
    excerpt:
      'Meta Ads → Creatives → Offers → CRO → Retention → Profitability → Scaling. Here’s how each stage feeds the next.',
    content: `Every new account starts with the same seven-stage framework, regardless of industry: Meta Ads, Creatives, Offers, CRO, Retention, Profitability, Scaling.

It's not a checklist to move through once — it's a loop. Creative testing informs offer positioning. Offer positioning changes conversion rate. Conversion rate changes what's actually profitable to scale. Profitable campaigns get more budget, which generates more data, which feeds the next round of creative testing.

**Why sequence matters**

Brands often want to skip straight to "scaling" — more budget, more reach. But scaling an unprofitable or untested system just scales the leak. We run accounts through the earlier stages first, even when the founder is eager to spend more, because the data from stages one through four is what makes stage seven (scaling) safe.

**What this looks like in the first 30 days**

Audience and creative testing run in parallel, offer experiments get queued based on early signal, and CRO fixes on the landing experience happen alongside the ad testing — not after it. By day 30, most accounts have a clear read on what's actually working, not just what's spending.`,
    coverImage: '',
    readTimeMinutes: 4,
    relatedService: 'performance-marketing',
    isFeatured: false,
    publishedAt: new Date('2026-05-26T09:00:00.000Z'),
    seo: {
      title: 'The Meta Ads Framework We Use For Every New Client | Nfinity Partner Blog',
      description:
        'Meta Ads → Creatives → Offers → CRO → Retention → Profitability → Scaling — the seven-stage framework behind every Nfinity Partner account.',
    },
  },
  {
    title: "7 Reasons Your Website Isn't Converting Paid Traffic",
    slug: '7-reasons-website-not-converting',
    category: 'Website Development',
    excerpt:
      'A slow, generic website quietly taxes every campaign you run. Here are the seven most common conversion leaks we find during a CRO audit.',
    content: `Paid traffic exposes a website's weaknesses faster than organic traffic ever will. When you're paying for every click, a few seconds of load time or a confusing layout has a direct, measurable cost.

Here are the seven issues we find most often during a CRO audit:

1. **Message mismatch** — the landing page doesn't say what the ad said, so visitors bounce immediately.
2. **Slow load speed** — every additional second of load time compounds bounce rate, especially on mobile.
3. **No single clear next step** — too many competing CTAs dilute the one action that actually matters.
4. **Trust signals buried or missing** — reviews, guarantees, and credibility markers placed below the fold where doubt has already won.
5. **Desktop-first design serving a mobile-majority audience** — most paid traffic is mobile; designing desktop-first gets the priorities backward.
6. **Generic, brochure-style copy** — describing the product instead of addressing the specific reason the visitor clicked.
7. **No urgency or next-step clarity at the point of decision** — visitors who are ready to act don't know what happens after they click "buy" or "submit."

None of these require a full redesign to fix. Most are addressable within the existing site, which is usually where a CRO audit starts before any conversation about a rebuild.`,
    coverImage: '',
    readTimeMinutes: 5,
    relatedService: 'website-development',
    isFeatured: false,
    publishedAt: new Date('2026-06-02T09:00:00.000Z'),
    seo: {
      title: "7 Reasons Your Website Isn't Converting Paid Traffic | Nfinity Partner Blog",
      description:
        'The seven most common conversion leaks found during a CRO audit, and why paid traffic exposes them faster than organic traffic.',
    },
  },
  {
    title: 'Why Your Cheapest Customer Is The One You Already Have',
    slug: 'cheapest-customer-already-have',
    category: 'General',
    excerpt:
      'Acquisition without retention is a leaking bucket. Here’s how a retention layer makes every acquisition campaign more profitable.',
    content: `It costs significantly more to acquire a new customer than to sell to an existing one. Most D2C brands know this in theory and still under-invest in retention in practice, because acquisition is where the visible growth happens.

But retention isn't a separate growth lever — it's a multiplier on the acquisition spend you're already making. A customer who buys twice instead of once effectively halves your acquisition cost on that customer's lifetime value.

**Where the leak usually is**

Most brands have a generic post-purchase email sequence and stop there. There's no WhatsApp touchpoint, no structured win-back flow for lapsed customers, and no mapping of the actual customer journey beyond "they bought."

**What a real retention system looks like**

First Purchase → Post-Purchase Flow → Win-Back → Repeat Purchase → Loyalty, with a specific channel and automation assigned to each stage — email for some, WhatsApp for others, depending on what your customers actually respond to.

**The compounding effect**

Every acquisition campaign you run becomes more profitable once the retention layer is in place, because the lifetime value behind the same acquisition cost goes up. It's the same reason we pair every acquisition system we build with a retention system from day one.`,
    coverImage: '',
    readTimeMinutes: 4,
    relatedService: '',
    isFeatured: false,
    publishedAt: new Date('2026-06-09T09:00:00.000Z'),
    seo: {
      title: 'Why Your Cheapest Customer Is The One You Already Have | Nfinity Partner Blog',
      description:
        'Acquisition without retention is a leaking bucket. How a structured retention system multiplies the value of every acquisition campaign.',
    },
  },
  {
    title: 'ICP Research: The Step Most LinkedIn Outreach Skips',
    slug: 'icp-research-linkedin-outreach',
    category: 'LinkedIn Automation',
    excerpt:
      'Most LinkedIn outreach fails for one reason: it skips ICP research and goes straight to volume. Here’s why precision beats spray-and-pray.',
    content: `Most failed LinkedIn outreach campaigns aren't failing because of message quality. They're failing because of who the message is being sent to.

Spray-and-pray outreach optimizes for connection request volume. ICP-driven outreach optimizes for fit — and fit is what actually drives response rate, conversation quality, and ultimately, booked meetings.

**Defining ICP with precision**

A real ideal customer profile goes beyond job title and company size. It includes the specific problem your buyer is actively trying to solve right now, the trigger events that put them in-market, and the language they use to describe their own problem — not the language your sales deck uses.

**Why this changes the outreach itself**

Once the ICP is precise, the message can be specific. Generic outreach gets generic (or no) responses. A message that names the exact problem a tightly defined ICP is facing reads as relevant, not as a pitch — and relevant messages get replies.

**The framework**

ICP Research → Connection → Conversation → Meeting Booked. Skipping the first stage doesn't save time — it just moves the wasted effort further down the funnel, where it's more expensive to fix.`,
    coverImage: '',
    readTimeMinutes: 4,
    relatedService: 'linkedin-automation',
    isFeatured: false,
    publishedAt: new Date('2026-06-16T09:00:00.000Z'),
    seo: {
      title: 'ICP Research: The Step Most LinkedIn Outreach Skips | Nfinity Partner Blog',
      description:
        'Why precision ICP research, not connection volume, is the biggest driver of LinkedIn outreach response and meeting-booking rates.',
    },
  },
  {
    title: 'Bad Tracking Makes Good Campaigns Look Bad',
    slug: 'bad-tracking-good-campaigns-look-bad',
    category: 'General',
    excerpt:
      'If your pixel, CAPI, and GTM setup isn’t reconciled against real revenue, you could be cutting a profitable campaign without knowing it.',
    content: `Every scaling decision is only as good as the data behind it. We've audited ad accounts where a "losing" campaign, according to the ad platform, was actually one of the most profitable campaigns running — once tracking was reconciled against real revenue.

**Where this goes wrong**

Browser restrictions and iOS privacy changes have made client-side-only tracking unreliable. Without server-side tracking (Conversion API) to recover what the browser drops, ad platforms under-report conversions — sometimes significantly. The result: a campaign that looks like it's underperforming when it's actually under-tracked.

**The fix isn't complicated, but it is foundational**

Pixel and Conversion API working together, a clean Google Tag Manager setup replacing scattered conflicting tags, consistent UTM structure across every campaign, and attribution modeling that goes beyond last-click. None of this is exciting work, but it's the layer every other decision sits on top of.

**Why we audit tracking before recommending any spend change**

Recommending a founder cut a campaign based on under-tracked data would mean cutting something that's actually working. We reconcile platform-reported numbers against real revenue and margin before any scaling conversation happens — because the alternative is making expensive decisions on bad information.`,
    coverImage: '',
    readTimeMinutes: 4,
    relatedService: '',
    isFeatured: false,
    publishedAt: new Date('2026-06-16T12:00:00.000Z'),
    seo: {
      title: 'Bad Tracking Makes Good Campaigns Look Bad | Nfinity Partner Blog',
      description:
        'Why pixel, CAPI, and GTM reconciliation against real revenue matters before any scaling decision — and what under-tracking actually costs.',
    },
  },
];
