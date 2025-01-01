'use client'
import Form from '@core/ui/components/form/form'
import * as Yup from 'yup'

const HomePage: React.FC = () => {
  const handleSubmit = (values: { name: string; email: string }) => {
    console.log('Form values:', values)
  }

  return (
    <div>
      <h1>Reusable Form Component</h1>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default HomePage
