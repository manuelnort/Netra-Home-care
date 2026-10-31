import type { Metadata } from "next";
import { AccountPage } from "@/components/AccountPage";

export const metadata: Metadata = {
  title: "Customer sign in",
  description: "Sign in to track your house help request, review your shortlist and manage bookings.",
  alternates: { canonical: "/login/" },
  robots: { index: false },
};

export default function CustomerLoginPage() {
  return (
    <AccountPage
      audience="customer"
      title="Customer sign in"
      lead="Track your requests, review your shortlist and manage your bookings."
      features={[
        "Your requests and where each one stands",
        "Your candidate shortlist, and choosing a preferred candidate",
        "Bookings, payment history and receipts",
        "Placement documents you're authorised to see",
        "Support, complaints and notifications",
      ]}
      switchText="Are you a house help?"
      switchHref="/house-help-login/"
      switchLabel="Sign in here instead"
      noAccountText="You don't need an account to send a request. Accounts are for tracking requests and managing bookings."
      noAccountHref="/request/"
      noAccountLabel="Request a house help"
    />
  );
}
