import { useForm, FormProvider, useFormState } from 'react-hook-form'
import FormTextInput from '../components/UI/form/text-input/form-text-input'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import FormAvatarInput from '../components/UI/form/photo-input/form-photo-input'
import { FileEntity } from '../services/api/types/file-entity'
import HTTP_CODES_ENUM from '../services/api/types/http-codes'
import { usePostPatientService } from '../services/api/services/patient'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '../components/UI/button/button'

export const Route = createLazyFileRoute('/add-patient')({
  component: CreatePatient,
})

type CreatePatientFormData = {
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  countryCode: string
  photo?: FileEntity
}

const useValidationSchema = () => {
  return yup.object().shape({
    email: yup
      .string()
      .email('Email is invalid')
      .matches(
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        'Email must be a Gmail address',
      )
      .required('Email is required'),
    firstName: yup
      .string()
      .matches(/^[A-Za-z\s]+$/, 'First Name must contain only letters')
      .required('First Name is required'),
    lastName: yup
      .string()
      .matches(/^[A-Za-z\s]+$/, 'Last Name must contain only letters')
      .required('Last Name is required'),
    countryCode: yup
      .string()
      .matches(
        /^\+d{1,3}$/,
        'Country code must start with + and contain 1 to 3 digits',
      )
      .required('Country Code is required'),
    phoneNumber: yup
      .string()
      .matches(/^\d+$/, 'Phone number must contain only digits')
      .required('Phone Number is required'),
  })
}

function CreatePatientFormActions() {
  const { isSubmitting } = useFormState()

  return (
    <Button variant="primary" type="submit" disabled={isSubmitting}>
      Save
    </Button>
  )
}

function FormCreatePatient() {
  const navigate = useNavigate()
  const fetchPostPatient = usePostPatientService()
  const validationSchema = useValidationSchema()

  const methods = useForm<CreatePatientFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      countryCode: '',
      photo: undefined,
    },
  })

  const { handleSubmit, setError } = methods

  const onSubmit = handleSubmit(async (formData) => {
    const patientBody = {
      ...formData,
      phoneNumber: `${formData.countryCode}${formData.phoneNumber}`,
    }
    const { data, status } = await fetchPostPatient(patientBody)
    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      ;(Object.keys(data.errors) as Array<keyof CreatePatientFormData>).forEach(
        (key) => {
          setError(key, {
            type: 'manual',
            message: data.errors[key],
          })
        },
      )
      return
    }
    if (status === HTTP_CODES_ENUM.CREATED) {
      // enqueueSnackbar(t("admin-panel-users-create:alerts.user.success"), {
      //   variant: "success",
      // });
      navigate({ to: '/' })
    }
  })

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto max-w-xs">
        <form
          onSubmit={onSubmit}
          autoComplete="create-new-patient"
          className="space-y-6 py-8"
        >
          <div>
            <h2 className="text-xl font-semibold mb-4">Create Patient</h2>
          </div>
          <div>
            <FormAvatarInput<CreatePatientFormData>
              name="photo"
              testId="photo"
            />
          </div>

          <div>
            <FormTextInput<CreatePatientFormData>
              name="email"
              testId="new-user-email"
              type="email"
              autoComplete="email"
              label="Email"
            />
          </div>

          <div>
            <FormTextInput<CreatePatientFormData>
              name="firstName"
              testId="first-name"
              type="text"
              label="First Name"
            />
          </div>

          <div>
            <FormTextInput<CreatePatientFormData>
              name="lastName"
              testId="last-name"
              type="text"
              label="Last Name"
            />
          </div>
          <div className="flex space-x-2">
            <div className="w-1/3">
              <FormTextInput<CreatePatientFormData>
                name="countryCode"
                testId="country-code"
                type="text"
                label="Country Code"
                autoComplete="+1"
              />
            </div>
            <div className="w-2/3">
              <FormTextInput<CreatePatientFormData>
                name="phoneNumber"
                testId="phone-number"
                type="text"
                label="Phone Number"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <CreatePatientFormActions />
            <Button variant="secondary" to="/">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  )
}

function CreatePatient() {
  return <FormCreatePatient />
}

export default CreatePatient
