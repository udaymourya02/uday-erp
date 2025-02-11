import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {/* Logo Section */}
      <Image src="/logo.jpg" alt="Company Logo" width={150} height={150} className="mb-8" />

      <h1 className="text-4xl font-bold mb-8">Welcome to Clan India Lifestyle Pvt. Ltd.</h1>
      
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    </main>
  );
}
