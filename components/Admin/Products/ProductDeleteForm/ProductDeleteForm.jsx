'use client'
import React, { useEffect, useState } from 'react'
import Button from '../../../UI/Button/Button'
import classes from '../../FormsStyles.module.css'
import ReactSelect from '../../../UI/ReactSelect/ReactSelect'
import { useAdminStore } from '@/store/adminStore/adminStore'
import {
  fetchAllBrands,
  fetchAllCategories,
  fetchAllProducts
} from '@/http/fetchers/fetchers'
import { deleteProduct } from '@/http/Admin/products'
import MessageString from '@/components/UI/MessageString/MessageString'
import ProductPreviewCard from '@/components/Shop/ProductPreviewCard/ProductPreviewCard'

const ProductEditForm = () => {
  const {
    isValid,
    reset,
    newProduct,
    brandsList,
    categoriesList,
    productsList,
    setNewProduct,
    setCategoriesList,
    setBrandsList,
    setProductsList,
    preview,
    setPreview
  } = useAdminStore((state) => ({
    productsList: state.productsList,
    preview: state.preview,
    isValid: state.isValid,
    categoriesList: state.categoriesList,
    brandsList: state.brandsList,
    newProduct: state.newProduct,
    setNewProduct: state.setNewProduct,
    setCategoriesList: state.setCategoriesList,
    setBrandsList: state.setBrandsList,
    setProductsList: state.setProductsList,
    reset: state.reset,
    setPreview: state.setPreview
  }))

  const [message, setMessage] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    Promise.all([
      fetchAllCategories(),
      fetchAllBrands(),
      fetchAllProducts()
    ]).then(([categoriesData, brandsData, productsData]) => {
      setCategoriesList(categoriesData.dataObject.categories)
      setBrandsList(brandsData.dataObject.brands)
      setProductsList(productsData.dataObject.products.rows)
      setIsLoaded(true)
    })
  }, [])

  const deletePro = (e) => {
    e.preventDefault()
    deleteProduct(newProduct.oldProductId).then((r) => {
      setMessage(r)
      r.ok && reset()
      fetchAllProducts().then((r) =>
        setProductsList(r.dataObject.products.rows)
      )
    })
  }

  return isLoaded ? (
    <>
      <h1>DELETE PRODUCT</h1>
      <div className={classes.formWrapper}>
        <form onSubmit={deletePro} className={classes.form}>
          <ReactSelect
            label={'Select product'}
            options={productsList}
            onChange={(option) => {
              setNewProduct({
                ...newProduct,
                category: {
                  label: categoriesList.find(
                    (el) =>
                      el.value.toString() === option.value.categoryId.toString()
                  ).label,
                  value: option.value.categoryId
                },
                brand: {
                  label: brandsList.find(
                    (el) =>
                      el.value.toString() === option.value.brandId.toString()
                  ).label,
                  value: option.value.brandId
                },
                name: option.value.name,
                price: option.value.price,
                description: option.value.description,
                oldProductId: option.value.id
              })
              setPreview(
                process.env.NEXT_PUBLIC_REACT_APP_API_URL +
                  `static/` +
                  option.value.img
              )
            }}
          ></ReactSelect>
          {message && <MessageString message={message} />}
          <Button disabled={!newProduct.oldProductId}>Delete product</Button>
        </form>
        <div className={classes.productsCardWrapper}>
          <p className={classes.preview}>Preview</p>
          <ProductPreviewCard
            productId={newProduct.id}
            brandId={newProduct.brand.value}
            productName={newProduct.name === '' ? 'Name' : newProduct.name}
            productImg={preview}
            productPrice={newProduct.price}
          />
        </div>
      </div>
    </>
  ) : (
    <h1>Loading...</h1>
  )
}

export default ProductEditForm
