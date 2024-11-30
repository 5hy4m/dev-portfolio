import React from "react";
import localFont from "next/font/local";

const BoldFont = localFont({
  src: "../../../../public/fonts/Sequel-Sans-Heavy-Disp.ttf",
});

function Intro() {
  return (
    <div>
      <span
        className={
          BoldFont.className +
          " text-sm bg-clip-text text-transparent md:text-lg bg-gradient-to-r from-brandFrom to-brandTo"
        }
      >
        Welcome to my site.
      </span>

      <div
        className={BoldFont.className + " text-5xl md:text-6xl xl:text-7xl  "}
      >
        I&apos;m{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brandFrom to-brandTo">
          Shyam Kumar
        </span>
        , a Fullstack developer.
      </div>

      <p className="py-4 text-secondary">
        I love writing code that takes things next level creating highly
        performant websites, automated API integrations, building my own
        dev-tools, and creating stunning user-experiences that makes you feel
        WOW!.
        <br />
        <br />I am always keen to learn and explore new technologies, frameworks
        and programming languages. Currently, I&apos;m learning about Astro and
        Replicache.
      </p>
    </div>
  );
}

export default Intro;
