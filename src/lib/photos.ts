/**
 * Stock photos used on the site. All are from Unsplash under the free
 * Unsplash License (commercial use allowed, no attribution required, credited
 * here anyway). They are illustrations, not Netra Home Care staff or clients.
 * Replace them with your own consented photos when you have them.
 */
export type Photo = { src: string; alt: string; credit: string; creditUrl: string; source: string };

export const photos: Record<string, Photo> = {
  "hero": {
    src: "/images/hero.jpg",
    alt: "A woman and a young boy smiling together at home",
    credit: "Moses Sichach",
    creditUrl: "https://unsplash.com/@sichach",
    source: "https://unsplash.com/photos/a-woman-sitting-next-to-a-child-on-a-bed-AdWkBmVCB9Q",
  },
  "general-house-help": {
    src: "/images/general-house-help.jpg",
    alt: "A tidy living room with sofas, lamps and cushions",
    credit: "aur\u00e9lie sgnl",
    creditUrl: "https://unsplash.com/@entre2vue",
    source: "https://unsplash.com/photos/cozy-living-room-with-stylish-couches-lamps-and-decorative-pillows-Z7wVn-EL70Y",
  },
  "live-in-house-help": {
    src: "/images/live-in-house-help.jpg",
    alt: "A woman relaxing on a wooden sofa in a living room with a red wall",
    credit: "Alioune SEYE",
    creditUrl: "https://unsplash.com/@aliounepic",
    source: "https://unsplash.com/photos/woman-in-checkered-dress-on-sofa-Hp2PFbBdg4w",
  },
  "live-out-house-help": {
    src: "/images/live-out-house-help.jpg",
    alt: "A woman hanging laundry on a line outside",
    credit: "Bien'arts",
    creditUrl: "https://unsplash.com/@bienarts14",
    source: "https://unsplash.com/photos/woman-hanging-clothes-on-a-clothesline-outdoors-h6oEtHPSd_Q",
  },
  "nanny-childcare": {
    src: "/images/nanny-childcare.jpg",
    alt: "A smiling woman holding a baby",
    credit: "Andrae Ricketts",
    creditUrl: "https://unsplash.com/@drezart",
    source: "https://unsplash.com/photos/woman-in-orange-shirt-carrying-baby-in-white-and-blue-floral-shirt-3Qi0PkM_Wes",
  },
  "cook": {
    src: "/images/cook.jpg",
    alt: "A woman cooking at a stove",
    credit: "Elise Gaumier",
    creditUrl: "https://unsplash.com/@e_g_e_photographie",
    source: "https://unsplash.com/photos/a-woman-in-a-red-shirt-is-cooking-in-a-kitchen-lJbOE0G76aw",
  },
  "elderly-care-assistant": {
    src: "/images/elderly-care-assistant.jpg",
    alt: "An older woman in a purple wrap sitting outside with a book",
    credit: "SHIMO yann",
    creditUrl: "https://unsplash.com/@ishots_thing",
    source: "https://unsplash.com/photos/an-old-woman-sitting-down-reading-a-book-t6JL-nuGEdA",
  },
  "household-cleaner": {
    src: "/images/household-cleaner.jpg",
    alt: "A woman mopping a bright floor",
    credit: "Vitaly Gariev",
    creditUrl: "https://unsplash.com/@silverkblack",
    source: "https://unsplash.com/photos/woman-with-headphones-cleaning-floor-with-mop-h_cGl2nIzng",
  },
  "temporary-house-help": {
    src: "/images/temporary-house-help.jpg",
    alt: "A room full of packed moving boxes and plants",
    credit: "Dina Badamshina",
    creditUrl: "https://unsplash.com/@dinaamazing",
    source: "https://unsplash.com/photos/a-room-filled-with-lots-of-boxes-and-plants-j7vbBmTHmjY",
  },
  "page-about": {
    src: "/images/page-about.jpg",
    alt: "The Black Star Gate in Independence Square, Accra",
    credit: "Ifeoluwa B.",
    creditUrl: "https://unsplash.com/@ife_",
    source: "https://unsplash.com/photos/white-concrete-building-with-flag-on-top-during-daytime--CgUhaShACE",
  },
  "page-how-it-works": {
    src: "/images/page-how-it-works.jpg",
    alt: "A family smiling around a dining table",
    credit: "Ayodele Adeniyi",
    creditUrl: "https://unsplash.com/@ayodigital",
    source: "https://unsplash.com/photos/a-group-of-people-sitting-around-a-wooden-table-PG9FDJfKKsY",
  },
  "page-safety": {
    src: "/images/page-safety.jpg",
    alt: "A woman writing notes in a notebook",
    credit: "Iwaria Inc.",
    creditUrl: "https://unsplash.com/@iwaria",
    source: "https://unsplash.com/photos/a-woman-writing-on-a-book-Rbus5PbeBzM",
  },
  "page-become-a-house-help": {
    src: "/images/page-become-a-house-help.jpg",
    alt: "A smiling woman in a yellow print dress",
    credit: "Jeff Kweba",
    creditUrl: "https://unsplash.com/@lucentstreet",
    source: "https://unsplash.com/photos/a-person-wearing-glasses--qh8PWfA-OE",
  },
  "page-faqs": {
    src: "/images/page-faqs.jpg",
    alt: "A father and his daughter smiling at home",
    credit: "Dr Josiah Sarpong",
    creditUrl: "https://unsplash.com/@josiah123",
    source: "https://unsplash.com/photos/man-in-blue-and-red-button-up-shirt-carrying-girl-in-white-shirt-ubP5fEtoM_E",
  },
  "page-contact": {
    src: "/images/page-contact.jpg",
    alt: "A woman talking on the phone at her desk",
    credit: "Vitaly Gariev",
    creditUrl: "https://unsplash.com/@silverkblack",
    source: "https://unsplash.com/photos/young-woman-talking-on-phone-at-desk-with-laptop-n1yI8oExVns",
  },
  "page-services": {
    src: "/images/page-services.jpg",
    alt: "A two-storey house with palm trees and a lawn",
    credit: "Sam E",
    creditUrl: "https://unsplash.com/@drsedusa",
    source: "https://unsplash.com/photos/green-palm-tree-near-brown-concrete-house-yEwC3w6biTA",
  },
  "page-request": {
    src: "/images/page-request.jpg",
    alt: "A family playing a board game together in their living room",
    credit: "National Cancer Institute",
    creditUrl: "https://unsplash.com/@nci",
    source: "https://unsplash.com/photos/family-playing-board-games-VJVsEnR_vNE",
  },
  "page-login": {
    src: "/images/page-login.jpg",
    alt: "A mother and daughter smiling together",
    credit: "Joshua Duneebon",
    creditUrl: "https://unsplash.com/@joshduneebon",
    source: "https://unsplash.com/photos/woman-in-purple-and-yellow-dress-smiling-G8fEocK6g4w",
  },
};
