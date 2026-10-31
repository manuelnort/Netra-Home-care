import type { Metadata } from "next";
import { AccountPage } from "@/components/AccountPage";

export const metadata: Metadata = {
  title: "House help sign in",
  description: "Sign in to check your application, upload documents securely and manage your availability.",
  alternates: { canonical: "/house-help-login/" },
  robots: { index: false },
};

export default function HouseHelpLoginPage() {
  return (
    <AccountPage
      audience="house-help"
      title="House help sign in"
      lead="Check your application, upload documents securely and keep your availability up to date."
      features={[
        "Your application and verification progress",
        "Secure upload for your ID and documents",
        "Your profile and availability",
        "Placement opportunities you can accept or decline",
        "Interview and booking notifications",
        "Placement history, agreements, support and safety reporting",
      ]}
      switchText="Looking for help at home?"
      switchHref="/login/"
      switchLabel="Customer sign in"
      noAccountText="Start with a short application. Your account is set up after that."
      noAccountHref="/become-a-house-help/apply/"
      noAccountLabel="Start your application"
    />
  );
}
