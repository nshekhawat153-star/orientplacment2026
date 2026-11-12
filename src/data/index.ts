// Generated from assets/data.js and site.js
import { Candidate, Job, City, Role, Review, Person, SalaryBand, ExpBand, HiringKitData } from "./types";
export * from "./types";

export const asOf = "October 2026";
export const source = "Orion placement and posting records, sample figures";
export const orionLine = "Orion Placement is a legal recruiting firm in Fort Lauderdale that has placed attorneys and paralegals with law firms across the US since 2022.";
export const sendingDomains: string[] = ["orionplacement.com","[second sending domain to confirm]"];

export const terms = {
  "fee": "20% of first-year base salary",
  "feeRate": 0.2,
  "guarantee": "90-day replacement",
  "guaranteeDays": 90,
  "guaranteeDetail": "If the hire leaves or is let go within 90 days of the start date, we search again and send replacements at no extra fee.",
  "payment": "invoice on the start date, due in 30 days",
  "exclusivity": "Not required. Keep posting and using other recruiters.",
  "upfront": "Nothing. No retainer, no fee unless you hire someone we introduced."
};
export const trust = {
  "rating": "5.0",
  "reviews": 60,
  "captured": "30 Oct 2026",
  "jonNamed": 47,
  "since": "2022",
  "place": "Fort Lauderdale, Florida",
  "placements": "500+",
  "clientFirms": "200+",
  "calendly": "https://calendly.com/orionplacement/call-with-justin",
  "google": "https://www.google.com/search?q=Orion+Placement+reviews"
};
export const people: Person[] = [
  {
    "id": "justin",
    "name": "Justin Sofman",
    "initials": "JS",
    "title": "Co-Founder & Managing Partner",
    "phone": "(201) 572-9538",
    "email": "justin@orionplacement.com",
    "note": "Sends most candidate introductions and agrees terms with firms.",
    "does": "Your first call. Takes the seat brief, sends the shortlist and agrees terms with your firm.",
    "photo": "/images/founders/justin-sofman.png",
    "calendly": "https://calendly.com/orionplacement/call-with-justin"
  },
  {
    "id": "jon",
    "name": "Jon Missirlian",
    "initials": "JM",
    "title": "Co-Founder & Head of Screening",
    "phone": "(954) 859-9941",
    "email": "jon@orionplacement.com",
    "note": "Screens candidates before any profile is sent.",
    "does": "Screens every candidate before you see a profile, and stays with them through the move.",
    "photo": "/images/founders/jon-missirlian.jpg"
  }
];
export const reviews: Review[] = [
  {
    "id": "travis-bowen",
    "name": "Travis Bowen",
    "kind": "employer",
    "quote": "Justin Sofman and Jon Missirlian have been relentless in helping us with the staffing needs of our Firm. They have successfully placed 2 new team members with us and we will use them for all of our future staffing needs. Orion Placement, Justin and Jon are professional, excellent at follow-up and experts in finding the talent we need."
  },
  {
    "id": "lainie-james",
    "name": "Lainie James",
    "kind": "employer",
    "quote": "Jon Missirlian has been a trusted recruiter for MS&A for quite some time, consistently delivering high-quality candidates. Beyond his professional expertise, he is always respectful and kind. Working with him has been a pleasure, and I know I can always rely on him to find top-tier talent."
  },
  {
    "id": "brett-zimmerman",
    "name": "Brett Zimmerman",
    "kind": "employer",
    "quote": "Jon did and amazing job finding me a perfect candidate for my company. He’s above and beyond with his follow up with candidates. I will be using Orion Placement and Jon for all my future hires!"
  },
  {
    "id": "lourdes-masson",
    "name": "Lourdes Masson",
    "kind": "employer",
    "quote": "I’ve worked with Orion Placement several times over the years, and they’ve always been a pleasure to work with. They’re trued professionals, communicate well, and consistently deliver great candidates. I wouldn’t hesitate to recommend them to any law firm looking for a recruiting partner."
  },
  {
    "id": "daffner-law",
    "name": "Daffner Law",
    "kind": "employer",
    "quote": "Very attentive and does an excellent job - highly recommended!"
  },
  {
    "id": "derek-letellier",
    "name": "Derek Letellier",
    "kind": "candidate",
    "quote": "Jon did a phenomenal job connecting me to a fantastic opportunity. From the beginning, he was incredibly responsive, kept the process flowing, answered all the questions I had, and helped me secure my next role."
  },
  {
    "id": "n-brown",
    "name": "N Brown",
    "kind": "candidate",
    "quote": "They set great expectations and delivered for me within less than a week. This is perhaps the best result I have ever had while working through a placement agency. Their process is simple and effective; I felt like I had someone on the inside working for me. Kudos and many thanks again."
  },
  {
    "id": "vera-massey",
    "name": "Vera Massey",
    "kind": "candidate",
    "quote": "Jon was incredibly professional, responsive, and genuinely cared about helping me. He guided me through every step of the process and made the transition smooth and stress-free."
  },
  {
    "id": "rafael-jimenez",
    "name": "Rafael Jimenez",
    "kind": "candidate",
    "quote": "Justin at Orion was able to find me a perfect paralegal position within two weeks of us getting in touch. I am forever grateful to Justin as the position and employer are exactly what I was looking for."
  }
];
export const cities: City[] = [
  {
    "slug": "houston-tx",
    "name": "Houston",
    "state": "TX",
    "stateName": "Texas",
    "stateSlug": "texas",
    "citySlug": "houston",
    "built": true
  },
  {
    "slug": "dallas-tx",
    "name": "Dallas",
    "state": "TX",
    "stateName": "Texas",
    "stateSlug": "texas",
    "citySlug": "dallas"
  },
  {
    "slug": "austin-tx",
    "name": "Austin",
    "state": "TX",
    "stateName": "Texas",
    "stateSlug": "texas",
    "citySlug": "austin"
  },
  {
    "slug": "san-antonio-tx",
    "name": "San Antonio",
    "state": "TX",
    "stateName": "Texas",
    "stateSlug": "texas",
    "citySlug": "san-antonio"
  },
  {
    "slug": "new-york-ny",
    "name": "New York",
    "state": "NY",
    "stateName": "New York",
    "stateSlug": "new-york",
    "citySlug": "new-york"
  },
  {
    "slug": "denver-co",
    "name": "Denver",
    "state": "CO",
    "stateName": "Colorado",
    "stateSlug": "colorado",
    "citySlug": "denver"
  },
  {
    "slug": "chicago-il",
    "name": "Chicago",
    "state": "IL",
    "stateName": "Illinois",
    "stateSlug": "illinois",
    "citySlug": "chicago"
  },
  {
    "slug": "atlanta-ga",
    "name": "Atlanta",
    "state": "GA",
    "stateName": "Georgia",
    "stateSlug": "georgia",
    "citySlug": "atlanta"
  },
  {
    "slug": "boston-ma",
    "name": "Boston",
    "state": "MA",
    "stateName": "Massachusetts",
    "stateSlug": "massachusetts",
    "citySlug": "boston"
  },
  {
    "slug": "los-angeles-ca",
    "name": "Los Angeles",
    "state": "CA",
    "stateName": "California",
    "stateSlug": "california",
    "citySlug": "los-angeles"
  }
];
export const roles: Role[] = [
  {
    "slug": "estate-planning-attorney",
    "name": "Estate planning attorney",
    "short": "estate planning attorney",
    "kind": "attorney",
    "built": true
  },
  {
    "slug": "litigation-attorney",
    "name": "Litigation attorney",
    "short": "litigation attorney",
    "kind": "attorney"
  },
  {
    "slug": "commercial-litigation-attorney",
    "name": "Commercial litigation attorney",
    "short": "commercial litigation attorney",
    "kind": "attorney"
  },
  {
    "slug": "personal-injury-attorney",
    "name": "Personal injury attorney",
    "short": "personal injury attorney",
    "kind": "attorney"
  },
  {
    "slug": "real-estate-attorney",
    "name": "Real estate attorney",
    "short": "real estate attorney",
    "kind": "attorney"
  },
  {
    "slug": "insurance-defense-attorney",
    "name": "Insurance defense attorney",
    "short": "insurance defense attorney",
    "kind": "attorney"
  },
  {
    "slug": "family-law-attorney",
    "name": "Family law attorney",
    "short": "family law attorney",
    "kind": "attorney"
  },
  {
    "slug": "employment-attorney",
    "name": "Employment attorney",
    "short": "employment attorney",
    "kind": "attorney"
  },
  {
    "slug": "estate-planning-paralegal",
    "name": "Estate planning paralegal",
    "short": "estate planning paralegal",
    "kind": "paralegal"
  },
  {
    "slug": "litigation-paralegal",
    "name": "Litigation paralegal",
    "short": "litigation paralegal",
    "kind": "paralegal"
  },
  {
    "slug": "legal-assistant",
    "name": "Legal assistant",
    "short": "legal assistant",
    "kind": "staff"
  }
];
export const expBands: ExpBand[] = [
  {
    "key": "b1",
    "label": "1–3 years",
    "min": 1,
    "max": 3
  },
  {
    "key": "b2",
    "label": "4–7 years",
    "min": 4,
    "max": 7
  },
  {
    "key": "b3",
    "label": "8+ years",
    "min": 8,
    "max": 40
  }
];
export const bands: Record<string, Record<string, SalaryBand>> = {
  "houston-tx": {
    "estate-planning-attorney": {
      "b1": [
        90,
        115
      ],
      "b2": [
        115,
        150
      ],
      "b3": [
        150,
        195
      ],
      "median": 132,
      "typical": "4–7 years"
    },
    "litigation-attorney": {
      "b1": [
        95,
        120
      ],
      "b2": [
        120,
        155
      ],
      "b3": [
        155,
        210
      ],
      "median": 138,
      "typical": "3–6 years"
    },
    "commercial-litigation-attorney": {
      "b1": [
        105,
        130
      ],
      "b2": [
        130,
        170
      ],
      "b3": [
        170,
        230
      ],
      "median": 150,
      "typical": "4–8 years"
    },
    "personal-injury-attorney": {
      "b1": [
        85,
        110
      ],
      "b2": [
        110,
        145
      ],
      "b3": [
        145,
        200
      ],
      "median": 125,
      "typical": "3–6 years"
    },
    "real-estate-attorney": {
      "b1": [
        95,
        118
      ],
      "b2": [
        118,
        150
      ],
      "b3": [
        150,
        200
      ],
      "median": 133,
      "typical": "4–7 years"
    },
    "insurance-defense-attorney": {
      "b1": [
        85,
        105
      ],
      "b2": [
        105,
        135
      ],
      "b3": [
        135,
        170
      ],
      "median": 118,
      "typical": "2–5 years"
    },
    "family-law-attorney": {
      "b1": [
        80,
        100
      ],
      "b2": [
        100,
        130
      ],
      "b3": [
        130,
        170
      ],
      "median": 112,
      "typical": "3–6 years"
    },
    "estate-planning-paralegal": {
      "b1": [
        52,
        62
      ],
      "b2": [
        62,
        74
      ],
      "b3": [
        74,
        88
      ],
      "median": 66,
      "typical": "4–7 years"
    },
    "litigation-paralegal": {
      "b1": [
        55,
        65
      ],
      "b2": [
        65,
        78
      ],
      "b3": [
        78,
        92
      ],
      "median": 70,
      "typical": "3–6 years"
    },
    "legal-assistant": {
      "b1": [
        42,
        50
      ],
      "b2": [
        50,
        58
      ],
      "b3": [
        58,
        68
      ],
      "median": 52,
      "typical": "2–5 years"
    }
  },
  "dallas-tx": {
    "estate-planning-attorney": {
      "b1": [
        92,
        118
      ],
      "b2": [
        118,
        152
      ],
      "b3": [
        152,
        200
      ],
      "median": 135,
      "typical": "4–7 years"
    }
  },
  "austin-tx": {
    "estate-planning-attorney": {
      "b1": [
        88,
        112
      ],
      "b2": [
        112,
        145
      ],
      "b3": [
        145,
        185
      ],
      "median": 128,
      "typical": "4–7 years"
    }
  },
  "san-antonio-tx": {
    "estate-planning-attorney": {
      "b1": [
        80,
        100
      ],
      "b2": [
        100,
        130
      ],
      "b3": [
        130,
        165
      ],
      "median": 114,
      "typical": "4–7 years"
    }
  },
  "new-york-ny": {
    "estate-planning-attorney": {
      "b1": [
        120,
        150
      ],
      "b2": [
        150,
        195
      ],
      "b3": [
        195,
        260
      ],
      "median": 172,
      "typical": "4–7 years"
    }
  },
  "denver-co": {
    "estate-planning-attorney": {
      "b1": [
        90,
        112
      ],
      "b2": [
        112,
        145
      ],
      "b3": [
        145,
        185
      ],
      "median": 128,
      "typical": "4–7 years"
    }
  },
  "chicago-il": {
    "estate-planning-attorney": {
      "b1": [
        98,
        122
      ],
      "b2": [
        122,
        158
      ],
      "b3": [
        158,
        205
      ],
      "median": 140,
      "typical": "4–7 years"
    }
  },
  "atlanta-ga": {
    "estate-planning-attorney": {
      "b1": [
        88,
        110
      ],
      "b2": [
        110,
        142
      ],
      "b3": [
        142,
        185
      ],
      "median": 126,
      "typical": "4–7 years"
    }
  },
  "boston-ma": {
    "estate-planning-attorney": {
      "b1": [
        105,
        130
      ],
      "b2": [
        130,
        168
      ],
      "b3": [
        168,
        220
      ],
      "median": 150,
      "typical": "4–7 years"
    }
  },
  "los-angeles-ca": {
    "estate-planning-attorney": {
      "b1": [
        110,
        138
      ],
      "b2": [
        138,
        180
      ],
      "b3": [
        180,
        240
      ],
      "median": 160,
      "typical": "4–7 years"
    }
  }
};
export const payDrivers: Record<string, Array<{ k: string; v: string }>> = {
  "estate-planning-attorney": [
    {
      "k": "Portable book",
      "v": "A small book of existing estate clients adds the most, often +$15k to +$30k."
    },
    {
      "k": "Trust administration",
      "v": "Running administrations end to end, not only drafting, moves an offer up a band."
    },
    {
      "k": "Estate tax work",
      "v": "Form 706 and gift tax returns are scarce at small firms and priced accordingly."
    },
    {
      "k": "Bar admissions",
      "v": "Texas licence is required; a second state helps firms near a border or with retiree clients."
    }
  ]
};
export const payLevers: Record<string, Array<{ k: string; fig: string; v: string }>> = {
  "estate-planning-attorney": [
    {
      "k": "Portable book",
      "fig": "+$15k–$30k",
      "v": "A small book of existing estate clients is the biggest single lever on base."
    },
    {
      "k": "Trust administration",
      "fig": "Up one band",
      "v": "Running administrations end to end, not only drafting, moves an offer up a level."
    },
    {
      "k": "On-site seat",
      "fig": "+$5k–$10k",
      "v": "Fully on-site Houston seats pay more than hybrid seats at the same level."
    }
  ]
};
export const mustHaves: Record<string, string[]> = {
  "estate-planning-attorney": [
    "Texas bar",
    "Drafting wills and trusts",
    "Trust administration",
    "Probate",
    "Estate tax",
    "Client-facing",
    "Spanish",
    "Portable book"
  ],
  "estate-planning-paralegal": [
    "Drafting wills and trusts",
    "Trust administration",
    "Probate",
    "Client-facing",
    "Spanish"
  ],
  "attorney": [
    "Texas bar",
    "Court appearances",
    "Depositions",
    "Client-facing",
    "Spanish",
    "Portable book"
  ],
  "paralegal": [
    "E-filing",
    "Discovery",
    "Client-facing",
    "Spanish"
  ],
  "staff": [
    "Client-facing",
    "Spanish",
    "E-filing"
  ]
};
export const candidates: Candidate[] = [
  {
    "id": "EP-TX-0412",
    "role": "estate-planning-attorney",
    "headline": "Estate planning associate, drafts and runs trust administrations",
    "years": 5,
    "city": "houston-tx",
    "area": "Houston, Inner Loop",
    "relocate": [],
    "bars": [
      "Texas"
    ],
    "firmType": "Estate planning boutique",
    "firmSize": "6 attorneys",
    "mix": [
      [
        "Wills and trusts",
        55
      ],
      [
        "Trust administration",
        25
      ],
      [
        "Probate",
        20
      ]
    ],
    "pay": [
      125,
      140
    ],
    "availability": "4 weeks' notice",
    "modes": [
      "on-site",
      "hybrid"
    ],
    "tags": [
      "Texas bar",
      "Drafting wills and trusts",
      "Trust administration",
      "Probate",
      "Client-facing"
    ],
    "timeline": [
      [
        "2023–now",
        "Estate planning boutique, 6 attorneys",
        "Associate. Own client meetings, drafting of revocable trusts and wills, 20+ administrations a year."
      ],
      [
        "2021–2023",
        "General practice firm, 9 attorneys",
        "Associate. Probate filings, guardianships, estate planning drafting."
      ]
    ],
    "why": "Five years at firms your size, runs administrations without a partner in the room."
  },
  {
    "id": "EP-TX-0388",
    "role": "estate-planning-attorney",
    "headline": "Estate planning and probate associate, bilingual",
    "years": 3,
    "city": "houston-tx",
    "area": "Houston, Southwest",
    "relocate": [],
    "bars": [
      "Texas"
    ],
    "firmType": "General practice firm",
    "firmSize": "12 attorneys",
    "mix": [
      [
        "Wills and trusts",
        40
      ],
      [
        "Probate",
        40
      ],
      [
        "Guardianship",
        20
      ]
    ],
    "pay": [
      98,
      110
    ],
    "availability": "2 weeks' notice",
    "modes": [
      "on-site"
    ],
    "tags": [
      "Texas bar",
      "Drafting wills and trusts",
      "Probate",
      "Spanish",
      "Client-facing"
    ],
    "timeline": [
      [
        "2023–now",
        "General practice firm, 12 attorneys",
        "Associate. Independent and dependent administrations, Spanish-speaking client intake."
      ]
    ],
    "why": "Handles probate court on her own and takes Spanish-speaking client meetings."
  },
  {
    "id": "EP-TX-0451",
    "role": "estate-planning-attorney",
    "headline": "Senior estate planning attorney, estate tax and business succession",
    "years": 9,
    "city": "houston-tx",
    "area": "The Woodlands",
    "relocate": [],
    "bars": [
      "Texas"
    ],
    "firmType": "Tax and estates firm",
    "firmSize": "18 attorneys",
    "mix": [
      [
        "Estate tax",
        45
      ],
      [
        "Wills and trusts",
        35
      ],
      [
        "Business succession",
        20
      ]
    ],
    "pay": [
      165,
      185
    ],
    "availability": "6 weeks' notice",
    "modes": [
      "hybrid"
    ],
    "tags": [
      "Texas bar",
      "Drafting wills and trusts",
      "Estate tax",
      "Client-facing",
      "Portable book"
    ],
    "timeline": [
      [
        "2019–now",
        "Tax and estates firm, 18 attorneys",
        "Senior associate. Form 706 and 709 returns, succession plans for closely held businesses."
      ],
      [
        "2016–2019",
        "Estate planning boutique, 4 attorneys",
        "Associate. Drafting and funding."
      ]
    ],
    "why": "Estate tax returns in-house, brings a small book of existing clients."
  },
  {
    "id": "EP-TX-0467",
    "role": "estate-planning-attorney",
    "headline": "Junior estate planning associate, strong drafter",
    "years": 2,
    "city": "houston-tx",
    "area": "Sugar Land",
    "relocate": [],
    "bars": [
      "Texas"
    ],
    "firmType": "Estate planning boutique",
    "firmSize": "5 attorneys",
    "mix": [
      [
        "Wills and trusts",
        60
      ],
      [
        "Probate",
        40
      ]
    ],
    "pay": [
      85,
      95
    ],
    "availability": "Available now",
    "modes": [
      "on-site"
    ],
    "tags": [
      "Texas bar",
      "Drafting wills and trusts",
      "Probate"
    ],
    "timeline": [
      [
        "2024–now",
        "Estate planning boutique, 5 attorneys",
        "Associate. Drafting packages, signing ceremonies, probate applications."
      ]
    ],
    "why": "Two years of drafting volume at a five-attorney firm; available now."
  },
  {
    "id": "EP-TX-0476",
    "role": "estate-planning-attorney",
    "headline": "Estate planning associate, high-volume drafting and client meetings",
    "years": 4,
    "city": "houston-tx",
    "area": "Katy",
    "relocate": [],
    "bars": [
      "Texas"
    ],
    "firmType": "Family and estates firm",
    "firmSize": "10 attorneys",
    "mix": [
      [
        "Wills and trusts",
        65
      ],
      [
        "Probate",
        25
      ],
      [
        "Guardianship",
        10
      ]
    ],
    "pay": [
      118,
      130
    ],
    "availability": "3 weeks' notice",
    "modes": [
      "on-site",
      "hybrid"
    ],
    "tags": [
      "Texas bar",
      "Drafting wills and trusts",
      "Probate",
      "Client-facing"
    ],
    "timeline": [
      [
        "2022–now",
        "Family and estates firm, 10 attorneys",
        "Associate. Own client meetings, 15 to 20 plans a month, probate applications."
      ]
    ],
    "why": "Four years of client-facing drafting at a ten-attorney firm."
  },
  {
    "id": "EP-TX-0503",
    "role": "estate-planning-attorney",
    "headline": "Trust administration and probate attorney, open to Houston",
    "years": 6,
    "city": "austin-tx",
    "area": "Austin, open to Houston",
    "relocate": [
      "houston-tx"
    ],
    "bars": [
      "Texas"
    ],
    "firmType": "Regional firm",
    "firmSize": "22 attorneys",
    "mix": [
      [
        "Trust administration",
        50
      ],
      [
        "Probate",
        30
      ],
      [
        "Wills and trusts",
        20
      ]
    ],
    "pay": [
      130,
      145
    ],
    "availability": "4 weeks' notice",
    "modes": [
      "on-site",
      "hybrid"
    ],
    "tags": [
      "Texas bar",
      "Trust administration",
      "Probate",
      "Drafting wills and trusts",
      "Court appearances"
    ],
    "timeline": [
      [
        "2022–now",
        "Regional firm, 22 attorneys",
        "Associate. Trust administrations and contested probate hearings."
      ],
      [
        "2020–2022",
        "Small firm, 7 attorneys",
        "Associate. Estate planning and probate."
      ]
    ],
    "why": "Six years in administrations, already licensed in Texas, relocating to Houston."
  },
  {
    "id": "EP-TX-0519",
    "role": "estate-planning-attorney",
    "headline": "Estate planning partner-track attorney with portable book",
    "years": 11,
    "city": "dallas-tx",
    "area": "Dallas",
    "relocate": [],
    "bars": [
      "Texas",
      "Oklahoma"
    ],
    "firmType": "Mid-size firm",
    "firmSize": "40 attorneys",
    "mix": [
      [
        "Wills and trusts",
        50
      ],
      [
        "Estate tax",
        30
      ],
      [
        "Trust administration",
        20
      ]
    ],
    "pay": [
      175,
      200
    ],
    "availability": "60 days' notice",
    "modes": [
      "hybrid"
    ],
    "tags": [
      "Texas bar",
      "Drafting wills and trusts",
      "Estate tax",
      "Trust administration",
      "Portable book"
    ],
    "timeline": [
      [
        "2018–now",
        "Mid-size firm, 40 attorneys",
        "Senior associate. Runs a client base and two paralegals."
      ]
    ],
    "why": "Eleven years and a portable book; looking for a smaller firm."
  },
  {
    "id": "EP-NY-0207",
    "role": "estate-planning-attorney",
    "headline": "Estate planning associate, trusts and estates practice",
    "years": 4,
    "city": "new-york-ny",
    "area": "New York, Manhattan",
    "relocate": [],
    "bars": [
      "New York"
    ],
    "firmType": "Trusts and estates boutique",
    "firmSize": "10 attorneys",
    "mix": [
      [
        "Wills and trusts",
        50
      ],
      [
        "Estate tax",
        25
      ],
      [
        "Probate",
        25
      ]
    ],
    "pay": [
      150,
      170
    ],
    "availability": "4 weeks' notice",
    "modes": [
      "hybrid"
    ],
    "tags": [
      "Drafting wills and trusts",
      "Estate tax",
      "Probate",
      "Client-facing"
    ],
    "timeline": [
      [
        "2022–now",
        "Trusts and estates boutique, 10 attorneys",
        "Associate. Drafting, Surrogate's Court filings."
      ]
    ],
    "why": "Four years at a ten-attorney boutique."
  },
  {
    "id": "EP-CO-0133",
    "role": "estate-planning-attorney",
    "headline": "Estate planning and elder law associate",
    "years": 5,
    "city": "denver-co",
    "area": "Denver",
    "relocate": [],
    "bars": [
      "Colorado"
    ],
    "firmType": "Elder law firm",
    "firmSize": "8 attorneys",
    "mix": [
      [
        "Wills and trusts",
        45
      ],
      [
        "Elder law",
        35
      ],
      [
        "Probate",
        20
      ]
    ],
    "pay": [
      118,
      132
    ],
    "availability": "3 weeks' notice",
    "modes": [
      "on-site",
      "hybrid"
    ],
    "tags": [
      "Drafting wills and trusts",
      "Probate",
      "Client-facing"
    ],
    "timeline": [
      [
        "2021–now",
        "Elder law firm, 8 attorneys",
        "Associate. Medicaid planning, wills and trusts."
      ]
    ],
    "why": "Five years at an eight-attorney firm."
  },
  {
    "id": "LIT-TX-0390",
    "role": "litigation-attorney",
    "headline": "Civil litigation associate, insurance defense background",
    "years": 4,
    "city": "houston-tx",
    "area": "Houston, Downtown",
    "relocate": [],
    "bars": [
      "Texas"
    ],
    "firmType": "Insurance defense firm",
    "firmSize": "14 attorneys",
    "mix": [
      [
        "Insurance defense",
        60
      ],
      [
        "General civil",
        40
      ]
    ],
    "pay": [
      115,
      130
    ],
    "availability": "2 weeks' notice",
    "modes": [
      "on-site",
      "hybrid"
    ],
    "tags": [
      "Texas bar",
      "Court appearances",
      "Depositions"
    ],
    "timeline": [
      [
        "2022–now",
        "Insurance defense firm, 14 attorneys",
        "Associate. 60 active files, first-chair depositions."
      ]
    ],
    "why": "Takes depositions on her own; carries a full caseload."
  },
  {
    "id": "LIT-TX-0422",
    "role": "commercial-litigation-attorney",
    "headline": "Commercial litigation attorney, contract and business disputes",
    "years": 7,
    "city": "houston-tx",
    "area": "Houston, Galleria",
    "relocate": [],
    "bars": [
      "Texas"
    ],
    "firmType": "Business litigation firm",
    "firmSize": "20 attorneys",
    "mix": [
      [
        "Contract disputes",
        55
      ],
      [
        "Business torts",
        30
      ],
      [
        "Appeals",
        15
      ]
    ],
    "pay": [
      150,
      170
    ],
    "availability": "4 weeks' notice",
    "modes": [
      "on-site"
    ],
    "tags": [
      "Texas bar",
      "Court appearances",
      "Depositions",
      "Client-facing"
    ],
    "timeline": [
      [
        "2019–now",
        "Business litigation firm, 20 attorneys",
        "Senior associate. Second chair at trial twice, runs discovery."
      ]
    ],
    "why": "Seven years of business disputes at a 20-attorney firm."
  },
  {
    "id": "RE-TX-0274",
    "role": "real-estate-attorney",
    "headline": "Real estate associate, commercial closings and title",
    "years": 5,
    "city": "houston-tx",
    "area": "Houston, Memorial",
    "relocate": [],
    "bars": [
      "Texas"
    ],
    "firmType": "Real estate firm",
    "firmSize": "9 attorneys",
    "mix": [
      [
        "Commercial closings",
        50
      ],
      [
        "Title review",
        30
      ],
      [
        "Leasing",
        20
      ]
    ],
    "pay": [
      120,
      135
    ],
    "availability": "4 weeks' notice",
    "modes": [
      "on-site",
      "hybrid"
    ],
    "tags": [
      "Texas bar",
      "Client-facing"
    ],
    "timeline": [
      [
        "2021–now",
        "Real estate firm, 9 attorneys",
        "Associate. Closes commercial purchases, reviews title commitments."
      ]
    ],
    "why": "Closes commercial deals without supervision."
  },
  {
    "id": "PL-TX-0611",
    "role": "estate-planning-paralegal",
    "headline": "Estate planning paralegal, drafting and trust funding",
    "years": 6,
    "city": "houston-tx",
    "area": "Houston, Heights",
    "relocate": [],
    "bars": [],
    "firmType": "Estate planning boutique",
    "firmSize": "4 attorneys",
    "mix": [
      [
        "Drafting",
        50
      ],
      [
        "Trust funding",
        30
      ],
      [
        "Probate filings",
        20
      ]
    ],
    "pay": [
      62,
      70
    ],
    "availability": "2 weeks' notice",
    "modes": [
      "on-site"
    ],
    "tags": [
      "Drafting wills and trusts",
      "Trust administration",
      "Client-facing",
      "Spanish"
    ],
    "timeline": [
      [
        "2020–now",
        "Estate planning boutique, 4 attorneys",
        "Paralegal. First drafts, funding letters, signing ceremonies."
      ]
    ],
    "why": "Six years drafting at a four-attorney firm; bilingual."
  },
  {
    "id": "PL-TX-0640",
    "role": "litigation-paralegal",
    "headline": "Litigation paralegal, discovery and e-filing",
    "years": 4,
    "city": "houston-tx",
    "area": "Houston, Energy Corridor",
    "relocate": [],
    "bars": [],
    "firmType": "Litigation firm",
    "firmSize": "11 attorneys",
    "mix": [
      [
        "Discovery",
        50
      ],
      [
        "E-filing",
        30
      ],
      [
        "Trial prep",
        20
      ]
    ],
    "pay": [
      60,
      68
    ],
    "availability": "2 weeks' notice",
    "modes": [
      "on-site",
      "hybrid"
    ],
    "tags": [
      "E-filing",
      "Discovery"
    ],
    "timeline": [
      [
        "2022–now",
        "Litigation firm, 11 attorneys",
        "Paralegal. Discovery responses, state and federal e-filing."
      ]
    ],
    "why": "Runs discovery for three attorneys."
  },
  {
    "id": "PI-TX-0158",
    "role": "personal-injury-attorney",
    "headline": "Personal injury associate, pre-litigation to trial",
    "years": 3,
    "city": "houston-tx",
    "area": "Houston, Midtown",
    "relocate": [],
    "bars": [
      "Texas"
    ],
    "firmType": "Personal injury firm",
    "firmSize": "7 attorneys",
    "mix": [
      [
        "Pre-litigation",
        50
      ],
      [
        "Litigation",
        40
      ],
      [
        "Trial",
        10
      ]
    ],
    "pay": [
      95,
      110
    ],
    "availability": "3 weeks' notice",
    "modes": [
      "on-site"
    ],
    "tags": [
      "Texas bar",
      "Court appearances",
      "Depositions",
      "Spanish",
      "Client-facing"
    ],
    "timeline": [
      [
        "2023–now",
        "Personal injury firm, 7 attorneys",
        "Associate. Demand letters through depositions, bilingual intake."
      ]
    ],
    "why": "Three years start to finish on PI files; bilingual."
  }
];
export const jobs: Job[] = [
  // AUSTIN, TX (10 ROLES)
  {
    "id": "J-AUS-EP-01",
    "role": "estate-planning-attorney",
    "city": "austin-tx",
    "title": "Trust Administration & Probate Attorney",
    "firmSize": "7 attorneys",
    "firmType": "Estate Planning Boutique",
    "mix": "Trust administration, probate, wealth preservation",
    "area": "Central Austin",
    "band": [115, 140],
    "mode": "hybrid",
    "years": "4–7 years",
    "posted": "2026-11-09",
    "easilyApply": true,
    "urgentlyHiring": true
  },
  {
    "id": "J-AUS-EP-02",
    "role": "estate-planning-attorney",
    "city": "austin-tx",
    "title": "High-Net-Worth Estate Planning Associate",
    "firmSize": "14 attorneys",
    "firmType": "Private Wealth & Tax Practice",
    "mix": "Dynasty trusts, family partnerships, estate tax planning",
    "area": "Downtown Austin",
    "band": [140, 175],
    "mode": "hybrid",
    "years": "5–8 years",
    "posted": "2026-11-06",
    "easilyApply": true
  },
  {
    "id": "J-AUS-EP-03",
    "role": "estate-planning-attorney",
    "city": "austin-tx",
    "title": "Junior Estate Planning Associate",
    "firmSize": "5 attorneys",
    "firmType": "Boutique Law Firm",
    "mix": "Will drafting, living trusts, basic probate filings",
    "area": "Domain / North Austin",
    "band": [100, 125],
    "mode": "on-site",
    "years": "2–4 years",
    "posted": "2026-11-02",
    "easilyApply": true
  },
  {
    "id": "J-AUS-LIT-01",
    "role": "litigation-attorney",
    "city": "austin-tx",
    "title": "Commercial Litigation Associate",
    "firmSize": "16 attorneys",
    "firmType": "Business Litigation Firm",
    "mix": "Contract disputes, shareholder litigation, depositions",
    "area": "Downtown Austin",
    "band": [130, 160],
    "mode": "hybrid",
    "years": "3–6 years",
    "posted": "2026-11-08",
    "urgentlyHiring": true
  },
  {
    "id": "J-AUS-LIT-02",
    "role": "litigation-attorney",
    "city": "austin-tx",
    "title": "Probate & Fiduciary Litigation Counsel",
    "firmSize": "9 attorneys",
    "firmType": "Fiduciary Litigation Boutique",
    "mix": "Will contests, fiduciary duty breach, trust disputes",
    "area": "Westlake Hills",
    "band": [145, 185],
    "mode": "hybrid",
    "years": "6–10 years",
    "posted": "2026-11-01",
    "easilyApply": true
  },
  {
    "id": "J-AUS-RE-01",
    "role": "real-estate-attorney",
    "city": "austin-tx",
    "title": "Commercial Real Estate Associate",
    "firmSize": "12 attorneys",
    "firmType": "Real Estate & Development Firm",
    "mix": "Acquisitions, land use, commercial retail leasing",
    "area": "Downtown Austin",
    "band": [125, 155],
    "mode": "hybrid",
    "years": "3–6 years",
    "posted": "2026-11-07"
  },
  {
    "id": "J-AUS-CORP-01",
    "role": "corporate-attorney",
    "city": "austin-tx",
    "title": "Emerging Companies & Venture Capital Associate",
    "firmSize": "18 attorneys",
    "firmType": "Technology & Corporate Firm",
    "mix": "Series seed/A financings, commercial contracts, governance",
    "area": "Domain / North Austin",
    "band": [150, 190],
    "mode": "hybrid",
    "years": "4–7 years",
    "posted": "2026-11-05",
    "easilyApply": true
  },
  {
    "id": "J-AUS-FAM-01",
    "role": "family-law-attorney",
    "city": "austin-tx",
    "title": "Family Law Associate Attorney",
    "firmSize": "8 attorneys",
    "firmType": "Family Law Practice",
    "mix": "Complex asset division, custody hearings, mediation",
    "area": "Central Austin",
    "band": [110, 135],
    "mode": "on-site",
    "years": "3–5 years",
    "posted": "2026-10-29"
  },
  {
    "id": "J-AUS-PL-01",
    "role": "estate-planning-paralegal",
    "city": "austin-tx",
    "title": "Senior Estate Planning & Probate Paralegal",
    "firmSize": "7 attorneys",
    "firmType": "Estate Planning Boutique",
    "mix": "Trust asset funding, deeds preparation, court probate packets",
    "area": "Central Austin",
    "band": [65, 80],
    "mode": "hybrid",
    "years": "4+ years",
    "posted": "2026-11-04",
    "easilyApply": true
  },
  {
    "id": "J-AUS-EMP-01",
    "role": "employment-attorney",
    "city": "austin-tx",
    "title": "Labor & Employment Counsel",
    "firmSize": "11 attorneys",
    "firmType": "Employment Law Firm",
    "mix": "Employer counseling, wage and hour, non-compete agreements",
    "area": "Downtown Austin",
    "band": [135, 165],
    "mode": "hybrid",
    "years": "4–8 years",
    "posted": "2026-10-31"
  },

  // HOUSTON, TX (10 ROLES)
  {
    "id": "J-HOU-EP-01",
    "role": "estate-planning-attorney",
    "city": "houston-tx",
    "title": "Estate Planning Associate",
    "firmSize": "8 attorneys",
    "firmType": "Estate Planning Firm",
    "mix": "Wills and trusts, trust administration",
    "area": "Galleria / Uptown",
    "band": [120, 145],
    "mode": "on-site",
    "years": "3–6 years",
    "posted": "2026-11-08",
    "easilyApply": true
  },
  {
    "id": "J-HOU-EP-02",
    "role": "estate-planning-attorney",
    "city": "houston-tx",
    "title": "Senior Estate Planning & Succession Attorney",
    "firmSize": "15 attorneys",
    "firmType": "Full-Service Small Firm",
    "mix": "Estate planning, business succession, generation skipping",
    "area": "Energy Corridor",
    "band": [145, 175],
    "mode": "hybrid",
    "years": "6–10 years",
    "posted": "2026-11-06",
    "urgentlyHiring": true
  },
  {
    "id": "J-HOU-EP-03",
    "role": "estate-planning-attorney",
    "city": "houston-tx",
    "title": "Junior Estate Planning Associate",
    "firmSize": "5 attorneys",
    "firmType": "Estate Planning Boutique",
    "mix": "Drafting, probate filings, client intake",
    "area": "The Woodlands",
    "band": [98, 120],
    "mode": "on-site",
    "years": "2–4 years",
    "posted": "2026-11-03",
    "easilyApply": true
  },
  {
    "id": "J-HOU-EP-04",
    "role": "estate-planning-attorney",
    "city": "houston-tx",
    "title": "Tax & High Net Worth Estate Planning Counsel",
    "firmSize": "22 attorneys",
    "firmType": "Tax and Estates Firm",
    "mix": "Estate tax, trust administration, international wealth",
    "area": "Downtown Houston",
    "band": [170, 205],
    "mode": "hybrid",
    "years": "8+ years",
    "posted": "2026-11-01"
  },
  {
    "id": "J-HOU-LIT-01",
    "role": "litigation-attorney",
    "city": "houston-tx",
    "title": "Civil Litigation Associate",
    "firmSize": "12 attorneys",
    "firmType": "Litigation Firm",
    "mix": "General civil, commercial disputes, insurance defense",
    "area": "Downtown Houston",
    "band": [115, 140],
    "mode": "on-site",
    "years": "3–5 years",
    "posted": "2026-11-07",
    "easilyApply": true
  },
  {
    "id": "J-HOU-LIT-02",
    "role": "litigation-attorney",
    "city": "houston-tx",
    "title": "Energy & Commercial Litigation Counsel",
    "firmSize": "19 attorneys",
    "firmType": "Commercial Trial Boutique",
    "mix": "Upstream oil & gas, breach of contract, arbitrations",
    "area": "Downtown Houston",
    "band": [155, 195],
    "mode": "hybrid",
    "years": "5–9 years",
    "posted": "2026-11-04",
    "urgentlyHiring": true
  },
  {
    "id": "J-HOU-RE-01",
    "role": "real-estate-attorney",
    "city": "houston-tx",
    "title": "Commercial Real Estate Associate",
    "firmSize": "10 attorneys",
    "firmType": "Real Estate Practice",
    "mix": "Commercial closings, leasing, title review",
    "area": "Memorial",
    "band": [120, 145],
    "mode": "hybrid",
    "years": "4–7 years",
    "posted": "2026-10-31"
  },
  {
    "id": "J-HOU-PL-01",
    "role": "estate-planning-paralegal",
    "city": "houston-tx",
    "title": "Estate Planning & Probate Paralegal",
    "firmSize": "6 attorneys",
    "firmType": "Estate Planning Boutique",
    "mix": "Drafting, trust funding, probate court filings",
    "area": "Bellaire",
    "band": [62, 75],
    "mode": "on-site",
    "years": "3+ years",
    "posted": "2026-11-05",
    "easilyApply": true
  },
  {
    "id": "J-HOU-PI-01",
    "role": "personal-injury-attorney",
    "city": "houston-tx",
    "title": "Plaintiff Personal Injury Trial Associate",
    "firmSize": "9 attorneys",
    "firmType": "Trial Law Firm",
    "mix": "Pre-litigation, trial prep, depositions, first-chair jury",
    "area": "Midtown Houston",
    "band": [110, 135],
    "mode": "on-site",
    "years": "2–5 years",
    "posted": "2026-10-30"
  },
  {
    "id": "J-HOU-CORP-01",
    "role": "corporate-attorney",
    "city": "houston-tx",
    "title": "Corporate Transactions & Governance Associate",
    "firmSize": "14 attorneys",
    "firmType": "Business Law Boutique",
    "mix": "Middle-market M&A, operating agreements, asset sales",
    "area": "Galleria / Uptown",
    "band": [135, 165],
    "mode": "hybrid",
    "years": "3–6 years",
    "posted": "2026-11-02",
    "easilyApply": true
  },

  // DALLAS, TX (10 ROLES)
  {
    "id": "J-DAL-EP-01",
    "role": "estate-planning-attorney",
    "city": "dallas-tx",
    "title": "Estate Planning & Wealth Transfer Associate",
    "firmSize": "11 attorneys",
    "firmType": "Estate Planning Firm",
    "mix": "Wills and trusts, probate, charitable planning",
    "area": "Uptown Dallas",
    "band": [125, 155],
    "mode": "hybrid",
    "years": "3–6 years",
    "posted": "2026-11-08",
    "easilyApply": true,
    "urgentlyHiring": true
  },
  {
    "id": "J-DAL-EP-02",
    "role": "estate-planning-attorney",
    "city": "dallas-tx",
    "title": "Senior Trust & Estate Tax Attorney",
    "firmSize": "20 attorneys",
    "firmType": "Tax & Wealth Advisory Firm",
    "mix": "Complex trusts, estate tax return prep, business succession",
    "area": "Downtown Dallas",
    "band": [160, 195],
    "mode": "hybrid",
    "years": "7+ years",
    "posted": "2026-11-05",
    "easilyApply": true
  },
  {
    "id": "J-DAL-EP-03",
    "role": "estate-planning-attorney",
    "city": "dallas-tx",
    "title": "Probate & Estate Administration Attorney",
    "firmSize": "8 attorneys",
    "firmType": "Probate & Estates Boutique",
    "mix": "Independent probate administration, guardianship, heirships",
    "area": "Plano / Frisco",
    "band": [115, 140],
    "mode": "on-site",
    "years": "3–5 years",
    "posted": "2026-11-01"
  },
  {
    "id": "J-DAL-LIT-01",
    "role": "litigation-attorney",
    "city": "dallas-tx",
    "title": "Commercial Litigation Trial Associate",
    "firmSize": "18 attorneys",
    "firmType": "Litigation Firm",
    "mix": "Business torts, contract disputes, federal court discovery",
    "area": "Downtown Dallas",
    "band": [135, 165],
    "mode": "hybrid",
    "years": "4–7 years",
    "posted": "2026-11-07",
    "urgentlyHiring": true
  },
  {
    "id": "J-DAL-LIT-02",
    "role": "litigation-attorney",
    "city": "dallas-tx",
    "title": "Insurance Defense Litigation Associate",
    "firmSize": "14 attorneys",
    "firmType": "Defense Practice",
    "mix": "Premises liability, transportation, coverage opinions",
    "area": "North Dallas / Addison",
    "band": [105, 130],
    "mode": "hybrid",
    "years": "2–5 years",
    "posted": "2026-10-28",
    "easilyApply": true
  },
  {
    "id": "J-DAL-RE-01",
    "role": "real-estate-attorney",
    "city": "dallas-tx",
    "title": "Real Estate Finance & Development Associate",
    "firmSize": "16 attorneys",
    "firmType": "Real Estate Practice Group",
    "mix": "Multifamily development, borrower/lender loan docs",
    "area": "Uptown Dallas",
    "band": [130, 160],
    "mode": "hybrid",
    "years": "3–6 years",
    "posted": "2026-11-04"
  },
  {
    "id": "J-DAL-CORP-01",
    "role": "corporate-attorney",
    "city": "dallas-tx",
    "title": "Middle-Market M&A Associate Attorney",
    "firmSize": "22 attorneys",
    "firmType": "Corporate Firm",
    "mix": "Mergers, asset acquisitions, private equity portfolio counsel",
    "area": "Downtown Dallas",
    "band": [150, 190],
    "mode": "hybrid",
    "years": "4–8 years",
    "posted": "2026-11-06",
    "easilyApply": true
  },
  {
    "id": "J-DAL-FAM-01",
    "role": "family-law-attorney",
    "city": "dallas-tx",
    "title": "High-Asset Divorce & Family Law Attorney",
    "firmSize": "10 attorneys",
    "firmType": "Family Law Boutique",
    "mix": "High-net-worth property division, prenuptial agreements",
    "area": "Highland Park / University Park",
    "band": [125, 155],
    "mode": "on-site",
    "years": "4–8 years",
    "posted": "2026-10-31"
  },
  {
    "id": "J-DAL-EMP-01",
    "role": "employment-attorney",
    "city": "dallas-tx",
    "title": "Employment Defense Associate",
    "firmSize": "12 attorneys",
    "firmType": "Employment Firm",
    "mix": "FLSA defense, EEOC position statements, restrictive covenants",
    "area": "Downtown Dallas",
    "band": [120, 145],
    "mode": "hybrid",
    "years": "3–6 years",
    "posted": "2026-11-03",
    "easilyApply": true
  },
  {
    "id": "J-DAL-PL-01",
    "role": "litigation-paralegal",
    "city": "dallas-tx",
    "title": "Senior Commercial Litigation Paralegal",
    "firmSize": "15 attorneys",
    "firmType": "Trial Law Firm",
    "mix": "E-discovery, trial binders, deposition scheduling",
    "area": "Downtown Dallas",
    "band": [68, 85],
    "mode": "hybrid",
    "years": "5+ years",
    "posted": "2026-11-02",
    "easilyApply": true
  },

  // SAN ANTONIO, TX (6 ROLES)
  {
    "id": "J-SA-EP-01",
    "role": "estate-planning-attorney",
    "city": "san-antonio-tx",
    "title": "Estate Planning & Probate Associate",
    "firmSize": "6 attorneys",
    "firmType": "Estate Planning Boutique",
    "mix": "Wills, trusts, estate administration, bilingual preferred",
    "area": "Stone Oak / North San Antonio",
    "band": [105, 130],
    "mode": "hybrid",
    "years": "3–6 years",
    "posted": "2026-11-08",
    "easilyApply": true,
    "urgentlyHiring": true
  },
  {
    "id": "J-SA-EP-02",
    "role": "estate-planning-attorney",
    "city": "san-antonio-tx",
    "title": "Senior Probate & Estate Planning Attorney",
    "firmSize": "12 attorneys",
    "firmType": "Full-Service Regional Firm",
    "mix": "High-wealth estate planning, contested probate settlements",
    "area": "Downtown San Antonio",
    "band": [135, 165],
    "mode": "hybrid",
    "years": "6–10 years",
    "posted": "2026-11-04"
  },
  {
    "id": "J-SA-LIT-01",
    "role": "litigation-attorney",
    "city": "san-antonio-tx",
    "title": "Civil Trial Associate Attorney",
    "firmSize": "9 attorneys",
    "firmType": "Trial Law Firm",
    "mix": "General liability, first-party defense, Bexar County courts",
    "area": "Downtown San Antonio",
    "band": [100, 125],
    "mode": "on-site",
    "years": "2–5 years",
    "posted": "2026-11-06",
    "easilyApply": true
  },
  {
    "id": "J-SA-RE-01",
    "role": "real-estate-attorney",
    "city": "san-antonio-tx",
    "title": "Real Estate & Land Use Associate",
    "firmSize": "8 attorneys",
    "firmType": "Real Estate Law Group",
    "mix": "Commercial transactions, zoning, title examination",
    "area": "Alamo Heights",
    "band": [110, 135],
    "mode": "hybrid",
    "years": "3–5 years",
    "posted": "2026-10-29"
  },
  {
    "id": "J-SA-FAM-01",
    "role": "family-law-attorney",
    "city": "san-antonio-tx",
    "title": "Family Law Associate",
    "firmSize": "7 attorneys",
    "firmType": "Family Law Boutique",
    "mix": "Divorce litigation, custody modifications, protective orders",
    "area": "Stone Oak",
    "band": [95, 120],
    "mode": "on-site",
    "years": "2–4 years",
    "posted": "2026-11-01",
    "easilyApply": true
  },
  {
    "id": "J-SA-PL-01",
    "role": "estate-planning-paralegal",
    "city": "san-antonio-tx",
    "title": "Estate Planning & Trust Funding Paralegal",
    "firmSize": "6 attorneys",
    "firmType": "Estate Planning Boutique",
    "mix": "Deed preparation, asset inventory, client execution meetings",
    "area": "Downtown San Antonio",
    "band": [55, 68],
    "mode": "hybrid",
    "years": "3+ years",
    "posted": "2026-11-07",
    "easilyApply": true
  }
];
export const snapshots: Record<string, { firmsHiring: number; shortlistDays: string; onsiteShare: string }> = {
  "houston-tx": {
    "firmsHiring": 31,
    "shortlistDays": "5 business days",
    "onsiteShare": "7 in 10"
  }
};
export const placesToPost: Record<string, Array<{ name: string; cost: string; reach: string; firstApplicant: string; bestFor: string }>> = {
  "houston-tx": [
    {
      "name": "Houston Bar Association career centre",
      "cost": "$250 per 30 days",
      "reach": "Houston attorneys",
      "firstApplicant": "3–5 days",
      "bestFor": "Houston attorney roles"
    },
    {
      "name": "State Bar of Texas career centre",
      "cost": "$300 per 30 days",
      "reach": "Texas-licensed attorneys",
      "firstApplicant": "3–7 days",
      "bestFor": "Licensed attorneys statewide"
    },
    {
      "name": "Law school job boards (UH, South Texas, Thurgood Marshall)",
      "cost": "Free",
      "reach": "Students and recent graduates",
      "firstApplicant": "1–2 weeks",
      "bestFor": "Law clerks and first-year associates"
    },
    {
      "name": "LinkedIn Jobs",
      "cost": "$10–$40 per day promoted",
      "reach": "Broad, all levels",
      "firstApplicant": "1–2 days",
      "bestFor": "Volume; mid-level attorneys"
    },
    {
      "name": "Indeed",
      "cost": "Free or $5–$25 per day sponsored",
      "reach": "Broad, staff roles",
      "firstApplicant": "Same day",
      "bestFor": "Legal assistants and paralegals"
    },
    {
      "name": "Your firm's own careers page",
      "cost": "Free",
      "reach": "People who already know you",
      "firstApplicant": "Varies",
      "bestFor": "Referrals and returning staff"
    }
  ]
};
export const placesToHire: Record<string, Array<{ name: string; kind: string; contact: string; cycle: string }>> = {
  "houston-tx": [
    {
      "name": "University of Houston Law Center",
      "kind": "Law school",
      "contact": "Career development office",
      "cycle": "On-campus interviews in August; spring postings from January"
    },
    {
      "name": "South Texas College of Law Houston",
      "kind": "Law school",
      "contact": "Career resources office",
      "cycle": "Fall interview programme; clerk postings year-round"
    },
    {
      "name": "Thurgood Marshall School of Law",
      "kind": "Law school",
      "contact": "Career services office",
      "cycle": "Fall and spring recruiting; summer clerkships from February"
    },
    {
      "name": "Houston Community College paralegal programme",
      "kind": "Paralegal programme",
      "contact": "Programme coordinator",
      "cycle": "Graduates in May and December"
    },
    {
      "name": "San Jacinto College paralegal programme",
      "kind": "Paralegal programme",
      "contact": "Programme coordinator",
      "cycle": "Graduates in May and December"
    },
    {
      "name": "Houston Bar Association sections",
      "kind": "Bar association",
      "contact": "Section chairs and newsletters",
      "cycle": "Monthly section meetings"
    },
    {
      "name": "Houston Paralegal Association",
      "kind": "Professional association",
      "contact": "Job bank",
      "cycle": "Postings year-round"
    }
  ]
};
export const lateralSources: Record<string, Array<[string, number]>> = {
  "houston-tx": [
    [
      "Other small firms",
      46
    ],
    [
      "Mid-size firms",
      24
    ],
    [
      "Solo practices",
      12
    ],
    [
      "Large firms",
      10
    ],
    [
      "In-house or government",
      8
    ]
  ]
};
export const employerTools = [
  {
    "key": "findCandidates",
    "title": "Find candidates",
    "get": "Anonymised candidates for your seat, ranked by your must-haves. The top three open at once.",
    "time": "About 2 minutes",
    "cta": "Describe your seat"
  },
  {
    "key": "submitJob",
    "title": "Submit a job",
    "get": "Paste the posting you already have. We read it, check the pay against the market and show who fits.",
    "time": "About 1 minute",
    "cta": "Paste your posting"
  },
  {
    "key": "fees",
    "title": "Fees and calculator",
    "get": "Our terms in one table, the fee on your salary, and the questions to ask any recruiter.",
    "time": "About 2 minutes",
    "cta": "See the terms"
  },
  {
    "key": "hiringKit",
    "title": "Hiring kit",
    "get": "A posting template, interview questions, a scorecard, an offer-letter outline and pay models.",
    "time": "Ready to copy",
    "cta": "Open the kit"
  },
  {
    "key": "whereToPost",
    "title": "Where to post in Houston",
    "get": "Every place to post a legal job in Houston, with cost and time to the first applicant.",
    "time": "About 3 minutes",
    "cta": "Compare places to post"
  },
  {
    "key": "whereToHire",
    "title": "Where to hire in Houston",
    "get": "Law schools, paralegal programmes and bar groups, who to contact and when they hire.",
    "time": "About 3 minutes",
    "cta": "See the sources"
  }
];
export const samplePosting: string = "Estate Planning Associate Attorney – Houston, TX\n\nOur 8-attorney firm in the Galleria area is hiring an estate planning associate with 4+ years of experience. You will meet clients, draft wills and revocable trusts, and run trust administrations and probate matters with paralegal support.\n\nRequirements:\n- Licensed in Texas and in good standing\n- 4 to 7 years of estate planning practice\n- Comfortable leading client meetings on your own\n- Estate tax experience a plus; Spanish a plus\n\nSalary: $120,000 – $140,000 depending on experience, plus bonus.\nThis is an on-site position, Monday to Friday.\n\nSend your resume to hiring@examplefirm.com.";
export const parseTags: Record<string, string> = {
  "Texas bar": "texas (bar|licen[cs]e)|licensed in texas|admitted in texas",
  "Drafting wills and trusts": "draft\\w*[^.]{0,40}(wills?|trusts?)|(wills?|trusts?)[^.]{0,30}draft",
  "Trust administration": "trust administrations?|administrations?",
  "Probate": "probate",
  "Estate tax": "estate tax|form 706|gift tax|709",
  "Client-facing": "client meetings?|client-facing|meet (with )?clients|clients? contact",
  "Spanish": "spanish|bilingual",
  "Portable book": "portable|book of business",
  "Court appearances": "court appearances?|hearings?|trial",
  "Depositions": "depositions?",
  "E-filing": "e-?fil(e|ing)",
  "Discovery": "discovery"
};
export const parseRoles: Array<[string, string]> = [
  [
    "estate-planning-paralegal",
    "estate planning paralegal|paralegal[^.]{0,40}estate|probate paralegal"
  ],
  [
    "litigation-paralegal",
    "litigation paralegal|paralegal[^.]{0,40}litigation"
  ],
  [
    "legal-assistant",
    "legal assistant|legal secretary"
  ],
  [
    "commercial-litigation-attorney",
    "commercial litigation|business litigation"
  ],
  [
    "personal-injury-attorney",
    "personal injury"
  ],
  [
    "insurance-defense-attorney",
    "insurance defense"
  ],
  [
    "real-estate-attorney",
    "real estate (attorney|associate|lawyer)"
  ],
  [
    "family-law-attorney",
    "family law"
  ],
  [
    "employment-attorney",
    "employment (law|attorney|lawyer)|labor and employment"
  ],
  [
    "estate-planning-attorney",
    "estate planning|trusts and estates|wills and trusts"
  ],
  [
    "litigation-attorney",
    "litigation|litigator"
  ]
];
export const roleIntro: Record<string, string[]> = {
  "estate-planning-attorney": [
    "At a small or mid-size firm, the estate planning attorney meets clients, designs the plan and drafts wills, trusts and powers of attorney.",
    "Most also run trust administrations and probate matters, often with one paralegal and little partner review.",
    "Senior hires add estate tax returns, business succession and, sometimes, a book of existing clients."
  ]
};
export const payModels: Record<string, Array<{ name: string; how: string; fits: string; typical: string }>> = {
  "estate-planning-attorney": [
    {
      "name": "Salary only",
      "how": "A fixed base, reviewed once a year.",
      "fits": "Associates with 1 to 5 years; firms that want a predictable cost.",
      "typical": "Base inside the Houston band for the level"
    },
    {
      "name": "Salary plus bonus",
      "how": "Base plus a bonus on collections above a set threshold, or an annual discretionary bonus.",
      "fits": "Mid-level attorneys who carry their own files.",
      "typical": "Bonus of 5% to 15% of base"
    },
    {
      "name": "Salary plus origination",
      "how": "Base plus a share of fees collected from clients the attorney brings in.",
      "fits": "Senior attorneys with a portable book.",
      "typical": "25% to 33% of fees on originated matters"
    }
  ]
};
export const hiringKit: Record<string, HiringKitData> = {
  "estate-planning-attorney": {
    "template": [
      [
        "h",
        "Estate planning associate attorney ({years})"
      ],
      [
        "p",
        "{firm} is a {size}-attorney firm in {city} focused on estate planning, probate and trust administration. We are hiring an associate to own client relationships from the first meeting to the signing."
      ],
      [
        "h",
        "What you will do"
      ],
      [
        "li",
        "Meet clients, learn their goals and recommend a plan."
      ],
      [
        "li",
        "Draft wills, revocable trusts, powers of attorney and medical directives."
      ],
      [
        "li",
        "Run trust administrations and probate matters from intake to closing, with a paralegal supporting you."
      ],
      [
        "li",
        "Supervise signings and help clients fund their trusts."
      ],
      [
        "h",
        "What you bring"
      ],
      [
        "li",
        "A {state} law licence in good standing."
      ],
      [
        "li",
        "{years} of estate planning practice."
      ],
      [
        "li",
        "Drafting you are confident to send without close review."
      ],
      [
        "li",
        "Ease leading client meetings on your own."
      ],
      [
        "li",
        "A plus: estate tax returns (Forms 706 and 709), Spanish."
      ],
      [
        "h",
        "Pay and benefits"
      ],
      [
        "li",
        "Base salary {pay}, depending on experience."
      ],
      [
        "li",
        "Health insurance, bar dues and CLE paid."
      ],
      [
        "h",
        "How we work"
      ],
      [
        "p",
        "{mode}, in our {city} office."
      ],
      [
        "h",
        "How to apply"
      ],
      [
        "p",
        "Send your resume to {email}. We reply to every applicant within five business days."
      ]
    ],
    "questions": [
      {
        "q": "Walk me through the last estate plan you designed, from the first meeting to the signing.",
        "good": "Names the client's goals, the documents chosen and why, who drafted what, and how signing and funding were handled.",
        "flag": "Talks only about filling in a template."
      },
      {
        "q": "When would you recommend a revocable trust over a will for a Texas client?",
        "good": "Mentions incapacity planning, privacy, property in other states and blended families. Says a will is often enough because Texas independent administration is simple.",
        "flag": "Recommends a trust for everyone."
      },
      {
        "q": "Tell me about a trust administration you ran. What did you do in the first 30 days?",
        "good": "Notices to beneficiaries, a tax ID for the trust, an inventory, securing assets, a timeline for distributions.",
        "flag": "Cannot describe the steps in order."
      },
      {
        "q": "A client's adult children join the meeting and disagree with the plan. What do you do?",
        "good": "Identifies who the client is, meets the client alone, records capacity and intent, checks for conflicts.",
        "flag": "Tries to find a plan that pleases the children."
      },
      {
        "q": "How many plans did you draft a month, and how much did a partner review?",
        "good": "Gives concrete numbers and says honestly what review they still need.",
        "flag": "Vague about volume."
      },
      {
        "q": "A client's estate may be above the federal exemption. What do you raise?",
        "good": "Portability, lifetime gifts, Form 709 for gifts, Form 706 at death, and when to bring in a CPA.",
        "flag": "Has never worked on a taxable estate and does not say so."
      },
      {
        "q": "What would you need from us in your first 90 days?",
        "good": "Specific: templates, paralegal time, how client intake works, who reviews first drafts.",
        "flag": "No questions about how the firm runs."
      }
    ],
    "scorecard": [
      {
        "k": "Drafting quality",
        "w": 25,
        "hint": "Clean, accurate first drafts"
      },
      {
        "k": "Trust and probate administration",
        "w": 20,
        "hint": "Runs a matter end to end"
      },
      {
        "k": "Client meetings",
        "w": 20,
        "hint": "Leads a meeting alone, explains plainly"
      },
      {
        "k": "Texas estates law",
        "w": 15,
        "hint": "Knows the Estates Code and local practice"
      },
      {
        "k": "File volume and organisation",
        "w": 10,
        "hint": "Carries a full caseload"
      },
      {
        "k": "Fit with a small firm",
        "w": 10,
        "hint": "Comfortable with lean support"
      }
    ],
    "offer": [
      [
        "Position and start date",
        "Job title, the attorney they report to, the start date."
      ],
      [
        "Base salary",
        "Annual base, pay schedule, when it is next reviewed."
      ],
      [
        "Bonus or origination",
        "How any bonus is worked out and when it is paid; the share of fees on originated matters, if any."
      ],
      [
        "Benefits",
        "Health insurance, bar dues, CLE, malpractice cover, paid time off."
      ],
      [
        "Work arrangement",
        "On-site or hybrid days, office hours, where they work."
      ],
      [
        "Licence condition",
        "Offer depends on an active Texas licence in good standing."
      ],
      [
        "At-will statement",
        "Texas employment is at-will unless you agree otherwise in writing."
      ],
      [
        "Confidentiality and client files",
        "Client confidences, firm files and what happens to them when someone leaves."
      ],
      [
        "Restrictions after leaving",
        "Texas Disciplinary Rule 5.06 limits agreements that restrict a lawyer's practice after leaving. Keep this section to what that rule allows."
      ],
      [
        "Acceptance",
        "A date to reply by and a signature line."
      ]
    ]
  }
};
export const recruiterQuestions: Array<{ q: string; why: string; term?: string; text?: string }> = [
  {
    "q": "What is the fee, and is it a share of base salary or total pay?",
    "why": "A share of total pay includes bonus and can cost far more.",
    "term": "fee"
  },
  {
    "q": "Do we pay anything before we hire?",
    "why": "Retainers are paid even if no one is hired.",
    "term": "upfront"
  },
  {
    "q": "How long is the guarantee, and is it a refund or a replacement?",
    "why": "Length and remedy decide what you get back if a hire leaves.",
    "term": "guaranteeDetail"
  },
  {
    "q": "When is the invoice due?",
    "why": "Some recruiters invoice on the offer, before the hire starts.",
    "term": "payment"
  },
  {
    "q": "Do you need exclusivity?",
    "why": "Exclusivity stops you posting or using other recruiters.",
    "term": "exclusivity"
  },
  {
    "q": "If we hire someone you introduced months later, do we owe a fee?",
    "why": "The window decides when an old introduction still costs money.",
    "text": "[introduction window to confirm]"
  },
  {
    "q": "Will candidates learn my firm's name before I agree?",
    "why": "Protects a confidential search.",
    "text": "No. Candidates see a description of the seat until you say yes."
  }
];
export const placesToPostFit: Record<string, string[][]> = {
  "houston-tx": [
    [
      "attorney"
    ],
    [
      "attorney"
    ],
    [
      "clerk"
    ],
    [
      "attorney",
      "paralegal"
    ],
    [
      "paralegal",
      "staff"
    ],
    [
      "attorney",
      "paralegal",
      "staff",
      "clerk"
    ]
  ]
};
export const placesToHireExtra: Record<string, Array<{ name: string; kind: string; contact: string; cycle: string }>> = {
  "houston-tx": [
    {
      "name": "State Bar of Texas Real Estate, Probate and Trust Law Section",
      "kind": "Bar association",
      "contact": "Section events and newsletter",
      "cycle": "Annual meeting and CLE through the year"
    },
    {
      "name": "Houston Young Lawyers Association",
      "kind": "Bar association",
      "contact": "Committees and events",
      "cycle": "Monthly events"
    },
    {
      "name": "Houston Lawyers Association",
      "kind": "Bar association",
      "contact": "Events and member network",
      "cycle": "Events through the year"
    }
  ]
};
export const jobTags: Record<string, string[]> = {
  "J-HOU-EP-01": [
    "Texas bar",
    "Drafting wills and trusts",
    "Trust administration"
  ],
  "J-HOU-EP-02": [
    "Texas bar",
    "Drafting wills and trusts",
    "Client-facing",
    "Portable book"
  ],
  "J-HOU-EP-03": [
    "Texas bar",
    "Drafting wills and trusts",
    "Probate"
  ],
  "J-HOU-EP-04": [
    "Texas bar",
    "Estate tax",
    "Trust administration"
  ],
  "J-HOU-LIT-01": [
    "Texas bar",
    "Court appearances",
    "Depositions"
  ],
  "J-HOU-RE-01": [
    "Texas bar",
    "Client-facing"
  ],
  "J-HOU-PL-01": [
    "Drafting wills and trusts",
    "Trust administration",
    "Probate"
  ],
  "J-HOU-PI-01": [
    "Texas bar",
    "Depositions",
    "Client-facing"
  ],
  "J-DAL-EP-01": [
    "Texas bar",
    "Drafting wills and trusts",
    "Probate"
  ],
  "J-AUS-EP-01": [
    "Texas bar",
    "Trust administration",
    "Probate"
  ]
};
export const sampleResume: string = "[Name hidden in this sample]\nHouston, Texas. Open to on-site or hybrid.\n\nEXPERIENCE\nAssociate attorney, estate planning boutique (6 attorneys), Houston. 2020 to present.\n- Draft revocable trusts, wills and powers of attorney, 15+ plans a month.\n- Run trust administrations end to end, 20+ a year.\n- File probate applications in the Harris County probate courts.\n- Lead client meetings, some in Spanish.\n\nADMISSIONS\nState Bar of Texas, 2020.\n\nEDUCATION\nJ.D., [law school]\n\nCurrent base salary: $118,000";

export const resumeRules = {

  roles: [
    ["estate-planning-paralegal", /estate planning paralegal|paralegal[^.\n]*(trust|estate|probate)/i],
    ["litigation-paralegal", /litigation paralegal|paralegal[^.\n]*(discovery|litigation)/i],
    ["legal-assistant", /legal assistant|legal secretary/i],
    ["commercial-litigation-attorney", /commercial litigation|business litigation/i],
    ["personal-injury-attorney", /personal injury|plaintiff/i],
    ["insurance-defense-attorney", /insurance defense/i],
    ["family-law-attorney", /family law|divorce|custody/i],
    ["real-estate-attorney", /real estate|closings|title commitment/i],
    ["estate-planning-attorney", /estate planning|trusts? and estates|revocable trust|wills/i],
    ["litigation-attorney", /litigation|litigator/i]
  ] as Array<[string, RegExp]>,
  tags: [
    ["Texas bar", /state bar of texas|texas bar|licensed in texas/i],
    ["Drafting wills and trusts", /draft[^.\n]*(trust|will)/i],
    ["Trust administration", /trust administration/i],
    ["Probate", /probate/i],
    ["Estate tax", /estate tax|gift tax|form 70[69]/i],
    ["Client-facing", /client meeting|client-facing|clients? intake|meet clients/i],
    ["Spanish", /spanish|bilingual/i],
    ["Portable book", /portable|book of business/i],
    ["Court appearances", /court appearance|hearings?|first chair|trial/i],
    ["Depositions", /deposition/i],
    ["E-filing", /e-?fil/i],
    ["Discovery", /discovery/i]
  ] as Array<[string, RegExp]>
};

export const bonusNorms: Record<string, string> = {
  "attorney": "Bonus at small firms is usually 5% to 15% of base, often tied to collections or origination.",
  "paralegal": "Bonus at small firms is usually $2k to $6k a year, most often discretionary.",
  "staff": "Bonus at small firms is usually $1k to $3k a year, most often discretionary."
};
export const bestFirmsCriteria: Array<[string, string]> = [
  [
    "Size",
    "Small and mid-size firms; associates get client work early."
  ],
  [
    "Practice focus",
    "At least half the work in one practice area."
  ],
  [
    "Published pay",
    "A base range on every role it opens."
  ],
  [
    "Work arrangement",
    "On-site or hybrid stated up front."
  ],
  [
    "Public reviews",
    "4.5 or more on average, employee and client reviews."
  ]
];
export const bestFirms: Record<string, Array<{ practice: string; desc: string; size: string; area: string; pay: string; mode: string; reviews: string }>> = {
  "houston-tx": [
    {
      "practice": "Estate planning",
      "desc": "Estate planning boutique",
      "size": "8 attorneys",
      "area": "Galleria",
      "pay": "$120k–$145k",
      "mode": "On-site",
      "reviews": "4.8 of 5"
    },
    {
      "practice": "Estate planning",
      "desc": "Tax and estates firm",
      "size": "18 attorneys",
      "area": "Downtown",
      "pay": "$140k–$190k",
      "mode": "Hybrid",
      "reviews": "4.6 of 5"
    },
    {
      "practice": "Estate planning",
      "desc": "Family and estates firm",
      "size": "10 attorneys",
      "area": "Katy",
      "pay": "$110k–$135k",
      "mode": "On-site or hybrid",
      "reviews": "4.7 of 5"
    },
    {
      "practice": "Litigation",
      "desc": "Business litigation firm",
      "size": "20 attorneys",
      "area": "Galleria",
      "pay": "$130k–$175k",
      "mode": "On-site",
      "reviews": "4.5 of 5"
    },
    {
      "practice": "Litigation",
      "desc": "Insurance defense firm",
      "size": "14 attorneys",
      "area": "Downtown",
      "pay": "$105k–$135k",
      "mode": "Hybrid",
      "reviews": "4.6 of 5"
    },
    {
      "practice": "Personal injury",
      "desc": "Plaintiff personal injury firm",
      "size": "9 attorneys",
      "area": "Midtown",
      "pay": "$100k–$125k",
      "mode": "On-site",
      "reviews": "4.9 of 5"
    },
    {
      "practice": "Family law",
      "desc": "Family law firm",
      "size": "7 attorneys",
      "area": "Memorial",
      "pay": "$95k–$125k",
      "mode": "On-site or hybrid",
      "reviews": "4.7 of 5"
    },
    {
      "practice": "Real estate",
      "desc": "Commercial real estate firm",
      "size": "9 attorneys",
      "area": "Memorial",
      "pay": "$118k–$140k",
      "mode": "Hybrid",
      "reviews": "4.5 of 5"
    },
    {
      "practice": "Employment",
      "desc": "Employment law firm",
      "size": "6 attorneys",
      "area": "Greenway Plaza",
      "pay": "$115k–$140k",
      "mode": "Hybrid",
      "reviews": "4.8 of 5"
    }
  ]
};

// Lookups
export function findCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
export function findRole(slug: string): Role | undefined {
  return roles.find((r) => r.slug === slug);
}
export function findBand(city: string, role: string): SalaryBand | undefined {
  return (bands[city] || {})[role];
}
export function findCandidate(id: string): Candidate | undefined {
  return candidates.find((c) => c.id === id);
}
export function findPerson(id: string): Person | undefined {
  return people.find((p) => p.id === id);
}

// Formatting helpers
export const fmt = {
  k: (n: number) => "$" + Math.round(n) + "k",
  range: (r: [number, number]) => "$" + r[0] + "k–$" + r[1] + "k",
  money: (n: number) => "$" + Math.round(n).toLocaleString("en-US"),
  date: (iso: string) => {
    const d = new Date(iso + "T12:00:00");
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
  },
  modes: (a: ("on-site" | "hybrid")[]) => a.length > 1 ? "On-site or hybrid" : (a[0] === "on-site" ? "On-site" : "Hybrid")
};

export function plural(n: number, one: string, many?: string): string {
  return n === 1 ? one : (many || one + "s");
}

export function matchCandidates(brief: {
  role?: string;
  city?: string;
  years?: string;
  mode?: "any" | "on-site" | "hybrid";
  pay?: number | null;
  must?: string[];
}) {
  const city = brief.city ? findCity(brief.city) : undefined;
  const eb = expBands.find((b) => b.key === brief.years);
  return candidates
    .filter((c) => !brief.role || c.role === brief.role)
    .map((c) => {
      const cc = findCity(c.city);
      const checks: Array<{ k: string; ok: boolean }> = [];
      const inCity = !city || c.city === city.slug || c.relocate.includes(city.slug);
      const inState = !city || (cc && cc.state === city.state);
      if (city) checks.push({ k: inCity ? "In " + city.name : "Elsewhere in " + city.stateName, ok: inCity });
      if (eb) checks.push({ k: eb.label, ok: c.years >= eb.min && c.years <= eb.max });
      if (brief.mode && brief.mode !== "any") checks.push({ k: brief.mode === "on-site" ? "On-site" : "Hybrid", ok: c.modes.includes(brief.mode) });
      if (brief.pay) checks.push({ k: "Within " + fmt.k(brief.pay), ok: c.pay[0] <= brief.pay });
      (brief.must || []).forEach((t) => checks.push({ k: t, ok: c.tags.includes(t) }));
      const met = checks.filter((x) => x.ok).length;
      return { c, checks, met, total: checks.length, inCity, inState };
    })
    .filter((r) => r.inCity || r.inState)
    .sort((a, b) => {
      return (b.met / (b.total || 1)) - (a.met / (a.total || 1)) || (Number(b.inCity) - Number(a.inCity)) || (b.met - a.met);
    });
}

export function inBandCandidates(role: string, city: string, pay: number) {
  return matchCandidates({ role, city }).filter((r) => r.c.pay[0] <= pay * 1.05 && r.c.pay[1] >= pay * 0.92);
}

export function salaryPosition(city: string, role: string, expKey: string, val: number) {
  const b = findBand(city, role);
  if (!b) return { where: "in", text: "", mine: "" };
  const r = (b as any)[expKey] as [number, number];
  const eb = expBands.find((x) => x.key === expKey);
  if (!r || !eb) return { where: "in", text: "", mine: "" };
  let pct: number, where: "below" | "above" | "in";
  if (val < r[0]) {
    where = "below";
    pct = Math.max(5, Math.round(25 * val / r[0] - (r[0] - val) / 2));
  } else if (val > r[1]) {
    where = "above";
    pct = Math.min(95, Math.round(75 + (val - r[1]) / 2));
  } else {
    where = "in";
    pct = Math.round(25 + 50 * (val - r[0]) / (r[1] - r[0]));
  }
  let text = "";
  if (where === "below") text = "below the usual range for " + eb.label + " (" + fmt.range(r) + "). Expect fewer strong candidates to engage.";
  else if (where === "above") text = "above the usual range for " + eb.label + " (" + fmt.range(r) + "). You can expect the strongest candidates to take the call.";
  else text = "inside the usual range for " + eb.label + " (" + fmt.range(r) + "), higher than about " + pct + " in 100 offers at this level.";

  let mine = "";
  if (where === "below") mine = "Your base is below the usual range for " + eb.label + " (" + fmt.range(r) + "). Roles paying more are open now.";
  else if (where === "above") mine = "Your base is above the usual range for " + eb.label + " (" + fmt.range(r) + "). Roles at this level are rare; we can tell you when one opens.";
  else mine = "Your base is inside the usual range for " + eb.label + " (" + fmt.range(r) + "), higher than about " + pct + " in 100 people at this level. Roles paying more are open now.";

  return { where, pct, text, mine, range: r, label: eb.label };
}

export interface ParsedPosting {
  role?: string;
  city?: string;
  years?: string;
  lo?: number;
  hi?: number;
  mode?: "on-site" | "hybrid";
  must: string[];
  found: Record<string, boolean>;
}

export function parsePosting(text: string): ParsedPosting {
  const t = " " + String(text || "").toLowerCase().replace(/[–—]/g, "-") + " ";
  const found: Record<string, boolean> = {};
  let role: string | undefined;
  for (const r of parseRoles) {
    if (new RegExp(r[1], "i").test(t)) {
      role = r[0];
      found.role = true;
      break;
    }
  }
  let city: string | undefined;
  for (const c of cities) {
    if (t.includes(c.name.toLowerCase())) {
      city = c.slug;
      found.city = true;
      break;
    }
  }
  const y = t.match(/(\d{1,2})\s*\+?\s*(?:(?:-|to)\s*(\d{1,2})\s*)?(?:\+\s*)?years?/);
  let years: string | undefined;
  if (y) {
    const n = +y[1];
    years = n >= 8 ? "b3" : n >= 4 ? "b2" : "b1";
    found.years = true;
  }
  const pays: number[] = [];
  const re = /\$\s?(\d{2,3})(?:,(\d{3})|\s?k\b)?/g;
  let mm: RegExpExecArray | null;
  while ((mm = re.exec(t)) !== null) {
    const v = +mm[1];
    if (v >= 30 && v <= 500) pays.push(v);
  }
  let lo: number | undefined;
  let hi: number | undefined;
  if (pays.length) {
    lo = Math.min(...pays);
    hi = Math.max(...pays);
    found.pay = true;
  }
  let mode: "on-site" | "hybrid" | undefined;
  if (/hybrid|remote/.test(t)) {
    mode = "hybrid";
    found.mode = true;
  } else if (/on-?site|in-office|in office|in the office/.test(t)) {
    mode = "on-site";
    found.mode = true;
  }
  const currentRole = findRole(role || "estate-planning-attorney");
  const list = (currentRole && mustHaves[currentRole.slug]) || (currentRole && mustHaves[currentRole.kind]) || [];
  const must = list.filter((tag) => {
    const src = parseTags[tag];
    return src && new RegExp(src, "i").test(t);
  });
  return { role, city, years, lo, hi, mode, must, found };
}

export function yearsRange(s: string): [number, number] {
  const a = String(s).match(/(\d+)\s*[–-]\s*(\d+)/);
  if (a) return [+a[1], +a[2]];
  const b = String(s).match(/(\d+)\s*\+/);
  if (b) return [+b[1], 40];
  return [0, 40];
}

export function expKey(y: number): string {
  y = +y || 0;
  return y >= 8 ? "b3" : y >= 4 ? "b2" : "b1";
}

export function toK(v: any): number | null {
  const n = +String(v || "").replace(/[^\d.]/g, "");
  if (!n) return null;
  return n > 1000 ? n / 1000 : n;
}

export interface ParsedResume {
  role: string | null;
  city: string | null;
  years: number | null;
  tags: string[];
  mode: "any" | "on-site" | "hybrid";
  min: number | null;
  base: number | null;
  src?: string;
}

export function parseResume(text: string): ParsedResume {
  const t = String(text || "");
  const p: ParsedResume = { role: null, city: null, years: null, tags: [], mode: "any", min: null, base: null };
  for (let i = 0; i < resumeRules.roles.length; i++) {
    if (resumeRules.roles[i][1].test(t)) {
      p.role = resumeRules.roles[i][0];
      break;
    }
  }
  for (const c of cities) {
    if (!p.city && new RegExp("\\b" + c.name + "\\b", "i").test(t)) {
      p.city = c.slug;
      break;
    }
  }
  const yrs = t.match(/(\d{1,2})\+?\s+years/i);
  const starts = (t.match(/\b(19[89]\d|20[0-2]\d)\b/g) || []).map(Number);
  if (yrs) p.years = +yrs[1];
  else if (starts.length) p.years = Math.max(1, 2026 - Math.min(...starts));

  for (const x of resumeRules.tags) {
    if (x[1].test(t)) p.tags.push(x[0]);
  }
  const on = /on-?site|in office/i.test(t);
  const hy = /hybrid|remote/i.test(t);
  p.mode = on && hy ? "any" : on ? "on-site" : hy ? "hybrid" : "any";
  const pay = t.match(/(?:base|salary|compensation)[^$\n]*\$\s?([\d,]{2,7})(k)?/i);
  if (pay) {
    const v = +pay[1].replace(/,/g, "");
    p.base = pay[2] ? v : v / 1000;
    p.min = p.base;
  }
  return p;
}

export function tagsForRole(roleSlug: string): string[] {
  const r = findRole(roleSlug);
  return ((r && mustHaves[roleSlug]) || (r && mustHaves[r.kind]) || []).slice();
}

export interface MatchedJobResult {
  j: Job;
  checks: Array<{ k: string; ok: boolean }>;
  met: number;
  total: number;
  inCity: boolean;
  why: string;
}

export function matchJobs(p: {
  role: string;
  city?: string | null;
  years?: number | null;
  mode?: string;
  min?: number | null;
  tags: string[];
}): MatchedJobResult[] {
  const city = p.city ? findCity(p.city) : undefined;
  return jobs
    .filter((j) => j.role === p.role && (!city || findCity(j.city)?.state === city.state))
    .map((j) => {
      const jCity = findCity(j.city);
      const inCity = !city || j.city === city.slug;
      const yr = yearsRange(j.years);
      const tags = jobTags[j.id] || [];
      const checks: Array<{ k: string; ok: boolean }> = [];
      const why: string[] = [];

      if (city) checks.push({ k: inCity ? "In " + city.name : "In " + (jCity?.name || j.city), ok: inCity });
      if (p.years != null) {
        const okY = p.years >= yr[0] - 1 && p.years <= yr[1] + 1;
        checks.push({ k: j.years, ok: okY });
      }
      if (p.mode && p.mode !== "any") {
        checks.push({ k: j.mode === "on-site" ? "On-site" : "Hybrid", ok: j.mode === p.mode });
      }
      if (p.min) {
        const okP = j.band[1] >= p.min;
        checks.push({ k: "Up to " + fmt.k(j.band[1]), ok: okP });
        if (okP && j.band[1] > p.min) {
          why.push("Pays up to " + fmt.k(j.band[1]) + ", " + fmt.k(j.band[1] - p.min) + " above your number.");
        }
      }
      const have = tags.filter((t) => p.tags.includes(t));
      tags.forEach((t) => {
        checks.push({ k: t, ok: p.tags.includes(t) });
      });
      if (have.length) {
        why.push("Asks for " + have.slice(0, 2).join(" and ").toLowerCase().replace("texas bar", "a Texas licence") + ", which your resume shows.");
      }
      const met = checks.filter((x) => x.ok).length;
      return { j, checks, met, total: checks.length, inCity, why: why.join(" ") };
    })
    .sort((a, b) => {
      return (b.met / (b.total || 1)) - (a.met / (a.total || 1)) || (Number(b.inCity) - Number(a.inCity)) || (b.j.band[1] - a.j.band[1]);
    });
}

export const DATA = {
  cities,
  roles,
  bands,
  expBands,
  candidates,
  jobs,
  reviews,
  terms,
  trust,
  payDrivers,
  payLevers,
  snapshots,
  placesToPost,
  placesToPostFit,
  placesToHire,
  placesToHireExtra,
  hiringKit,
  bonusNorms,
  bestFirms,
  mustHaves,
  jobTags,
  roleIntro,
  payModels,
  asOf,
  source,
  orionLine,
  sendingDomains,
  samplePosting,
  sampleResume,
  resumeRules,
  lateralSources,
  bestFirmsCriteria,
};
