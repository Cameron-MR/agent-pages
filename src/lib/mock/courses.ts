// Interactive guided courses for /training/[courseId]. Built from real
// Marshall Reddick training material. Each course is a sequence of modules
// and lessons made of typed blocks (text, callouts, lists, quizzes, tables,
// and interactive widgets). Progress persists per device.

export type CourseBlock =
  | { kind: "text"; body: string }
  | { kind: "callout"; title: string; body: string }
  | { kind: "list"; title?: string; ordered?: boolean; items: string[] }
  | { kind: "table"; title?: string; headers: string[]; rows: string[][] }
  | {
      kind: "quiz";
      question: string;
      options: string[];
      answer: number;
      explain: string;
    }
  | { kind: "classifier" }
  | { kind: "takeaways"; items: string[] };

export interface CourseLesson {
  id: string;
  title: string;
  minutes: number;
  blocks: CourseBlock[];
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: CourseLesson[];
}

export interface InteractiveCourse {
  id: string;
  title: string;
  category: string;
  summary: string;
  level: string;
  modules: CourseModule[];
}

// ---------------------------------------------------------------------------
// Course 1: Webinar Speaker Playbook (from "New Event Speaker Steps")
// ---------------------------------------------------------------------------

const SPEAKER_COURSE: InteractiveCourse = {
  id: "webinar-speaker",
  title: "Webinar Speaker Playbook",
  category: "Marketing",
  summary:
    "Everything a new event speaker does from the week before a Marshall Reddick webinar through going live: prep, practice mode, and presenting like a pro.",
  level: "New speakers",
  modules: [
    {
      id: "m1",
      title: "The week before",
      lessons: [
        {
          id: "l1",
          title: "Lock in your prep",
          minutes: 4,
          blocks: [
            {
              kind: "text",
              body: "Great webinars are won the week before, not the day of. The moment you are assigned to an event, your prep clock starts.",
            },
            {
              kind: "list",
              ordered: true,
              items: [
                "Accept the calendar invite with the advisor assigned to the event, blocking off 30 minutes before the event start time.",
                'Watch for an email titled "You\'re a panelist for (name of event)" and keep it; you will need it on event day.',
                "Watch the most recent recording of the same topic on the Learn page.",
                "Set up a meeting with the advisor and sales manager at least one week before the event to review the slides.",
              ],
            },
            {
              kind: "callout",
              title: "In the slide review",
              body: "Add your bio slide, include new featured properties, and update any information that has changed. The deck should feel current and personal.",
            },
            {
              kind: "list",
              items: [
                "Have all slides finalized at least 3 days before the event.",
                "All speakers schedule a practice run at least 2 days before the event: a full mock presentation in practice mode.",
              ],
            },
            {
              kind: "quiz",
              question: "When should your slides be fully finalized?",
              options: [
                "The morning of the event",
                "At least 3 days before the event",
                "At the practice run",
                "One week after the slide review",
              ],
              answer: 1,
              explain:
                "Slides are locked at least 3 days out, which leaves room for the full practice run 2 days before the event.",
            },
          ],
        },
        {
          id: "l2",
          title: "The prep timeline at a glance",
          minutes: 2,
          blocks: [
            {
              kind: "table",
              title: "Countdown to the webinar",
              headers: ["When", "What happens"],
              rows: [
                ["1+ week out", "Accept invite, watch the last recording, slide review with advisor + sales manager"],
                ["3 days out", "All slides finalized"],
                ["2 days out", "Full practice run in practice mode"],
                ["1 hour before", "Log in with the advisor, tech check in practice mode"],
                ["30 min before", "Blocked time on your calendar; quiet room, water, charger"],
              ],
            },
            {
              kind: "takeaways",
              items: [
                "Your prep starts the moment you accept the calendar invite.",
                "Watch the most recent recording so you know the flow before you touch the slides.",
                "Slides final 3 days out; practice run 2 days out. No exceptions.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "m2",
      title: "Day of the webinar",
      lessons: [
        {
          id: "l3",
          title: "Logging in and your setup",
          minutes: 4,
          blocks: [
            {
              kind: "list",
              ordered: true,
              items: [
                "Log into the webinar with the advisor 1 hour before the start time.",
                'Find the email titled "You\'re a panelist for (name of event)" in your MR inbox. If you cannot locate it, contact the Marketing team to resend it.',
                'Click the blue "Join Webinar" button in the email. This opens GoTo Webinar, where you join as a panelist in Practice Mode.',
                "Camera and audio go on immediately so technical problems surface early, not live.",
              ],
            },
            {
              kind: "callout",
              title: "Your room is part of the presentation",
              body: "Quiet room, no distractions. Laptop charger plugged in. Strong Wi-Fi. Glass of water nearby. Dressed professionally with a clean, professional background. Cameras stay on for the whole presentation.",
            },
            {
              kind: "quiz",
              question: "You cannot find the panelist email on event day. What do you do?",
              options: [
                "Email the attendees for the link",
                "Skip the webinar",
                "Contact the Marketing team to resend it",
                "Create your own GoTo meeting",
              ],
              answer: 2,
              explain:
                "The Marketing team owns the panelist invites and can resend yours immediately.",
            },
          ],
        },
        {
          id: "l4",
          title: "Practice mode and slide control",
          minutes: 4,
          blocks: [
            {
              kind: "text",
              body: "Practice mode is the private green room before the webinar goes live. This is where roles and controls get sorted.",
            },
            {
              kind: "list",
              items: [
                "The advisor is the presenter; they share their screen.",
                "The advisor grants you Keyboard & Mouse Control so you can move forward and back through the slides from your end.",
                "Do not touch your keyboard or mouse while the advisor is moving through their slides.",
                "When it is your turn, click your mouse or press a key to take control of the slides.",
              ],
            },
            {
              kind: "quiz",
              question:
                "The advisor is presenting their section. Your hand is resting on your mouse. What is the risk?",
              options: [
                "Nothing; only the presenter can move slides",
                "You could take slide control and move their deck mid-sentence",
                "Your camera turns off",
                "GoTo Webinar ends the session",
              ],
              answer: 1,
              explain:
                "With Keyboard & Mouse Control granted, any click or keypress takes control of the slides. Hands off until it is your turn.",
            },
            {
              kind: "takeaways",
              items: [
                "Join 1 hour early with the advisor, always through the panelist email.",
                "Treat practice mode as the tech rehearsal: camera, audio, slides, controls.",
                "Slide control follows your keyboard and mouse. Touch nothing until it is your turn.",
              ],
            },
          ],
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Course 2: Reddick Property Rating (from the Property Class eBook by Ross
// Nelson, Marshall Reddick Real Estate)
// ---------------------------------------------------------------------------

const PROPERTY_CLASS_COURSE: InteractiveCourse = {
  id: "property-classes",
  title: "Reddick Property Rating: Property Classes",
  category: "New Agent",
  summary:
    "Master the 5 property classes and the Reddick Property Rating so you can classify any address, set the right expectations for maintenance, vacancy, and appreciation, and advise investors with confidence.",
  level: "New agents",
  modules: [
    {
      id: "m1",
      title: "Identify: why classes exist",
      lessons: [
        {
          id: "l1",
          title: "The 5 property classes",
          minutes: 4,
          blocks: [
            {
              kind: "callout",
              title: "The core idea",
              body: "Residential real estate investing is an art, not a science. With the Reddick Property Rating placing properties into 1 of 5 classes, you can be nearly exact when projecting expected return. True success comes from focusing on the neighborhood and location, not the physical attributes of the property.",
            },
            {
              kind: "list",
              title: "The 5 property classes",
              ordered: true,
              items: ["Luxury Class", "A Class", "B Class", "C Class", "D Class"],
            },
            {
              kind: "text",
              body: "Why classify at all? To identify the type of tenant or homeowner you will market to when it is time to lease or sell. Build a cookie-cutter 3 bed/2 bath stucco home in Bel-Air and the buyer pays for the land and demolishes your house. Build a $5,000,000 custom spec home in a struggling market and you lose money the day you sell. The class tells you what the location can support.",
            },
            {
              kind: "table",
              title: "Who lives in each class (by profession and income)",
              headers: ["Class", "Typical tenant or homeowner"],
              rows: [
                ["Luxury", "Business professional, business owner, graduate-level college"],
                ["A Class", "Mid-level management, white collar, undergraduate college"],
                ["B Class", "Entry-level management, young adult, high school graduate"],
                ["C Class", "Hourly employee, blue collar, high school graduate"],
                ["D Class", "Low income, below the poverty line"],
              ],
            },
            {
              kind: "quiz",
              question:
                "What is the main reason properties are placed into classes?",
              options: [
                "To set the listing price",
                "To identify the tenant or homeowner you will market to",
                "To calculate property taxes",
                "To pick the paint colors for a rehab",
              ],
              answer: 1,
              explain:
                "Classes exist to identify your audience: the type of tenant or homeowner the location attracts when you lease or sell.",
            },
          ],
        },
      ],
    },
    {
      id: "m2",
      title: "Classify: the Reddick Property Rating",
      lessons: [
        {
          id: "l2",
          title: "What matters most vs least",
          minutes: 5,
          blocks: [
            {
              kind: "list",
              title: "What matters most (the environment)",
              items: [
                "Purchase price compared to the median home price of the Metropolitan Statistical Area (MSA).",
                "Cost per square foot compared to the MSA median. Not national numbers; that specific MSA.",
                "School district: high-income earners buy into the best school zones, driving up nearby values.",
                "Crime rate: nearly non-existent in Luxury and A Class areas; very high in D Class, and it can creep into the wrong parts of B and C.",
              ],
            },
            {
              kind: "list",
              title: "What matters least (the physical attributes)",
              items: [
                "Property type: an apartment is not automatically lower class than a single family home. Manhattan penthouses are Luxury Class.",
                "Age: an older home can be updated, remodeled, or replaced. Land and neighborhood are the real currency.",
                "Size: 25 acres of swampland versus a small every-inch-counts San Francisco luxury apartment.",
                "Condition: it is always cheaper to rehab a house than to rehab a neighborhood.",
              ],
            },
            {
              kind: "callout",
              title: "Remember",
              body: "Everything that matters most is about the property's environment. The physical attributes only become deciders when a property sits on the border between two classes.",
            },
            {
              kind: "quiz",
              question: "Which of these matters MOST when classifying a property?",
              options: [
                "The age of the home",
                "The size of the lot",
                "The school district it is zoned for",
                "Whether it is a condo or a single family home",
              ],
              answer: 2,
              explain:
                "School district is an environment factor, one of the strongest indicators of purchase prices. Age, size, and property type matter least.",
            },
          ],
        },
        {
          id: "l3",
          title: "The 4 steps to classify any property",
          minutes: 7,
          blocks: [
            {
              kind: "list",
              ordered: true,
              title: "The Reddick Property Rating process",
              items: [
                "Step 1: Determine the current median home price of the MSA, adjusted for the market trend (divide the predicted annual change by 4 and apply it to the latest quarterly number).",
                "Step 2: Determine the property's market value. Rent-ready: between appraisal and what a willing buyer offers. Needs rehab: adjust the value for the equity the remodel builds.",
                "Step 3: Build the purchase price boundaries for each class in that MSA using the median (m).",
                "Step 4: Locate where your property's value falls on the Property Class Scale. On the border? Use the physical attributes as the tiebreaker.",
              ],
            },
            {
              kind: "callout",
              title: "MR rules for remodeling (Step 2)",
              body: "If the remodel costs less than $10,000, multiply every dollar spent by 1.2. If it costs more than $10,000, multiply every dollar by 1.5. For multi-unit properties, divide the adjusted value by the number of units and classify on the per-unit number.",
            },
            {
              kind: "table",
              title: "SFR purchase price ranges (m = adjusted MSA median)",
              headers: ["Class", "Range"],
              rows: [
                ["Luxury", "above m x 1.3"],
                ["A Class", "m x 1.0 to m x 1.3"],
                ["B Class", "m x 0.8 to m x 1.0"],
                ["C Class", "m x 0.5 to m x 0.8"],
                ["D Class", "below m x 0.5"],
              ],
            },
            {
              kind: "table",
              title: "Per-unit ranges (duplex, triplex, 4-plex, condo, apartment)",
              headers: ["Class", "Range"],
              rows: [
                ["Luxury", "above m x 0.9"],
                ["A Class", "m x 0.7 to m x 0.9"],
                ["B Class", "m x 0.5 to m x 0.7"],
                ["C Class", "m x 0.3 to m x 0.5"],
                ["D Class", "below m x 0.3"],
              ],
            },
            {
              kind: "quiz",
              question:
                "A 4-plex in Atlanta: $360,000 purchase + $25,000 rehab. Adjusted MSA median is $159,277. What class is it?",
              options: ["A Class", "B Class", "C Class", "D Class"],
              answer: 1,
              explain:
                "Rehab over $10K: $360,000 + ($25,000 x 1.5) = $397,500. Per unit: $99,375. The B Class per-unit band for this MSA runs $79,639 to $111,494, so it is squarely B Class.",
            },
          ],
        },
        {
          id: "l4",
          title: "Try it: the interactive classifier",
          minutes: 5,
          blocks: [
            {
              kind: "text",
              body: "Use the live classifier below. Enter any MSA median price and property value, pick single family or per-unit, and watch where the property lands on the Property Class Scale.",
            },
            { kind: "classifier" },
            {
              kind: "callout",
              title: "Border calls (within 5% of a dividing line)",
              body: "A brand-new 4/2 SFR valued at $201,500 where the A/B line is $200,000 is a B Class property: nothing can be added to raise its value, so it will be one of the nicest B Class homes in the market. A dated 2/1 needing repairs at the same $201,500 is A Class: the location alone holds that value, and renovation pushes it well above the line. Ask: how much value can the physical attributes still add?",
            },
            {
              kind: "quiz",
              question:
                "A property sits 3% above the A/B dividing line. It is new construction with every upgrade already done. Which class?",
              options: [
                "A Class, the math says so",
                "B Class, because no additional value can be added; only the environment can move it",
                "Luxury, because it is brand new",
                "C Class, to be safe",
              ],
              answer: 1,
              explain:
                "On the border, physical attributes break the tie. A maxed-out new build has no value left to add, so it classifies down: one of the nicest B Class homes in the market.",
            },
          ],
        },
      ],
    },
    {
      id: "m3",
      title: "Apply: running the numbers",
      lessons: [
        {
          id: "l5",
          title: "Maintenance and vacancy by class",
          minutes: 6,
          blocks: [
            {
              kind: "text",
              body: "Class drives the two numbers every investor must budget: maintenance (money you spend to keep the property rent-ready) and vacancy (income you do not collect). Maintenance is a check you write; vacancy is simply a lack of income.",
            },
            {
              kind: "table",
              title: "1-4 unit properties",
              headers: ["", "A Class", "B Class", "C Class"],
              rows: [
                ["Maintenance", "8%", "10%", "13%"],
                ["Vacancy", "8%", "10%", "13%"],
              ],
            },
            {
              kind: "table",
              title: "5+ unit properties",
              headers: ["", "A Class", "B Class", "C Class"],
              rows: [
                ["Maintenance", "10%", "12%", "15%"],
                ["Vacancy", "8%", "10%", "13%"],
              ],
            },
            {
              kind: "table",
              title: "Exception: properties 6 years old or newer (maintenance only)",
              headers: ["", "A Class", "B Class", "C Class"],
              rows: [["Maintenance", "5%", "6%", "7%"]],
            },
            {
              kind: "callout",
              title: "What 8% vacancy actually means",
              body: "365 days x 8% = 29.2 days: roughly one month of no income per year held. You may not see it every year, but across a 15-year hold expect about 15 months of total vacancy. Scheduled Gross Rent minus vacancy equals Effective Gross Rent.",
            },
            {
              kind: "text",
              body: "Dollar for dollar, classes are closer than the percentages suggest: rent is higher in A Class, so 8% of an A Class rent is a similar dollar amount to 13% of a C Class rent. You also buy the same mid-range oven for an A Class rental as a C Class one; you never put a $1,000 oven in a rental.",
            },
            {
              kind: "quiz",
              question:
                "Rent is $1,000/mo on a C Class single family rental (13% maintenance). How much should you set aside monthly for maintenance?",
              options: ["$80", "$100", "$130", "$13"],
              answer: 2,
              explain: "13% of $1,000 = $130 per month saved for future repairs and replacements.",
            },
          ],
        },
        {
          id: "l6",
          title: "Appreciation and where MR invests",
          minutes: 6,
          blocks: [
            {
              kind: "text",
              body: "The higher the property class, the higher the potential future appreciation. MR takes 25+ years of NAR median price data per MSA, builds the appreciation trend, then adjusts and caps it by class to keep projections honest.",
            },
            {
              kind: "table",
              title: "Class adjustments and caps on annual appreciation",
              headers: ["Class", "Adjustment", "Cap"],
              rows: [
                ["A Class", "+0.5%", "5.0%"],
                ["B Class", "+0.0%", "4.5%"],
                ["C Class", "-0.5%", "4.0%"],
              ],
            },
            {
              kind: "callout",
              title: "Where Marshall Reddick does NOT invest",
              body: "Luxury Class: the price-to-rent ratio is so unfavorable you would need 50%+ down just to break even; the appreciation upside does not beat upper A Class returns over a 15-year hold. D Class: looks great on paper, but tenants destroy property, miss rent, and leave mid-lease. Our property management teams will not manage them.",
            },
            {
              kind: "table",
              title: "Where MR invests, and why",
              headers: ["Class", "The play"],
              rows: [
                [
                  "A Class",
                  "Highest 15+ year return on investment. Tenants stay longer, take care of the property; less work per dollar invested.",
                ],
                [
                  "B Class",
                  "The balance: decent cash flow and decent appreciation. Middle-of-the-road, hard-working tenants.",
                ],
                [
                  "C Class",
                  "Maximum passive income today; do not expect appreciation. Higher maintenance and vacancy, more work per dollar.",
                ],
              ],
            },
            {
              kind: "callout",
              title: "Insider advice from Ross Nelson, CEO",
              body: "Cash flow is the glue that holds the deal together long enough so that you can get rich through principal pay down and appreciation.",
            },
            {
              kind: "quiz",
              question:
                "An investor wants maximum monthly cash flow today and does not care about appreciation. Which class fits?",
              options: ["Luxury", "A Class", "B Class", "C Class"],
              answer: 3,
              explain:
                "C Class is the cash flow play: high rent relative to a low purchase price, traded for higher maintenance, higher vacancy, and little appreciation.",
            },
            {
              kind: "takeaways",
              items: [
                "5 classes: Luxury, A, B, C, D. The environment sets the class; the house is the tiebreaker.",
                "Classify with 4 steps: adjusted MSA median, true market value, class boundaries, place it on the scale.",
                "Remodel math: under $10K x 1.2, over $10K x 1.5; classify multi-unit on the per-unit value.",
                "Budget by class: A 8/8, B 10/10, C 13/13 on 1-4 units; new builds get reduced maintenance for 6 years.",
                "A Class for long-hold ROI, B Class for balance, C Class for cash flow. MR avoids Luxury and D entirely.",
                "A class is not better or worse, just different. Match the class to the investor's goal.",
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const INTERACTIVE_COURSES: InteractiveCourse[] = [
  PROPERTY_CLASS_COURSE,
  SPEAKER_COURSE,
];

export function getCourse(id: string): InteractiveCourse | undefined {
  return INTERACTIVE_COURSES.find((c) => c.id === id);
}

export function courseLessons(course: InteractiveCourse): CourseLesson[] {
  return course.modules.flatMap((m) => m.lessons);
}

// Progress: completed lesson ids per course, persisted per device.
export function loadCourseProgress(courseId: string): string[] {
  try {
    const raw = window.localStorage.getItem(`mr-course-${courseId}`);
    const parsed = raw ? (JSON.parse(raw) as string[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCourseProgress(courseId: string, lessonIds: string[]) {
  try {
    window.localStorage.setItem(`mr-course-${courseId}`, JSON.stringify(lessonIds));
  } catch {
    // ignore
  }
}
