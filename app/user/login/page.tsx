import Form from 'next/form'

export default function Page() {
  return (
    <Form action="/search">
      <input name="query" className='border'/>
      <button type="submit">Submit</button>
    </Form>
  )
}