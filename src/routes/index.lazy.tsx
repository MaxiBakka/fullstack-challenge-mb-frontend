import { createLazyFileRoute } from "@tanstack/react-router";
import { useStateWithLocalStorage } from "../utils/hooks";
import { Patient } from "../services/api/types/patient";
import { Button } from "../components/UI/button/button";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
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
          <div className="text-center justi py-8">
            <p className="text-gray-500 mb-4">No patients registered yet.</p>
            <div className="flex mb-4 ">
              <Button to="/add-patient">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                <span> Add Your First Patient </span>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex mb-4 ">
              <Button to="/add-patient">
                <PlusCircleIcon className="mr-2 h-4 w-4" />{" "}
                <span>Add Patient</span>
              </Button>
            </div>
            <div className="space-y-4 flex flex-row flex-wrap justify-start gap-6 mb-2 ">
              {patients &&
                patients.map((patient) => (
                  <PatientCard key={patient.id} patient={patient} />
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
