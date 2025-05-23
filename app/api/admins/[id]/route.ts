import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`YOUR_BACKEND_URL/admins/${params.id}`, {
      method: 'DELETE',
    })
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete admin' }, { status: 500 })
  }
} 