import prisma from "./prisma";

export const getAllProduct = async ( ) => {
    const products = await prisma.product.findMany({})
    return products
}

export const getProduct = async (d) => {
    const product = await prisma.product.findMany({
        where:{slug : d}
    })
    return product
}

export const getUniqueProduct = async (id) => {
    const product = await prisma.product.findUnique({
        where:{id}
    })
    return product
}

export const createProduct = async(details) => {
    const product = await prisma.product.create({
        data:{details}
    })
    return product
}

export const updateProduct = async(id,updateData) => {
    const product = await prisma.product.update({
        where:{id},
        data:{...updateData}
    })
    return product
} 

export const deleteProduct = async(id) => {
    const product = await prisma.product.delete({
        where:{id}
    })
    return product
}