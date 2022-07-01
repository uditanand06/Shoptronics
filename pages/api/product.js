import {deleteProduct, getAllProduct, getProduct, updateProduct, createProduct,getUniqueProduct} from '../../prisma/product'

export default async(req,res) => {
    try{
        switch(req.method)
        {
            case 'GET':{
                if(req.query.slug)
                {
                    const Product = await getProduct(req.query.slug)
                    return res.status(200).json(Product)
                }else if(req.query.id)
                {
                    const Product = await getUniqueProduct(req.query.id)
                    return res.status(200).json(Product)
                }
                else{
                    const Products = await getAllProduct()
                    return res.status(200).json(Products)
                }
            }

            case 'POST':{
                const {email,name,birthYear} = req.body
                const Product = await createProduct(email,name,birthYear)
                return res.status(200).json(Product)
            }

            case 'PUT':{
                const {id,...updateData} = req.body
                const Product = await updateProduct(id,updateData)
                return res.status(200).json(Product)
            }

            case 'DELETE':{
                const {id} = req.body
                const Product = await deleteProduct(id)
                return res.status(200).json(Product)
            }
                
        }
    }catch(error){
        return res.status(500).json({...error,message:error.message})
    }
}