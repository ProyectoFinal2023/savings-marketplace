import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center overflow-hidden bg-dark">
      <SignIn />
    </main>
  );
}
