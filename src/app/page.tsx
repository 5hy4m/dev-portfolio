import localFont from "@next/font/local";

const myLocalFont = localFont({
  src: "../../public/fonts/NimbusSanL-Bol.otf",
});

const RegFont = localFont({
  src: "../../public/fonts/NimbusSanL-Reg.otf",
});

export default function Home() {
  return (
    <main
      className={
        myLocalFont.className +
        " text-9xl h-full flex justify-center items-center"
      }
    >
      SHYAM <span className={RegFont.className}> KUMAR</span>
    </main>
  );
}
