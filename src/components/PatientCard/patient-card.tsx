"use client";

import { useState } from "react";
import { Patient } from "../../services/api/types/patient";
import { API_URL } from "../../services/api/config";
import Avatar from "../UI/avatar/avatar";

interface PatientCardProps {
  patient: Patient;
}

export default function PatientCard({ patient }: PatientCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="py-8 px-8 max-w-sm space-y-2 bg-white rounded-xl shadow-xl sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6">
      <Avatar name={patient.firstName} photo={patient.photo} />
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold">
            {patient.firstName} {patient.lastName}
          </p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        >
          {!isExpanded ? "View More" : "View Less"}
        </button>

        {isExpanded && (
          <div className="space-y-0.5">
            <p className="text-slate-500 font-medium">{patient.email}</p>
            <p className="text-slate-500 font-medium">{patient.phoneNumber}</p>
          </div>
        )}
      </div>
    </div>

    // <Card className="w-full">
    //   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //     <CardTitle className="text-sm font-medium">{patient.name}</CardTitle>
    //     <button
    //       onClick={() => setIsExpanded(!isExpanded)}
    //       className="text-gray-500 hover:text-gray-700"
    //     >
    //       {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    //     </button>
    //   </CardHeader>
    //   <CardContent>
    //     <div className="flex items-center space-x-4">
    //       <img
    //         src={patient.documentPhoto}
    //         alt={`${patient.name}'s document`}
    //         className="w-16 h-16 rounded-full object-cover"
    //       />
    //       {isExpanded && (
    //         <div className="space-y-1">
    //           <p className="text-sm text-gray-500">Phone: {patient.phoneNumber}</p>
    //           <p className="text-sm text-gray-500">Email: {patient.email}</p>
    //         </div>
    //       )}
    //     </div>
    //   </CardContent>
    // </Card>
  );
}
