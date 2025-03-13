import prismadb from '@/lib/prismadb'
import React from 'react'
import { ProductForm } from './components/product-form'

const ProductPage = async ({ params }: { params: Promise<{ storeId: string, productId: string }> }) => {
    const { productId, storeId } = await params

    const product = await prismadb.product.findUnique({
        where: {
            id: productId
        },
        include: {
            images: true
        }
    })

    const formattedProduct = product
    ? {
        ...product,
        price: product.price?.toNumber() ?? 0, // Convert Decimal to number with fallback
        storeId: product.storeId ?? "",        // Ensure storeId is a string
        name: product.name ?? "",              // Ensure name is a string
        categoryId: product.categoryId ?? "",  // Ensure categoryId is a string
        colorId: product.colorId ?? "",        // Ensure colorId is a string
        sizeId: product.sizeId ?? "",          // Ensure sizeId is a string
    }
    : null; // Allow `null` when there's no product (for create form)


    const categories = await prismadb.category.findMany({
        where: {
            storeId: storeId
        }
    })

    const sizes = await prismadb.size.findMany({
        where: {
            storeId: storeId
        }
    })

    const colors = await prismadb.color.findMany({
        where: {
            storeId: storeId
        }
    })

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <ProductForm
                    categories={categories}
                    sizes={sizes}
                    colors={colors}
                    initialData={formattedProduct} />
            </div>
        </div>
    )
}

export default ProductPage
