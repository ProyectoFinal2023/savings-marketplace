import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-dark">
      <SignUp />
    </main>
  );
}
