export type ServiceSlug =
  | "general-house-help"
  | "live-in-house-help"
  | "live-out-house-help"
  | "nanny-childcare"
  | "cook"
  | "elderly-care-assistant"
  | "household-cleaner"
  | "temporary-house-help";

/** How the request form asks about the working arrangement for a service. */
export type ArrangementKind =
  | "residence-and-hours" // live-in or live-out, then full-time or part-time
  | "live-in" // live-in, full-time only
  | "live-out" // live-out, full-time or part-time
  | "frequency" // one-time or recurring
  | "temporary"; // temporary or contract-based

export type Service = {
  slug: ServiceSlug;
  name: string;
  /** Short line for cards. */
  summary: string;
  /** Opening paragraph on the service page. */
  intro: string;
  arrangement: string;
  arrangementKind: ArrangementKind;
  duties: string[];
  /** What to tell us when requesting this service. */
  requestTips: string[];
  /** Childcare and elderly care need extra competency checks. */
  extraChecks?: string;
  icon:
    | "home"
    | "bed"
    | "door"
    | "baby"
    | "cook"
    | "elder"
    | "sparkles"
    | "clock";
  metaTitle: string;
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "general-house-help",
    name: "General house help",
    summary: "Cleaning, laundry and the everyday running of the house.",
    intro:
      "A general house help takes care of the daily work of a home: sweeping and mopping, laundry and ironing, washing up, tidying and keeping things in order. You tell us how your household runs and we look for someone whose experience fits it.",
    arrangement: "Full-time or part-time, living in or living out.",
    arrangementKind: "residence-and-hours",
    duties: [
      "Cleaning and tidying",
      "Laundry and ironing",
      "Washing up",
      "Basic cooking",
      "Running errands",
      "Looking after the compound",
    ],
    requestTips: [
      "How big the home is and how many people live there",
      "Which tasks matter most to you",
      "Days and hours you need help",
    ],
    icon: "home",
    metaTitle: "General house help in Accra",
    metaDescription:
      "Find a screened general house help in Accra for cleaning, laundry and household duties. Full-time or part-time, with staff review before any match.",
  },
  {
    slug: "live-in-house-help",
    name: "Live-in house help",
    summary: "A house help who lives in your home and works full-time.",
    intro:
      "A live-in house help stays at the household and works full-time. Because they'll be living with you, accommodation, rest periods and days off are agreed in writing before the placement starts, so both sides know where they stand.",
    arrangement: "Full-time, living at the household.",
    arrangementKind: "live-in",
    duties: [
      "Cleaning and tidying",
      "Laundry and ironing",
      "Cooking",
      "Helping with children",
      "Running errands",
      "Looking after the compound",
    ],
    requestTips: [
      "The room and facilities you'll provide",
      "Rest days and time off you're planning",
      "Who lives in the home",
    ],
    icon: "bed",
    metaTitle: "Live-in house helps in Accra",
    metaDescription:
      "Request a screened live-in house help in Accra. Accommodation, rest periods and duties are agreed in writing before placement.",
  },
  {
    slug: "live-out-house-help",
    name: "Live-out house help",
    summary: "A house help who travels in to work and goes home each day.",
    intro:
      "A live-out house help commutes to your home on agreed days and goes home at the end of the day. It suits households that want regular help without giving up a room. We look at where candidates live, so the daily journey is realistic.",
    arrangement: "Full-time or part-time, travelling in each day.",
    arrangementKind: "live-out",
    duties: [
      "Cleaning and tidying",
      "Laundry and ironing",
      "Washing up",
      "Basic cooking",
      "Running errands",
    ],
    requestTips: [
      "Your general area, so we can match people who live nearby",
      "Start and finish times",
      "Which days you need help",
    ],
    icon: "door",
    metaTitle: "Live-out and part-time house helps in Accra",
    metaDescription:
      "Find a screened live-out house help in Accra who travels in for agreed days and hours. Full-time or part-time arrangements.",
  },
  {
    slug: "nanny-childcare",
    name: "Nanny and childcare",
    summary: "Help with looking after children and keeping their routines.",
    intro:
      "A nanny helps care for your children: meals, bath time, naps, school runs, play and the routines your family already has. Childcare candidates go through extra competency checks for this role before they can be put forward to you.",
    arrangement: "Full-time or part-time, living in or living out.",
    arrangementKind: "residence-and-hours",
    duties: [
      "Daily childcare",
      "Preparing children's meals",
      "Bathing and dressing",
      "School drop-off and pick-up",
      "Homework and play",
      "Keeping children's areas tidy",
    ],
    requestTips: [
      "How many children and their ages",
      "Daily routines and any allergies or special needs",
      "Whether you need help with school runs",
    ],
    extraChecks:
      "Childcare is a specialised role, so candidates complete additional competency checks before they're approved for it.",
    icon: "baby",
    metaTitle: "Nanny and childcare services in Accra",
    metaDescription:
      "Request a nanny in Accra. Childcare candidates go through additional competency checks and staff review before they reach your shortlist.",
  },
  {
    slug: "cook",
    name: "Cook",
    summary: "Meal preparation and help in the kitchen.",
    intro:
      "A cook plans and prepares meals for your household and keeps the kitchen clean. Tell us what your family eats, any dietary needs, and whether you'd like local dishes, continental food or both.",
    arrangement: "Full-time or part-time, living in or living out.",
    arrangementKind: "residence-and-hours",
    duties: [
      "Preparing daily meals",
      "Local dishes",
      "Continental dishes",
      "Market and grocery shopping",
      "Kitchen cleaning",
      "Cooking for events at home",
    ],
    requestTips: [
      "How many people you cook for",
      "Cuisines and dietary needs",
      "Which meals of the day you need covered",
    ],
    icon: "cook",
    metaTitle: "Home cooks in Accra",
    metaDescription:
      "Find a screened home cook in Accra for daily meals and kitchen help. Local and continental cooking, full-time or part-time.",
  },
  {
    slug: "elderly-care-assistant",
    name: "Elderly care assistant",
    summary: "Non-medical support for older relatives with daily life.",
    intro:
      "An elderly care assistant helps an older person with everyday living: getting around the house, meals, personal routines, light housework and company through the day. This is non-clinical support. Netra Home Care doesn't provide nursing or medical care.",
    arrangement: "Full-time or part-time, living in or living out.",
    arrangementKind: "residence-and-hours",
    duties: [
      "Help with moving around the home",
      "Preparing meals",
      "Personal routines",
      "Going along to appointments",
      "Light housework",
      "Company and walks",
    ],
    requestTips: [
      "The kind of daily support your relative needs",
      "Their mobility and routines",
      "Who the assistant should contact if something changes",
    ],
    extraChecks:
      "Elderly care is a specialised role, so candidates complete additional competency checks before they're approved for it. Medical and nursing tasks are not part of this service.",
    icon: "elder",
    metaTitle: "Elderly care assistants in Accra",
    metaDescription:
      "Request a non-medical elderly care assistant in Accra to help an older relative with daily activities. Additional competency checks apply.",
  },
  {
    slug: "household-cleaner",
    name: "Household cleaner",
    summary: "Cleaning for your home, once or on a regular schedule.",
    intro:
      "A household cleaner looks after the cleaning and upkeep of your home. Book a single deep clean, for example before moving in or after an event, or set up a regular visit that fits your week.",
    arrangement: "One-time or recurring.",
    arrangementKind: "frequency",
    duties: [
      "General cleaning",
      "Deep cleaning",
      "Kitchen and bathrooms",
      "Windows and floors",
      "Move-in or move-out cleaning",
      "Laundry",
    ],
    requestTips: [
      "Number of rooms and bathrooms",
      "One visit or a regular schedule",
      "Anything that needs special care",
    ],
    icon: "sparkles",
    metaTitle: "Household cleaners in Accra",
    metaDescription:
      "Book a screened household cleaner in Accra for a one-time deep clean or regular cleaning visits.",
  },
  {
    slug: "temporary-house-help",
    name: "Temporary house help",
    summary: "Short-term help while your regular help is away, or for a busy period.",
    intro:
      "Sometimes you only need help for a while: your regular house help is on leave, a new baby has arrived, family is visiting, or you're moving house. Temporary house help covers a set period on a short-term or contract basis.",
    arrangement: "Temporary or contract-based.",
    arrangementKind: "temporary",
    duties: [
      "Cleaning and tidying",
      "Laundry and ironing",
      "Cooking",
      "Helping with children",
      "Running errands",
    ],
    requestTips: [
      "Start date and how long you need help",
      "Why you need cover, so we can match the right experience",
      "Days and hours",
    ],
    icon: "clock",
    metaTitle: "Temporary house help in Accra",
    metaDescription:
      "Arrange short-term or contract house help in Accra while your regular help is away or during a busy period.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
