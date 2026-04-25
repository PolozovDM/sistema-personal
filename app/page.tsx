import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">
        Sistema de Personal
      </h1>

      <Link href="/login" className="text-blue-500 underline">
        Ir al Login
      </Link>
    </div>
  );
}