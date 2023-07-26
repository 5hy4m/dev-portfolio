import { IntroSection } from "./Sections/IntroSection";

export default async function Home() {
  return (
    <main className={"h-screen bg-black"}>
      <IntroSection />
      <div className="h-[1000px] bg-red-600"></div>
    </main>
  );
}
