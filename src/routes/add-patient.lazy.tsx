import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/add-patient')({
  component: CreatePatient,
})




function FormCreatePatient() {

  return (
    <> </>
  )
}

function CreatePatient() {
  return <FormCreatePatient />
}

export default CreatePatient
