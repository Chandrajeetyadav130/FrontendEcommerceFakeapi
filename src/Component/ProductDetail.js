import axios from 'axios'
import React from 'react'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartStateProvider';
const ProductDetail = () => {
  const [product,setProduct]=useState()
  const { id } = useParams();
  const { dispatch } = useCart();
  useEffect(()=>{
    const getSingleProductDetailById=async()=>{
       const productDetail=await axios.get(`https://fakestoreapi.com/products/${id}`)
       const finalProductDetail=await productDetail.data
       setProduct(finalProductDetail)
       console.log(finalProductDetail)
    }
    getSingleProductDetailById()
  },[id])
  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    console.log("cart dispatch")
  };
  if (!product) return <div>Loading...</div>;
  return (
    <div className='HomeContainer'>
      <div className="card-container">
              <div className="card">
                <img src={product?.image} alt="Card-picss" className="card-image" />
                <div className="card-content">
                  <h2 className="card-title">{product?.category}</h2>
                  <h2 className="card-title">{product?.title}</h2>
                  <h2 className="card-title">Price: {product?.price}</h2>

                  <h2 className="card-title">Rating:{product?.rating?.count}</h2>


                  <p className="card-description">
                    {product?.description}
                  </p>
                  <button className="card-button" onClick={addToCart}>Add To cart</button>
                </div>
              </div>

      </div>
    </div>
  )
}

export default ProductDetail