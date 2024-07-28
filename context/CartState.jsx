"use client"

import React, { useContext, useState } from "react";

const { createContext } = require("react");

const cartContext = createContext()

const CartState = ({children})=>{

    const prototypeCart = {
            _id: "64ef76b6aacd3e7108c0a0f5",
            title : "Geomatric Chair",
            slug: "geomatric-chair",
            image : "https://img.freepik.com/premium-photo/sleek-geometric-chair_841543-15582.jpg",
            description: "Premium & comfortable Chair folm with a strong structure built with teakwood it feels amazing",
            price : 123.32,
            width: 32,
            height: 54,
            qty: 1,
            category : "Chair"
    }

    const [cart, setCart] = useState([])
    const [wishlist, setWishlist] = useState([])
    const [subTotal, setSubTotal] = useState(0)

    const saveCart = (myCart)=>{
        localStorage.setItem("cart", JSON.stringify(myCart) );
    }

    const addToCart = (product, qty = 1, flag= 0)=>{
        let myCart = cart;

        let alreadyInCart = false;

        myCart.forEach((element)=>{
            if(product._id === element._id ){
                if(qty == 1){
                    element.qty += 1;
                } else{
                    if(flag){
                        element.qty += qty
                    }else{
                        element.qty = qty;
                    }
                }
                alreadyInCart = true;
                return;
            }
        })
    
            
        if( !alreadyInCart ){
            myCart = [...cart, {...product, qty}];
        }
        setCart([...myCart])
        saveCart(myCart)
    }

    const clearCart = ()=>{
        setCart([])
        saveCart([])
    }

    const removeFromCart = (_id)=>{
        const myCart = cart.filter((item)=>(item._id !== _id))
        setCart(myCart);
        saveCart(myCart)
    }
    
    const countTotal = ()=>{
        let amount = 0;
        cart.forEach((item)=>{
            amount += item.price * item.qty;
        })

        setSubTotal( parseFloat(Math.round(amount)).toFixed(2) )
    }

    const addToWishList = (item)=>{
        setWishlist([...wishlist, item])
    }

    const removeFromWishList = (_id)=>{
        setWishlist((wList)=>wList.filter((item)=>(item._id !== _id)))
    }


    


    return (
        <cartContext.Provider value={{cart, setCart, wishlist, setWishlist, addToWishList, removeFromWishList, addToCart, saveCart, clearCart, removeFromCart, subTotal, countTotal }}>
            {children}
        </cartContext.Provider>
    )
}


export default CartState;


export const useCart = ()=>{return useContext(cartContext)}