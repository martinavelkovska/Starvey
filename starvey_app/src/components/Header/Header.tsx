"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
//import { motion } from "motion/react"

import DarkModeSwitcher from "../DarkModeSwitcher/DarkModeSwitcher";


const Header = () => {
  return (
    <header className="sticky top-0 z-999 flex w-full drop-shadow-none bg-black ">
      <div className="flex flex-grow items-center space-between gap-6  px-4 py-4 shadow-2 md:px-8 2xl:px-8">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link className="block flex-shrink-0" href="/dashboard/welcome">
      
           <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
            <Image
              width={40}
              height={40}
              src={"/images/logo/star-sparkle.svg"}
              alt="Logo"
            />
            </motion.div>
       
            
          </Link>
        </div>
        <div className="hidden sm:block ">
          <ul className="unstyled">
          <motion.li whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
              <Link href="/dashboard/surveys">All Surveys</Link>
         </motion.li> 
          </ul>
        </div>

        <div className="hidden sm:block">
          <ul className="unstyled">
          <motion.li whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
              <Link href="/dashboard/surveys/create">Create a Survey</Link>
            </motion.li>
          </ul>
        </div>

       
      </div>
    </header>
  );
};

export default Header;