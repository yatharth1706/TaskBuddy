import Link from 'next/link';

export default function Page() {
  return (
    <div className="mx-auto flex h-auto max-w-full flex-col justify-center p-6 sm:p-16">
      <img
        src="/HeroGradient.png"
        alt="hero gradient"
        className="absolute -left-28 -top-28"
      />
      <div className="flex w-full flex-col items-center justify-center space-y-3 pt-40">
        <h1 className="text-6xl font-extrabold">
          Task <span className="text-[#22BDFF]">Buddy</span>
        </h1>
        <p className="max-w-4xl">
          Your virtual buddy who helps you keep track of your tasks and manage
          them easily
        </p>
        <Link href="/login">
          <button className="btn-primary font-medium">Get Started</button>
        </Link>
      </div>
      <div className="mt-8 flex w-full rounded-md border-2 border-zinc-300 p-1">
        <img src="/Mockup1.png" alt="Mockup 1" className="object-cover" />
      </div>
    </div>
  );
}
