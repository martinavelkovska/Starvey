"use client";
import Starfield from "react-starfield";
import "@/styles/globals.css";
import { redirect, useRouter } from "next/navigation";

import "@/styles/covered-by-your-grace.css";
import Typewriter from "../TypeWriter/Typewriter";
import { AnimatePresence, motion } from "framer-motion";
// import Button from '../Button/Button';
const Welcome = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard/surveys");
  };
  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col justify-center items-center m-auto xl:mt-[200px] 2xl:mt-[250px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Starfield
          starCount={2000}
          starColor={[255, 255, 255]}
          speedFactor={0.22}
          backgroundColor="black"
        />
        <h1 className="text-center font-poppins break-all text-7xl 2xl:text-7xl 3xl:text-9xl text-white">
          WELCOME TO{" "}
          <span className="text-white font-covered text-8xl 3xl:text-9xl">
            {" "}
            Starvey{" "}
          </span>
        </h1>

        <Typewriter
          text="Create unique surveys that sparkle with insight and brilliance."
          className="text-white text-center font-poppins pt-5"
        ></Typewriter>

        <div className="mt-5">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className="bg-zinc-200 hover:bg-transparent hover:text-white text-black font-bold py-2 px-4 rounded-full text-lg"
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            Continue
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Welcome;
