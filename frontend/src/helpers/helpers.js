export const getPriceQueryParams = (searchParams,key,value) => {
    const hasValueInParams = searchParams.has(key)

    if(value && hasValueInParams) {
        searchParams.set(key, value)
    } else if(value) {
        searchParams.append(key,value)
    } else if(hasValueInParams) {
        searchParams.delete(key)
    }

    return searchParams
}

export const calculateOrderCost = (cartItems) => {
    const itemsPrice = cartItems.reduce((acc,item) => acc + item.price * item.quantity,0)
    const shippingPrice = itemsPrice > 200 ? 0 : 25
    const taxPrice = 0.15 * itemsPrice
    const totalPrice = itemsPrice + shippingPrice + taxPrice

    return {
        itemsPrice: itemsPrice.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        taxPrice: taxPrice.toFixed(2),
        totalPrice: totalPrice.toFixed(2)
    }
}