import localFont from "next/font/local";

const BoldFont = localFont({
  src: "../../public/fonts/Sequel-Sans-Heavy-Disp.ttf",
});

export default async function Home() {
  return (
    <main
      className={"bg-black text-white h-full flex justify-center items-center"}
    >
      <div className="md:container md:mx-auto mx-4 md:mx-20 lg:mx-40 ">
        <span
          className={
            BoldFont.className +
            " text-sm bg-clip-text text-transparent md:text-lg color-red bg-gradient-to-r from-[#ef473a] to-[#cb2d3e]"
          }
        >
          Welcome to my site.
        </span>

        <div className={BoldFont.className + " text-5xl md:text-7xl "}>
          I'm{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">
            Shyam Kumar
          </span>
          , a Fullstack developer.
        </div>

        <p className="py-4 text-[var(--secondary-color)]">
          I love writing code that takes things next level creating highly
          performant websites, automated API integrations, building my own
          dev-tools, and creating stunning user-experiences that makes you feel
          WOW!.
          <br />
          <br />I am always keen to learn and explore new technologies,
          frameworks and programming languages. Currently, I'm learning about
          Astro and Replicache.
        </p>
      </div>
    </main>
  );
}
