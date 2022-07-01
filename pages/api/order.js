import {createOrder} from '../../prisma/order'

export default async(req,res) => {
    try{
        switch(req.method)
        {
            case 'GET':{
                
            }

            case 'POST':{
                const { orderItems,
                        shippingAddress,
                        paymentMethod,
                        itemsPrice,
                        shippingPrice,
                        taxPrice,
                        totalPrice,session} = req.body
                const Order = await createOrder(orderItems,
                    shippingAddress,
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    taxPrice,
                    totalPrice,session)
                return res.status(200).json(Order)
            }

            case 'PUT':{
                
            }

            case 'DELETE':{
                
            }
                
        }
    }catch(error){
        return res.status(500).json({...error,message:error.message})
    }
}