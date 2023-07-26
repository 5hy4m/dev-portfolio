import React from "react";
import NewtonsCradle from "./NewtonsCradle/NewtonsCradle";
import IntroText from "./IntroText";

function IntroSection() {
  return (
    <section className="h-full grid lg:grid-cols-2 lg:container md:mx-auto pt-[100px] px-5 justify-center items-center bg-black text-white">
      <IntroText />
      <NewtonsCradle />
    </section>
  );
}

export default IntroSection;
