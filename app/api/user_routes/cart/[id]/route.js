import { CartProduct } from '@/models/models'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export const PATCH = async (request, { params }) => {
  try {
    const headersList = headers()
    const userId = headersList.get('userId')
    const id = params.id
    const data = await request.json()
    if (!userId) {
      return NextResponse.json({
        ok: false,
        message: "Can't get userId",
        dataObject: {}
      })
    }
    const product = await CartProduct.findByPk(id)
    if (product === null) {
      return NextResponse.json({
        ok: false,
        message: 'Product in cart not found',
        dataObject: {}
      })
    }
    if (userId !== product.userId.toString()) {
      return NextResponse.json({
        ok: false,
        message: "You can't patch an item from another user's cart.",
        dataObject: {}
      })
    }
    const updatedProduct = await CartProduct.update(
      { quantity: data.quantity },
      { where: { id: id } }
    )
    return NextResponse.json({
      ok: true,
      message: 'Patched successfully',
      dataObject: { updatedProduct }
    })
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: error.message }
    })
  }
}

export const DELETE = async (request, { params }) => {
  try {
    const headersList = headers()
    const userId = headersList.get('userId')
    const id = params.id
    if (!userId) {
      return NextResponse.json({
        ok: false,
        message: "Can't get userId",
        dataObject: {}
      })
    }
    const product = await CartProduct.findByPk(id)
    if (product === null) {
      return NextResponse.json({
        ok: false,
        message: 'Product in cart not found',
        dataObject: {}
      })
    }
    if (userId !== product.userId.toString()) {
      return NextResponse.json({
        ok: false,
        message: "You can't remove an item from another user's cart.",
        dataObject: {}
      })
    }
    const deletedProduct = await CartProduct.destroy({ where: { id: id } })
    if (deletedProduct === 1) {
      return NextResponse.json({
        ok: true,
        message: 'Product in cart deleted successfully',
        dataObject: {}
      })
    } else {
      return NextResponse.json({
        ok: false,
        message: "Can't delete product in cart",
        dataObject: {}
      })
    }
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: error.message }
    })
  }
}
