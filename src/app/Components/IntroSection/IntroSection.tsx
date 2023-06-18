import React from "react";
import localFont from "next/font/local";
import NewtonsCradle from "./NewtonsCradle";

const BoldFont = localFont({
  src: "../../../../public/fonts/Sequel-Sans-Heavy-Disp.ttf",
});
interface Props {}

function IntroSection(props: Props) {
  const {} = props;

  return (
    <section className="grid grid-cols-2 container md:mx-auto pt-[100px] px-5 flex justify-center items-center bg-black text-white">
      <div className="h-full">
        <span
          className={
            BoldFont.className +
            " text-sm bg-clip-text text-transparent md:text-lg bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]"
          }
        >
          Welcome to my site.
        </span>

        <div className={BoldFont.className + " text-5xl md:text-7xl "}>
          I&apos;m{" "}
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
          frameworks and programming languages. Currently, I&apos;m learning
          about Astro and Replicache.
        </p>
      </div>
      <NewtonsCradle />
    </section>
  );
}

export default IntroSection;
