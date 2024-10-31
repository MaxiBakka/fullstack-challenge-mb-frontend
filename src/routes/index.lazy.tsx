import { createLazyFileRoute } from "@tanstack/react-router";
import { useStateWithLocalStorage } from "../utils/hooks";
import { Patient } from "../services/api/types/patient";
import { Button } from "../components/UI/button/button";
import { PlusCircleIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import PatientCard from "../components/PatientCard/patient-card";

export const Route = createLazyFileRoute("/")({
  component: App,
});

function App() {
  const [patients, _] = useStateWithLocalStorage<Patient[]>("patients", []);

  return (
    <>
      <div className="container mx-auto flex flex-col justify-start p-4 h-[600px]">
        <h1 className="text-2xl font-bold mb-4 self-start">
          Patient Registration
        </h1>

        {patients && patients.length === 0 ? (
          // <div className="flex flex-col justify-around m-w-[500px] text-center justi py-8">
          //   <p className="text-gray-500 mb-4">No patients registered yet.</p>
          //   <div className="flex mb-4 ">
          //     <Button to="/add-patient">
          //       <PlusCircleIcon className="mr-2 h-4 w-4" />
          //       <span> Add Your First Patient </span>
          //     </Button>
          //   </div>
          // </div>
          <div className="flex flex-col items-center justify-center max-w-md mx-auto p-8 bg-gray-100 rounded-lg shadow-sm">
            <UserGroupIcon
              className="w-16 h-16 text-gray-400 mb-4"
              aria-hidden="true"
            />
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                No patients registered yet
              </h2>
              <p className="text-gray-500">
                Start by adding your first patient to the system.
              </p>
            </div>
            <Button to="/add-patient">
              {/* <a className="inline-flex items-center justify-center"> */}
              <PlusCircleIcon className="mr-2 h-5 w-5" aria-hidden="true" />
              <span>Add Your First Patient</span>
              {/* </a> */}
            </Button>
          </div>
        ) : (
          <>
            <div className="flex mb-4 ">
              <Button to="/add-patient">
                <PlusCircleIcon className="mr-2 h-4 w-4" />{" "}
                <span>Add Patient</span>
              </Button>
            </div>
            <div className="flex flex-row flex-wrap justify-start gap-6 mb-2 ">
              {patients &&
                patients.map((patient, index) => (
                  <PatientCard
                    key={`${patient.id}${index}`}
                    patient={patient}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
