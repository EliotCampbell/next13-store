import { NextResponse } from 'next/server'
import { Category } from '@/models/models'

export const POST = async (request) => {
  try {
    const { name } = await request.json()
    const foundCategory = await Category.findOne({
      where: { name: name }
    })
    if (foundCategory !== null)
      return NextResponse.json({
        ok: false,
        message: 'Category already exists',
        dataObject: { foundCategory }
      })
    const category = await Category.create({ name })
    return NextResponse.json({
      ok: true,
      message: 'Category added successfully',
      dataObject: { category }
    })
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}
