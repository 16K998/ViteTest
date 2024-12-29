import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";
import toast from 'react-hot-toast';

export default function RecentProduct() {
  let { addToCart, setCart,addToList, removeFromList } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [wishlist, setWishlist] = useState({});

  async function addProduct(proId) {
    console.log(proId);
    let x = await addToCart(proId);
    console.log(x);
    setCart(x.data);
    if (x.data.status === 'success') {
      toast.success('Successfully Added');
    } else {
      toast.error('Cannot add');
    }
  }
  async function toggleWishlist(proId) {
    if (wishlist[proId]) {
      await removeFromList(proId);
      setWishlist((prevState) => {
        const updatedWishlist = { ...prevState };
        delete updatedWishlist[proId]; 
        return updatedWishlist;
      });
      toast.success('Removed from Wishlist');
    } else {
      await addToList(proId);
      setWishlist((prevState) => ({ ...prevState, [proId]: true }));
      toast.success('Added to Wishlist');
    }
  }


  function getAllProduct() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        console.log(data.data);
        setProducts(data.data);
        setFilteredProducts(data.data); 
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSearch(event) {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = products.filter(product => 
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.category.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  }
  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className="my-16">
      <div className="mb-4">
        <input type="text" placeholder="Search for products..." value={searchQuery} onChange={handleSearch}
          className="p-2 border rounded-lg w-3/4"
        />
      </div>
      <div className="row">
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className=" one lg:w-1/4 py-3 hover:shadow-lg hover:shadow-blue-700 my-3 text-start">
              <Link to={`ProductDetails/${product.id}`}>
                <div className="product">
                  <img className="w-full p-2" src={product.imageCover} alt="" />
                  <h2 className="text-green-600 text-xl px-1">{product.category.name}</h2>
                  <h4 className="text-black px-5 my-1">{product.title.split(' ').slice(0, 2).join(' ')}</h4>
                  <div className="rating flex justify-between px-5 text-black">
                    <span>{product.price} EGP</span>
                    <span>
                      <i className="text-yellow-500 fa fa-star"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </div >
              </Link>
              <div className="flex justify-evenly items-center my-5">
              <button onClick={() => addProduct(product.id)} className="bg-green-700  text-white rounded">Add to Cart</button>
              <i onClick={() => toggleWishlist(product.id)} className={`fa-solid fa-heart text-2xl ${wishlist[product.id] ? 'text-red-500' : ''}`}></i>
              </div>
              </div>
          ))
        )}
      </div>
    </div>
  );
}
