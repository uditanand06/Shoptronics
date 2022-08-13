import {createOrder, getUniqueOrder, updateisPaid} from '../../prisma/order'

export default async(req,res) => {
    try{
        switch(req.method)
        {
            case 'GET':{
                if(req.query.id)
                {
                    const order=await getUniqueOrder(req.query.id)
                    return res.status(200).json(order)
                }

            }break

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
                if(req.query.id)
                {
                    //console.log('hi')
                    const {isPaid} = req.body
                    const order = updateisPaid(req.query.id,isPaid)
                    return res.status(200).json(order)
                }  
            }break

            // case 'DELETE':{
                
            // }
                
        }
    }catch(error){
        return res.status(500).json({...error,message:error.message})
    }
}