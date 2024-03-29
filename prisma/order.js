
import prisma from "./prisma";


export const createOrder = async(orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,session) => {

    const {user:{email}} = session
    const User = await prisma.user.findMany({
        where:{email}
    })

    const {fullName,address,city,postalCode,country} = shippingAddress



    const order = await prisma.order.create({
        data:{
            user:{
                connect:{
                    id:User[0].id
                }
            },
            
            paymentMethod:paymentMethod,
            itemsPrice:itemsPrice,
            shippingPrice:shippingPrice,
            taxPrice:taxPrice,
            totalPrice:totalPrice,
        }
    })

    const shipping = await prisma.shippingAddress.create({
        data:{
            
            order:{
                connect:{
                    id:order.id
                }
            },

            fullName:fullName,
            address:address,
            city:city,
            postalCode:postalCode,
            country:country

        }
    })

    orderItems?.map(async function(item){
        
        await prisma.orderItem.create({
            data:{
                order:{
                    connect:{
                        id:order.id
                    }
                },
                name:item.name,
                quantity:item.quantity,
                image:item.imageUrl,
                price:item.price
            }
        })
    })
    

    return order
}

export const getUniqueOrder = async(id) => {
    const order = await prisma.order.findUnique({
        where:{id},
        include:{
            shippingAddress:true,
            orderItems:true,
        },
    })

    return order
}

export const getOrder = async () => {
    const orders = await prisma.order.findMany({})
    return orders;
}

export const getUserOrder = async (userId) => {
    const orders = await prisma.order.findMany({
        where:{userId}
    })
    return orders
}

export const updateisPaid = async (id,isPaid) => {
    const order = prisma.order.update({
        where:{id},
        data:{
            isPaid:isPaid,
        }
    })
    return order
}


