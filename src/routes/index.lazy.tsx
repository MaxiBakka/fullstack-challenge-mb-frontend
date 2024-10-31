import viteLogo from '/vite.svg'

import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: App,
})

function App() {

  return (
    <>
      <div className='flex items-center justify-center gap-x-6'>
        <h1 className='read-the-docs'>Patients</h1>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
      </div>

    </>
  )
}

export default App
