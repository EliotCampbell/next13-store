import { NextResponse } from 'next/server'

const { Product, Specification, Brand } = require('@/models/models')

export const GET = async (request, { params }) => {
  try {
    const id = params.id
    const product = await Product.findOne({
      where: { id },
      include: [
        { model: Specification, as: 'info' },
        { model: Brand, as: 'brand' }
      ]
    })
    if (product === null) {
      return NextResponse.json({
        ok: false,
        message: 'Product not found',
        dataObject: { id }
      })
    }
    return NextResponse.json({
      ok: true,
      message: 'Product found successfully',
      dataObject: { product }
    })
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}
