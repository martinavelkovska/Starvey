"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FaTrashAlt, FaEye, FaPoll } from "react-icons/fa";
import GalaxyBackground from "../GalaxyBackground/GalaxyBackground";

interface Survey {
  id: string;
  name: string;
  manager: string;
  status: string;
}

interface SurveysTableProps {
  surveys: Survey[];
  onDeleteSurvey: (formData: FormData) => Promise<void>;
}

const SurveysTable: React.FC<SurveysTableProps> = ({
  surveys,
  onDeleteSurvey,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-full overflow-x-visible ">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-transparent text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-sky-900 dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-sky-900 dark:text-white">
                  Manager
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-sky-900 dark:text-white">
                  Status
                </th>
                <th className="py-4 px-4 font-medium text-sky-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {surveys.map((survey) => (
                <motion.tr
                  key={survey.id}
                  transition={{ duration: 0 }}
                  className="relative bg-transparent dark:bg-boxdark transition-shadow duration-200 "
                  whileHover={{
                    scale: 1.01,
                    boxShadow: "0px 0px 15px 3px rgba(219,112,147,0.8)",
                  }}
                >
                  {/* <tr
                  key={survey.id}
                  className=""
                > */}
                  <td className="py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-white dark:text-white">
                      {survey.name}
                    </h5>
                  </td>
                  <td className="py-5 px-4 dark:border-strokedark ">
                    <a
                      className="text-white dark:text-white"
                      href={"mailto:" + survey.manager}
                      target="_blank"
                    >
                      {survey.manager}
                    </a>
                  </td>
                  <td className="py-5 px-4 dark:border-strokedark ">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        survey.status === "ONGOING"
                          ? "text-success bg-success"
                          : survey.status === "FINISHED"
                          ? "text-danger bg-danger"
                          : "text-warning bg-warning"
                      }`}
                    >
                      {survey.status}
                    </p>
                  </td>
                  <td className="py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      {survey.status !== "FINISHED" && (
                        <Link
                          href={"/dashboard/surveys/" + survey.id}
                          className="hover:text-primary"
                          title="View Survey"
                        >
                          <FaEye />
                        </Link>
                      )}
                      <Link
                        href={"/dashboard/reports/" + survey.id}
                        className="hover:text-primary"
                        title="View Report"
                      >
                        <FaPoll />
                      </Link>
                      <form action={onDeleteSurvey} className="flex">
                        <input type="hidden" name="id" value={survey.id} />
                        <button type="submit" className="hover:text-primary" title="Delete Survey">
                          <FaTrashAlt />
                        </button>
                      </form>
                    </div>
                  </td>
                  {/* </tr> */}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SurveysTable; // Export the SurveysTable component
