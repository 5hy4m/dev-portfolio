"use client";

import React, { useRef, useState } from "react";
import Intro from "./Intro/Intro";
import NewtonsCradle from "./NewtonsCradle/NewtonsCradle";
import { motion, useScroll, scroll } from "framer-motion";

function IntroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollYPos, setScrollYPos] = useState(0);

  scroll((progress) => {
    setScrollYPos(progress);
  });

  return (
    <motion.div
      animate={{ scale: 1 - scrollYPos }}
      ref={containerRef}
      className="h-full grid lg:grid-cols-2 lg:container md:mx-auto pt-[100px] px-5 justify-center items-center bg-black text-white"
    >
      <Intro />
      <NewtonsCradle />
    </motion.div>
  );
}

export default IntroSection;
