// Structured agent resource documents (checklists and guides), built from
// Marshall Reddick's real training materials. Each renders as a live, branded
// document at /resources/[docId] with interactive checkboxes and a
// print-to-PDF version. Check state persists per device.

export interface DocItem {
  text: string;
  sub?: string[];
}

export interface DocSection {
  heading: string;
  // Optional intro line under the heading.
  note?: string;
  items: DocItem[];
}

export interface ResourceDoc {
  id: string;
  title: string;
  category: "Buyers" | "Listings" | "Open House" | "Offers" | "Lending";
  audience: "Agent" | "Client";
  minutes: number;
  intro: string;
  sections: DocSection[];
}

export const RESOURCE_DOCS: ResourceDoc[] = [
  {
    id: "buyer-agent-checklist",
    title: "Buyer's Agent Checklist",
    category: "Buyers",
    audience: "Agent",
    minutes: 6,
    intro:
      "The full path for representing a buyer: from first contact, through under contract, to the follow-up that earns reviews and referrals.",
    sections: [
      {
        heading: "Building the relationship",
        items: [
          { text: "Build a relationship. Become friends." },
          {
            text: "Call their lender and build a relationship with them; verify the pre-qual.",
          },
          {
            text: "If the purchase is contingent on the sale of their current residence, verify their home is listed. Do not submit an offer unless it is under contract.",
          },
          { text: "Go through the Must Ask Buyer Questions." },
          {
            text: "Write out the buyer's Must Have, Cannot Have, and Wants for their home.",
          },
          {
            text: "Have a formal sit-down meeting.",
            sub: [
              "Provide their Must Have, Cannot Have, and Wants list.",
              "Show them the MLS and enter their search criteria so they see live results.",
              "Have them adjust and finalize their search criteria.",
              "Bring a personal, thoughtful under-$5 gift.",
            ],
          },
          {
            text: "After the formal sit-down meeting",
            sub: [
              "Email them their Must Have, Cannot Have, and Wants criteria.",
              "If the buyer changes criteria two weeks later, revert to the original meeting list and confirm they are sure.",
            ],
          },
          {
            text: "If prospecting (cold call, expired listing, door knocking, FSBO)",
            sub: [
              "Get a signed Buyer Broker Exclusivity Contract.",
              "Hold the formal meeting at the office.",
            ],
          },
          {
            text: "Put them on an MLS email campaign.",
            sub: [
              "Never more than 20 results in their search criteria.",
              "Show sold property from the last 30 days or less.",
              "At most two campaigns: 1) Active property, 2) Back-up or Pending property.",
            ],
          },
          { text: "Encourage them to go to open houses." },
          {
            text: "Encourage them to walk neighborhoods they like during the day and at night, on their own time.",
          },
          {
            text: "Every time the MLS campaign sends an auto email, reply and tell them what changed.",
          },
        ],
      },
      {
        heading: "Under contract",
        items: [
          { text: "Email the MR Transaction Coordinator the executed purchase contract." },
          {
            text: "Connect the lender, title, escrow, MR Transaction Coordinator, and listing agent together via email.",
          },
          {
            text: "Email escrow for the escrow number and wire instructions; CC the buyer.",
          },
          {
            text: "Email the buyer the timeline of events and the deadlines for each item.",
          },
          { text: "Email the buyer your preferred insurance contact for a property insurance quote." },
          { text: "Have the buyer wire earnest money to escrow." },
          {
            text: "Schedule the building inspection and termite inspection on the same day to save time.",
          },
          { text: "Receive the Natural Hazard Disclosure." },
          {
            text: "Review the Natural Hazard Disclosure, building inspection, and termite inspection.",
          },
          { text: "Schedule the appraisal." },
          {
            text: "Determine if the seller needs to contribute to any issues found with a Request for Repairs.",
          },
          { text: "Determine if the buyer is okay with the appraisal amount." },
          {
            text: "Send the buyers contact information for all utility companies for their new home.",
          },
          { text: "Send the Escrow Commission Disbursement agreement." },
          { text: "5 days before close of escrow: final walk-through with the buyers." },
          {
            text: "Introduce them to the next-door neighbors so you can meet new clients.",
            sub: [
              "Best opener: ask the neighbors for a house cleaner or gardener recommendation.",
            ],
          },
          {
            text: "Deliver keys to the buyer.",
            sub: [
              "Meet the buyers at the home and take a picture with them and the keys in front of the home.",
              "Post the picture on social media and congratulate the buyer.",
            ],
          },
        ],
      },
      {
        heading: "After closing",
        items: [
          {
            text: "Mail a handwritten letter to the buyer's new home thanking them for their trust.",
          },
          { text: "Upload your sale to the Marshall Reddick Zillow profile." },
          {
            text: "Get online reviews.",
            sub: ["Zillow", "Yelp", "LinkedIn"],
          },
          {
            text: "Mail a Christmas card in late November every year with an update on your life.",
          },
          {
            text: "Mail a market update in May about their home value every other year.",
          },
          {
            text: "Post on social media.",
            sub: ["Facebook", "LinkedIn", "Instagram"],
          },
        ],
      },
    ],
  },
  {
    id: "buyer-checklist",
    title: "Buyer Checklist",
    category: "Buyers",
    audience: "Agent",
    minutes: 4,
    intro:
      "What to confirm for each buyer type: primary residence, single-unit investment, and multi-unit investment.",
    sections: [
      {
        heading: "Primary residence",
        items: [
          { text: "Get them to really like you and trust you." },
          { text: "Get pre-qualified." },
          {
            text: "Have them review the Must Have, Cannot Have, and Wants list and agree that is what they are looking for.",
          },
          {
            text: "Drive and walk neighborhoods at night and during the day so they can see themselves living there.",
          },
        ],
      },
      {
        heading: "Investment property (1 unit)",
        items: [
          { text: "Is the property still available? What is the status? Any other offers yet?" },
          { text: "Why are they selling?" },
          {
            text: "Have you received any offers yet? If yes, tell me about them. If not, figure out why.",
          },
          { text: "Is the property rented? If so, what are the lease terms?" },
          { text: "What is the property condition?" },
          { text: "Are the appliances included, and what condition are they in?" },
          { text: "What type of air conditioning does the property have? (central, etc.)" },
          { text: "What type of heating does the property have?" },
          { text: "Is there a laundry hook-up? If not, where is the laundry located?" },
          { text: "Who is managing the property?" },
        ],
      },
      {
        heading: "Investment property (multi-unit)",
        items: [
          { text: "Is the property still available? What is the status? Any other offers yet?" },
          { text: "Why are they selling?" },
          { text: "What is the square footage per unit?" },
          { text: "Which units are rented and which are vacant?" },
          { text: "Are all tenants current on rent payments?" },
          { text: "What are the lease terms, start dates, and end dates?" },
          {
            text: "Confirm which utilities are paid by tenants and which are paid by the owner.",
          },
          {
            text: "How much deferred maintenance is there, and when was the last remodel?",
          },
          { text: "Are the appliances included, and what condition are they in?" },
          {
            text: "What type of air conditioning does the property have? (central, wall unit, window unit)",
          },
          { text: "What type of heating does the property have?" },
          {
            text: "Is there a laundry hook-up in each unit? If not, where is the laundry located?",
          },
          { text: "Who is managing the property?" },
        ],
      },
      {
        heading: "When making an offer",
        items: [
          { text: "Are the smoke detectors and CO2 monitors functioning?" },
          { text: "Put together rental comps for each unit." },
        ],
      },
    ],
  },
  {
    id: "holding-an-open-house",
    title: "Open House Checklist",
    category: "Open House",
    audience: "Agent",
    minutes: 5,
    intro:
      "Everything to bring, set up, and follow up on. The open house is a lead machine when it is run like one.",
    sections: [
      {
        heading: "Agent supplies",
        items: [
          { text: "Supra" },
          { text: "40 house flyers (100 lb cardstock)" },
          { text: "40 lender flyers (100 lb cardstock)" },
          { text: "Flyer holder" },
          { text: "Sign-up sheet" },
          { text: "20 open house feedback forms" },
          { text: "Listing sign and 2 open house signs" },
          {
            text: "Online marketing posted",
            sub: ["Zillow", "Trulia", "Realtor.com", "Redfin"],
          },
          { text: "Email the reverse prospecting list" },
          { text: "20 MR pens and 6 clipboards" },
          { text: "1 candle for the kitchen, plus a lighter" },
          { text: "Bottles of water, bag of ice, bowl for ice" },
          { text: "Balloons" },
          { text: "Veggie tray, tray of cookies, plates, napkins, utensils" },
        ],
      },
      {
        heading: "Homeowner prep",
        items: [
          { text: "Music playing" },
          { text: "Professionally cleaned" },
          { text: "Spare keys for the home and community amenities" },
          {
            text: "Small table at the entrance of the home for all open house material",
          },
        ],
      },
      {
        heading: "Follow-up cadence",
        note: "Run this exact sequence with every attendee.",
        items: [
          { text: "Send a thank-you email to attendees." },
          { text: "Day after the email: follow up with a phone call to each attendee." },
          { text: "Add all attendees to the CRM." },
          {
            text: "For buyer attendees",
            sub: [
              "Day 3: send personalized listings.",
              "Day 4: follow up on the listings; invite them to other open houses or showings this weekend.",
              "Day 5: send a piece of relevant content. Videos and photos of the area work well.",
              "Day 6: follow up by phone to see what further information they would like.",
              "Days 7-8: if unresponsive, check in and reference your open house conversation.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "listing-agent-checklist",
    title: "Listing Agent Checklist",
    category: "Listings",
    audience: "Agent",
    minutes: 8,
    intro:
      "The complete listing playbook: presentation prep, the 24-hour marketing sprint, managing the listing, under contract, and after closing.",
    sections: [
      {
        heading: "Preparing for the listing presentation",
        items: [
          { text: "Build a relationship. Become friends." },
          {
            text: "Study the market, the neighborhood, nearby schools; know the comps by memory (price, address, location).",
          },
          {
            text: "Meet in person at their home for the listing presentation.",
            sub: [
              "2 to 4 days before the meeting, email them a CMA of their home.",
              "Do not give the value of their home until after you have seen it.",
              "The night before, check the market for updates to add to your presentation.",
            ],
          },
          {
            text: "Create a listing presentation packet for each person you present to.",
            sub: [
              "Print everything in color on gloss paper.",
              "Include: current market analysis, your personalized MR listing presentation, seller net sheet, seller's checklist, listing agent's checklist, and the listing agreement.",
              "Place everything in a Marshall Reddick folder with your business card.",
            ],
          },
          {
            text: "At the listing presentation",
            sub: [
              "Print Seller Questions (and Buyer Questions if applicable) for yourself only.",
              "Take notes as you walk the home and ask a ton of questions.",
              "Sit down and go through every question; take notes so you only ask once.",
              "Provide two list prices and let the seller choose: List Price 1 goes under contract in 30 days; List Price 2 in 60 days.",
              "Tell them you value their time and yours, and you will not list at an unrealistic price.",
              "State the listing and buying agent fee and get verbal agreement.",
              "Get the listing agreement signed.",
            ],
          },
          {
            text: "If they do not sign at the presentation, email the listing agreement for e-signature within 12 hours.",
          },
        ],
      },
      {
        heading: "Marketing the listing (24 hours to complete)",
        note: "Starts the moment the listing agreement is signed.",
        items: [
          {
            text: "Email the listing agreement to the sales assistant, transaction coordinator, and marketing team.",
          },
          {
            text: "Verify all keys (property, mailbox, HOA common areas) are in your possession, not the seller's.",
          },
          { text: "Marketing team verifies every item on the Seller Checklist is complete." },
          { text: "Marketing team schedules a professional photographer." },
          {
            text: "Sales assistant arrives 30 minutes before the photographer to confirm staging.",
          },
          {
            text: "Verify HOA details",
            sub: [
              "How many HOAs are there and what are the names?",
              "Who is the property manager and point of contact? Build a strong relationship; they are key.",
              "Total fee amount, and is it monthly, quarterly, or semi-annual?",
              "What utilities are covered and who are the providers?",
              "Is the HOA in any litigation?",
              "Do they allow FHA or VA financing?",
              "Any special assessments coming up?",
              "How many units are in the development?",
              "When were fees last raised?",
              "Condos or townhomes, and is it in a PUD?",
              "Is the HOA responsible for roofs and exteriors?",
            ],
          },
          { text: "Verify Mello-Roos fees." },
          {
            text: "Schedule open houses for the first two weekends: one Saturday, one Sunday, always 12pm to 4pm.",
          },
          {
            text: "Write a detailed property description and have the homeowner proofread and sign off.",
          },
          { text: "Put a Supra on the home." },
          {
            text: "Place in the home: property flyers (100 lb cardstock), flyer holder, MR pens, and any garage or community keys.",
          },
          { text: "Put a listing sign in the front yard or window." },
          {
            text: "List the home on the MLS only after everything above is complete; email the MLS listing to the homeowner for sign-off.",
          },
        ],
      },
      {
        heading: "During the listing, prior to contract",
        items: [
          {
            text: "Email all agents whose MLS campaigns include your listing via reverse prospecting; repeat on any price change.",
          },
          {
            text: "Weekly email to the seller: calls, emails, showings, and open house traction.",
          },
          { text: "Answer calls from listing agents and buyers." },
          { text: "Coordinate property showings and hold open houses." },
          { text: "After each open house, add everyone to the CRM." },
          { text: "Discuss offers with the seller; negotiate with buyers; write counters." },
          { text: "Keep the MLS status updated." },
        ],
      },
      {
        heading: "Under contract",
        items: [
          { text: "Email the MR Transaction Coordinator the executed purchase contract." },
          {
            text: "Connect lender, title, escrow, MR Transaction Coordinator, and buyer's agent via email.",
          },
          {
            text: "Email the seller and the buyer's agent the timeline and contingency deadlines.",
          },
          {
            text: "Day escrow opens: if in an HOA, make sure escrow coordinates HOA docs with the seller.",
          },
          { text: "Day 1: confirm escrow sent wiring instructions to the buyer." },
          {
            text: "Day 3: verify the TC emailed seller disclosures (AVID, SPQ, TDS); verify escrow received earnest money. Do not change the MLS to under contract until earnest money is verified.",
          },
          {
            text: "Day 7: confirm escrow sent buyer the HOA docs; verify the buyer's lender is on track and the appraisal is ordered and scheduled.",
          },
          {
            text: "Follow up with the buyer's agent 5 days before each contingency deadline.",
          },
          {
            text: "If the termite report is the seller's responsibility, order it within 5 days of opening escrow.",
          },
          { text: "Review the NHD, building inspection, and termite inspection; have the TC order the NHD report." },
          {
            text: "Negotiate the Request for Repairs, appraisal amount, and anything else at the same time.",
          },
          {
            text: "Weekly: follow up with escrow on outstanding signatures from buyer and seller.",
          },
          {
            text: "Do not remove staging items until the buyer releases all contingencies.",
          },
          {
            text: "Make sure the seller receives the seller net sheet and completes the HOA and loan information sheet.",
          },
          {
            text: "Once the grant deed records, have the buyer's agent pick up the keys, then remove the Supra.",
          },
          { text: "Instruct the seller to end utility service accounts and the gardener." },
          { text: "Send the Escrow Commission Disbursement agreement." },
        ],
      },
      {
        heading: "After closing",
        items: [
          { text: "Pick up the sign and Supra." },
          { text: "Handwritten thank-you letter for their business." },
          { text: "Upload the sale to your Zillow agent profile." },
          {
            text: "Get online reviews.",
            sub: ["Zillow", "Yelp", "Trulia", "LinkedIn"],
          },
          {
            text: "Post on social media.",
            sub: ["Facebook", "LinkedIn", "Instagram"],
          },
          { text: "Mail a Christmas card every November with an update on your life." },
          {
            text: "Mail a market update in May every year, tailored to whether they own or rent their new home.",
          },
        ],
      },
    ],
  },
  {
    id: "qualifying-a-buyer",
    title: "Qualifying a Buyer",
    category: "Lending",
    audience: "Agent",
    minutes: 4,
    intro:
      "The exact questions to ask a lender to verify a buyer is truly pre-qualified, before you spend a weekend in the car.",
    sections: [
      {
        heading: "Before you call",
        items: [
          {
            text: "Determine if the lender was referred by the buyer's agent or if the buyer found them on their own.",
          },
          {
            text: "Look the lender up on Zillow and Yelp. If there are no reviews or bad reviews, have the borrower get pre-approved with your preferred lender immediately.",
          },
        ],
      },
      {
        heading: "Questions for the borrower's lender",
        items: [
          {
            text: "Did the borrower initially choose you as their lender, or did their Realtor refer you?",
          },
          { text: "Tell me about your borrower. (Leave it open-ended and let them speak.)" },
          { text: "What documentation have you received from the borrower so far?" },
          { text: "What documentation are you still waiting on?" },
          { text: "Has the file gone through DU approval?" },
          { text: "What is their mid FICO score, and what is the date of the credit report?" },
          { text: "What is the borrower's DTI ratio?" },
          { text: "What loan program are they qualified for?" },
          { text: "How much are they putting down?" },
          {
            text: "How recent are the bank statements? (Always obtain the most recent copies if you are the listing agent.)",
          },
          { text: "How much do they have in reserves for closing costs?" },
          {
            text: "Have the funds been seasoned long enough? (If an investment property purchase.)",
          },
          {
            text: "How many transactions have you completed with the buyer's agent? (If you are the listing agent.)",
          },
          { text: "How many transactions have you completed with this borrower?" },
          {
            text: "Have you received tax returns to check for an IRS form 2106 or additional properties owned?",
          },
          {
            text: "Have you completed a 4506T tax transcript verification and employment verification (4506T and VOE)?",
          },
          { text: "Do you need anything else from me?" },
        ],
      },
    ],
  },
  {
    id: "seller-checklist",
    title: "Seller Checklist",
    category: "Listings",
    audience: "Client",
    minutes: 3,
    intro:
      "Hand this to your seller. A home that follows this list photographs better, shows better, and sells faster.",
    sections: [
      {
        heading: "Get the home ready",
        items: [
          { text: "Take all family and pet pictures out of the home." },
          {
            text: "Declutter the home and put everything in boxes in the garage.",
            sub: ["The home should look almost empty, like Dwell magazine."],
          },
          { text: "Spruce up landscaping." },
          { text: "Determine if any repairs or renovations are needed." },
          { text: "Deep clean the entire home." },
        ],
      },
      {
        heading: "Decisions to make",
        items: [
          {
            text: "What items, if any, would you like to offer available for sale when you sell the home?",
            sub: ["What price do you want for each item?"],
          },
          { text: "Set a date to list the property." },
          { text: "Sign the listing contract." },
          { text: "Set two dates for open houses." },
          { text: "What are your HOA and/or Mello-Roos taxes, if applicable?" },
        ],
      },
      {
        heading: "While the home is listed",
        items: [
          {
            text: "Proofread your home description to ensure everything is accounted for and accurate.",
          },
          {
            text: "If you are occupying the home, can you have it tour-ready for buyers at all times with 3 hours notice?",
          },
          {
            text: "If you have pets, what is your plan for them while buyers tour the home?",
          },
        ],
      },
    ],
  },
  {
    id: "submitting-an-offer",
    title: "Submitting an Offer",
    category: "Offers",
    audience: "Agent",
    minutes: 3,
    intro:
      "The clean, repeatable sequence for getting an offer written, signed, submitted, and confirmed.",
    sections: [
      {
        heading: "Before you write",
        items: [
          { text: "Get proof of funds from the buyer." },
          {
            text: "Get a pre-approval letter from the lender with the exact amount as your offer price.",
            sub: ["The pre-qual letter must always match your purchase price exactly."],
          },
          { text: "Run a CMA." },
          { text: "Get a feel for what the buyers want to offer." },
          { text: "Call the listing agent and get a verbal agreement on offer terms." },
          { text: "Call the buyer and get them to agree to the buying terms." },
        ],
      },
      {
        heading: "Write and submit",
        items: [
          { text: "Write the offer." },
          { text: "Get the offer e-signed." },
          {
            text: "Submit the offer package.",
            sub: [
              "Proof of funds (down payment and closing costs).",
              "Pre-approval letter.",
              "Purchase agreement.",
            ],
          },
          { text: "Call the listing agent and confirm they got the offer." },
        ],
      },
    ],
  },
  {
    id: "price-reduction-guide",
    title: "Price Reduction Conversation Guide",
    category: "Listings",
    audience: "Agent",
    minutes: 4,
    intro:
      "Built in the same style as the other MR checklists: how to prepare for, hold, and follow up on the price reduction conversation no agent loves having.",
    sections: [
      {
        heading: "Before the conversation",
        items: [
          {
            text: "Pull the numbers: showings, online views, saves, and open house traffic for the last 14 days.",
          },
          { text: "Refresh the CMA with the newest solds and pendings." },
          {
            text: "Identify the competition: every active listing a buyer would tour instead of yours.",
          },
          {
            text: "Decide your recommended new price before the call. Never negotiate against yourself live.",
          },
        ],
      },
      {
        heading: "The conversation",
        items: [
          { text: "Lead with the data, not the ask: views, showings, and feedback first." },
          {
            text: "Anchor to the original strategy: the 30-day and 60-day list price options from the listing presentation.",
          },
          {
            text: "Present the new price as the path to their goal, with the projected days to contract.",
          },
          { text: "Get verbal agreement, then send the price change for e-signature same day." },
        ],
      },
      {
        heading: "After the reduction",
        items: [
          {
            text: "Email all agents via reverse prospecting whose campaigns include the listing.",
          },
          { text: "Update the MLS and every syndication portal the same day." },
          { text: "Schedule a fresh open house for the first weekend at the new price." },
          { text: "Send the seller a one-week traction report after the change." },
        ],
      },
    ],
  },
];

export function getResourceDoc(id: string): ResourceDoc | undefined {
  return RESOURCE_DOCS.find((d) => d.id === id);
}

// Check-state persistence (per document, per device).
export function loadDocChecks(docId: string): string[] {
  try {
    const raw = window.localStorage.getItem(`mr-doc-checks-${docId}`);
    const parsed = raw ? (JSON.parse(raw) as string[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveDocChecks(docId: string, checks: string[]) {
  try {
    window.localStorage.setItem(`mr-doc-checks-${docId}`, JSON.stringify(checks));
  } catch {
    // ignore
  }
}
