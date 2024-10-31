import { useState } from "react";
import { Patient } from "../../services/api/types/patient";
import Avatar from "../UI/avatar/avatar";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

interface PatientCardProps {
  patient: Patient;
}

export default function PatientCard({ patient }: PatientCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`w-80 h-auto min-w-80 min-h-48 bg-white rounded-xl shadow-xl overflow-hidden ${isExpanded ? "h-auto" : "h-52"}`}
    >
      <div className="p-4 space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar name={patient.firstName} photo={patient.photo} />
          <div className="space-y-1">
            <p className="text-lg text-black font-semibold">
              {patient.firstName} {patient.lastName}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-2 text-sm text-blue-600 font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center"
        >
          <span>{isExpanded ? "View Less" : "View More"}</span>
          {isExpanded ? (
            <ChevronUpIcon className="w-4 h-4 ml-2 transition-transform duration-300" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 ml-2 transition-transform duration-300" />
          )}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col justify-start p-4 space-y-2 bg-gray-50">
          <p className="flex text-sm text-slate-500 gap-3">
            <span className="font-bold">Email:</span> {patient.email}
          </p>
          <p className="flex text-sm text-slate-500 gap-3">
            <span className="font-bold">Phone:</span> {patient.phoneNumber}
          </p>
        </div>
      </div>
    </div>
  );
}
