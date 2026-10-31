export type Faq = { q: string; a: string };
export type FaqGroup = { id: string; title: string; items: Faq[] };

// Answers only describe what the project spec commits to. Specific fees,
// replacement periods and refund amounts are set by management and go into
// each customer's written terms, so none are quoted here.
export const faqGroups: FaqGroup[] = [
  {
    id: "fees",
    title: "Fees and payment",
    items: [
      {
        q: "How much does it cost?",
        a: "It depends on the service and the arrangement you need. Netra Home Care charges a placement fee for finding and placing a house help. You'll see the fee, and what it covers, in your placement summary before you're asked to pay anything.",
      },
      {
        q: "Is the placement fee the same as the house help's salary?",
        a: "No. The placement fee is what you pay Netra Home Care. The house help's salary is separate and is agreed between you before the placement starts. Your agreement says clearly how much the salary is, how often it's paid and who pays it.",
      },
      {
        q: "Do I pay anything when I send a request?",
        a: "No. Sending a request is free. Payment only comes after you've chosen a candidate, their availability is confirmed and you've reviewed the terms.",
      },
      {
        q: "How can I pay?",
        a: "Payment details are shared with your placement summary. Netra Home Care will never ask for your Mobile Money PIN or your full card details by phone, SMS or WhatsApp.",
      },
    ],
  },
  {
    id: "verification",
    title: "Verification and safety",
    items: [
      {
        q: "How are house helps screened?",
        a: "Every applicant goes through the same steps before they can be matched with anyone: contact verification, a work profile, identity verification by an authorised officer, reference and background checks where lawful and with consent, an interview and skills assessment, orientation, and a final approval. Nannies and elderly care assistants also complete extra competency checks.",
      },
      {
        q: "What do the verification labels mean?",
        a: "Each label stands for one check that was actually completed, for example Identity Verified or References Checked. If a check hasn't been done, its label isn't shown. You can read what each label means on the Safety and verification page.",
      },
      {
        q: "Will I see a candidate's ID card or home address?",
        a: "No. Shortlists show an approved display name, skills, experience, availability and general work area. Legal names, ID numbers, ID images, home addresses and internal screening notes are kept restricted and are never shown publicly.",
      },
      {
        q: "What if something goes wrong after the placement starts?",
        a: "Contact Netra Home Care as soon as you can and choose \"Report a safety concern\" or \"Complaint about a placement\". Each report gets its own reference number, is assigned to a staff member and is followed through to a recorded outcome. If anyone is in immediate danger, call the emergency number 112 first.",
      },
    ],
  },
  {
    id: "bookings",
    title: "Requests and bookings",
    items: [
      {
        q: "Where do you work?",
        a: "Netra Home Care is starting in Accra and plans to cover more areas in Ghana as recruitment and verification grow.",
      },
      {
        q: "How long does it take to get a shortlist?",
        a: "A staff member aims to get back to you within one business day of your request. When suitable candidates are available, the aim is to send a shortlist within three business days of having your complete request. Some roles take longer, and you'll be told if that's the case.",
      },
      {
        q: "Can I choose the house help myself?",
        a: "Yes. Staff send you a shortlist of approved candidates and you choose who you'd like. Before anything is confirmed, you can talk with the candidate by phone, video or in person.",
      },
      {
        q: "Do I need an account?",
        a: "You can send a request without one. An account is used to track your request, review your shortlist, and keep your booking and payment records in one place.",
      },
    ],
  },
  {
    id: "changes",
    title: "Cancellations, refunds and replacements",
    items: [
      {
        q: "Can I cancel a request?",
        a: "Yes. A request can be cancelled at any stage before the booking is confirmed, at no cost. Once a booking is confirmed, the cancellation conditions in your placement terms apply. You'll see those terms before you pay.",
      },
      {
        q: "Will I get a refund?",
        a: "Refund rules are part of the terms you review before paying, so you'll know beforehand what's refundable and when.",
      },
      {
        q: "What if the placement doesn't work out?",
        a: "Talk to Netra Home Care first. Many problems can be sorted out with a conversation about duties or schedules. If a replacement is needed, your agreement sets out whether you're eligible, how long replacement cover lasts, any fee, roughly how long matching takes and what happens if no replacement is available.",
      },
      {
        q: "What if a house help leaves because of how they were treated?",
        a: "House helps can report unsafe conditions, mistreatment or a serious breach of the agreed terms. These reports are investigated, and replacement terms take into account why the placement ended.",
      },
    ],
  },
  {
    id: "workers",
    title: "For house helps",
    items: [
      {
        q: "Who can apply?",
        a: "You need to be at least 18 and allowed to work in Ghana. Experience in household work helps, and you'll be asked about the services you can offer, the languages you speak and when you're available.",
      },
      {
        q: "How do I know where my application stands?",
        a: "Your application has a status, such as Under Review, Documents Required or Interview Pending. Once your account is set up, you can check it there, along with any next steps.",
      },
      {
        q: "Should I send my Ghana Card by WhatsApp?",
        a: "No. Only submit identity documents through the secure upload in your account, or in person when you're asked. Netra Home Care staff won't ask you to send ID photos by SMS or WhatsApp.",
      },
    ],
  },
];
