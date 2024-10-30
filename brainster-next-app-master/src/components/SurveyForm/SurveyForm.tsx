"use client";

import { SurveyDTO } from "@/types/SurveyDTO";
import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface SurveyFormProps {
  title: string;
  defaultValues?: SurveyDTO["data"];
  action: (formData: FormData) => void;
}

const defaultAnimation = {
  hidden: {
    opacity: 0,
    y: 10, // Optional: to add a small slide effect
  },
  visible: {
    opacity: 1,
    y: 0, // Optional: to bring it back to its original position
  },
};

export default function SurveyForm(props: SurveyFormProps) {
  const isCreateMode = props.title === "Create a Survey";
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 0.5 },
      },
    },
  };

  const titleAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  const defaultValues: Partial<SurveyDTO["data"]> = useMemo(() => {
    return props.defaultValues || {};
  }, [props]);

  return (
    <div className="rounded-sm bg-transparent shadow-default ">
      <div className="relative flex justify-center items-center mb-4 mx-auto w-fit">
        <motion.svg
          width="300"
          height="80"
          viewBox="0 0 300 80"
          initial="hidden"
          animate="visible"
        >
          <defs>
            <linearGradient
              id="gradientBorder"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#44BCFF" />
              <stop offset="50%" stopColor="#FF44EC" />
              <stop offset="100%" stopColor="#FF675E" />
            </linearGradient>
          </defs>
          <motion.path
            d="M10,10 H290 A10,10 0 0 1 300,20 V60 A10,10 0 0 1 290,70 H10 A10,10 0 0 1 0,60 V20 A10,10 0 0 1 10,10 Z"
            fill="transparent"
            stroke="url(#gradientBorder)"
            strokeWidth="2"
            variants={draw}
          />
        </motion.svg>
        <motion.h3
          className="absolute font-medium text-white dark:text-white text-center text-3xl"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {},
          }}
          aria-hidden
        >
          {props.title.split(" ").map((word, wordIndex) => (
            <motion.span
              key={`word-${wordIndex}`}
              variants={defaultAnimation}
              className="inline-block"
            >
              {word}
              {/* Add a space after each word except the last one */}
              {wordIndex < props.title.split(" ").length - 1 && (
                <span>&nbsp;</span>
              )}
            </motion.span>
          ))}
        </motion.h3>
      </div>

      <form action={props.action}>
        <div className="p-10 ">
          <div className="mb-4.5 flex flex-col gap-8 ">
            <div className="w-6/12 z-40  m-auto ">
              <motion.div whileHover={{ scale: 1.1 }}>
                <label
                  className="mb-2.5 block  text-white text-center text-2xl"
                  htmlFor="name"
                >
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter the survey name"
                  className="w-full rounded-3xl autofill:bg-black  border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-yellow-500 active:border-yellow-500 disabled:cursor-default disabled:bg-transparent dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  required
                  defaultValue={defaultValues.name}
                />
              </motion.div>
            </div>

            <div className="w-6/12 z-40 m-auto ">
              <motion.div whileHover={{ scale: 1.1 }}>
                <label
                  className="mb-2.5 block  text-white text-center text-2xl"
                  htmlFor="manager"
                >
                  Manager
                </label>

                <input
                  id="manager"
                  name="manager"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-3xl border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-pink-500 active:border-pink-500 disabled:cursor-default disabled:bg-transparent dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  required
                  defaultValue={defaultValues.manager}
                />
              </motion.div>
            </div>
          </div>

          <div className=" m-auto z-40 relative w-6/12 pt-4">
            <motion.div whileHover={{ scale: 1.1 }}>
              <label
                className="mb-2.5 block text-black text-white text-center text-2xl"
                htmlFor="introduction"
              >
                Introduction Message
              </label>

              <textarea
                id="introduction"
                name="introduction"
                rows={6}
                placeholder="Type your introduction message"
                className="w-full rounded-3xl m-auto border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                defaultValue={defaultValues.introduction!}
              ></textarea>
            </motion.div>
          </div>

          <div className="w-6/12 m-auto pt-4">
            <motion.div whileHover={{ scale: 1.1 }}>
              <label
                className="mb-2.5 block text-white text-center text-2xl"
                htmlFor="status"
              >
                Status
              </label>

              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                  className="relative z-20 w-full appearance-none rounded-3xl border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-violet-400 active:border-violet-400 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  id="status"
                  name="status"
                  defaultValue={defaultValues.status}
                >
                  <option
                    value="DRAFT"
                    className="bg-black rounded-3xl placeholder:text-violet-600 text-violet-700"
                  >
                    Draft
                  </option>
                  <option
                    value="ONGOING"
                    className="bg-black rounded-3xl  placeholder:text-green-600 text-green-700"
                  >
                    Ongoing
                  </option>
                  <option
                    value="FINISHED"
                    className="bg-black rounded-3xl  placeholder:text-rose-800 text-rose-800"
                  >
                    Finished
                  </option>
                </select>
                <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                  <svg
                    className="fill-current"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill=""
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center gap-10 mt-9 ">
            <div className=" mt-9 relative group">
              <div className="absolute transition-all duration-1000 opacity-70 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-md group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt focus:outline-none"></div>
              {isCreateMode ? (
                <button
                  className="relative inline-flex items-center justify-center w-full px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-transparent rounded-xl border-2 border-transparent group-hover:border-transparent focus:border-transparent focus:outline-none"
                  type="submit"
                >
                  {/* Button styling */}
                  <span
                    className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] hover:outline-none hover:p-[0px]"
                    style={{
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                    aria-hidden="true"
                  ></span>
                  <span className="relative block bg-transparent  focus:outline-none hover:outline-none active:border-none hover:p-[0px]">
                    Save Survey
                  </span>
                </button>
              ) : (
                <Link href="/dashboard/surveys">
                  <button
                    className="relative inline-flex items-center justify-center w-full px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-transparent rounded-xl border-2 border-transparent group-hover:border-transparent focus:border-transparent focus:outline-none"
                    type="button"
                  >
                    {/* Button styling */}
                    <span
                      className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] hover:outline-none hover:p-[0px]"
                      style={{
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                      aria-hidden="true"
                    ></span>
                    <span className="relative block bg-transparent  focus:outline-none hover:outline-none active:border-none hover:p-[0px]">
                      Save Survey
                    </span>
                  </button>
                </Link>
              )}
            </div>
            <Link href={'/dashboard/surveys'}>
            <div className=" m-auto mt-9 relative group">
              <div className="absolute transition-all duration-1000 opacity-70 bg-gradient-to-r  from-[#44BCFF] via-[#FF44EC] to-[#FF675E]  blur-md group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt focus:outline-none"></div>
              <button
                className="relative flex flex-col items-center justify-center w-full px-10 h-full py-3 text-lg rounded-3xl font-bold text-white  transition-all duration-200 bg-rose-800  border-2 border-transparent group-hover:border-transparent focus:border-transparent focus:outline-none"
                type="button"
              >
                {/* Button styling */}
                
                <span className="relative block focus:outline-none hover:outline-none active:border-none hover:p-[0px]">
                  Back
                </span>
              </button>
            </div>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
