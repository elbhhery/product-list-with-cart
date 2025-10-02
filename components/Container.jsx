import { easeInOut } from "framer-motion";
import productData from "../data.json";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
{
  motion;
}
export default function Contianer() {
  const [quantities, setQuantities] = useState({});
  // Increase function
  const handleIncrease = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };
  // Decrease function
  const handleDecrease = (id) => {
    setQuantities((prev) => {
      const newQuantity = prev[id] > 0 ? prev[id] - 1 : 0;
      if (newQuantity === 0) {
        setShowcounter((prevshow) => ({
          ...prevshow,
          [id]: false,
        }));
      }
      return {
        ...prev,
        [id]: newQuantity,
      };
    });
  };
  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);

  const [showCounter, setShowcounter] = useState({});
  const toggleCounter = (id) => {
    setShowcounter((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const addToCart = (id) => {
    handleIncrease(id);
    toggleCounter(id);
  };
  const handleRemoveItem = (id) => {
    setQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[id];
      return newQuantities;
    });

    setShowcounter((prev) => ({
      ...prev,
      [id]: false,
    }));
  };
  const orderTotal = productData.reduce((total, product) => {
    const quantity = quantities[product.id] || 0;
    return total + product.price * quantity;
  }, 0);

  const [showPopup, setShowPopup] = useState(false);

  const [product] = useState(productData);
  const productList = product.map((product) => {
    return (
      <div key={product.id} className="product-card relative">
        <img
          className="w-full rounded-2xl block"
          src={product.image.desktop}
          alt={product.name}
        />
        <div className="details leading-normal mt-[2rem] xl:mt-[2rem] ">
          <button
            onClick={() => addToCart(product.id)}
            className="absolute flex left-[50%] translate-x-[-50%] w-[70%] py-[0.7rem] px-[1rem] rounded-4xl bottom-[110px] cursor-pointer border-[var(--Rose-300)] border-[2px] text-center  font-bold bg-[var(--Rose-50)] justify-center"
          >
            <img
              src="../assets/images/icon-add-to-cart.svg"
              alt=""
              className="mr-[8px]"
            />
            Add to cart
          </button>
          {/*  */}
          <AnimatePresence>
            {showCounter[product.id] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.1, easeInOut }}
                className="absolute flex left-[50%] translate-x-[-50%] text-white w-[70%] py-[0.7rem] px-[1rem] rounded-4xl bottom-[110px] cursor-pointer border-[var(--Rose-300)] bg-[var(--Red)] border-[2px] text-center  font-bold justify-between"
              >
                <button
                  className="h-6 w-6 border-[2px] border-white bg-[var(--Red)] cursor-pointer text-white rounded-[50%]"
                  onClick={() => handleIncrease(product.id)}
                >
                  +
                </button>
                <span>{quantities[product.id] || 0}</span>
                <button
                  className="h-6 w-6 border-[2px] border-white bg-[var(--Red)] cursor-pointer text-white rounded-[50%]"
                  onClick={() => handleDecrease(product.id)}
                >
                  -
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <span className="text-[15px] opacity-50">{product.category}</span>
          <h4 className="text-[1.2rem] mt-[5px] font-bold">{product.name}</h4>
          <p>${product.price}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="my-container p-[2rem] xl:w-[1370px] md:-[970px] sm:w-[750px] ">
      <h2 className="mb-[2rem] font-bold text-2xl">Desserts</h2>
      <div className="flex flex-col md:justify-between gap-4 xl:flex-row">
        {/* products */}
        <div className="products-container sm:w-[70%] sm:grid-cols-1 grid md:grid-cols-2 xl:grid-cols-3 gap-12">
          {productList}
        </div>
        {/* cart */}
        <div className="cart md:w-[35%] mt-[1rem] sm:mt-[1rem] xl:mt-[-2rem] bg-[var(--Rose-50)] rounded-2xl px-[2rem] py-[3rem] h-fit text-center">
          <h3 className="text-left text-[1.6rem] font-bold text-[var(--Red)]">
            Your Cart(<span id="cart-counter">{totalItems}</span>)
          </h3>
          {totalItems === 0 ? (
            <div id="empty-cart">
              <img
                className="mt-[2rem]"
                src="../assets/images/illustration-empty-cart.svg"
                alt="Empty cart"
              />
              <p className="text-[var(--Rose-500)] mt-[1rem]">
                Your added items will appear here
              </p>
            </div>
          ) : (
            <ul id="cart-items" className="text-left mt-4">
              {productData.map(
                (product) =>
                  (quantities[product.id] || 0) > 0 && (
                    <li
                      key={product.id}
                      className="flex items-center gap-2 my-2"
                    >
                      <img
                        src={product.image.desktop}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <span className="flex-1">
                        {product.name} × {quantities[product.id]}
                      </span>
                      <button
                        onClick={() => handleRemoveItem(product.id)}
                        className="border-[2px] border-[var(--Rose-300)] rounded-[50%] w-[25px] h-[25px] cursor-pointer "
                      >
                        ×
                      </button>
                    </li>
                  )
              )}
            </ul>
          )}
          <div className="mt-4">
            <hr className="opacity-20" />
            <div className="mt-4 flex justify-between">
              <p className="text-lg ">Order Total</p>
              <p className="text-3xl font-bold">${orderTotal.toFixed(2)}</p>
            </div>
          </div>
          <div>
            <p className="mt-8 bg-[var(--Rose-100)] opacity-75 p-4 rounded-2xl">
              <img
                className="inline mr-[10px]"
                src="../assets/images/icon-carbon-neutral.svg"
                alt=""
              />
              This order is a{" "}
              <span className="font-bold opacity-100">carbon-neutral</span>{" "}
              delivery
            </p>
          </div>
          {totalItems > 0 && (
            <button
              className="text-center rounded-3xl bg-[var(--Red)] mt-[1rem] text-white py-[0.5rem] w-full cursor-pointer"
              onClick={() => setShowPopup(true)}
            >
              Confirm Order
            </button>
          )}
        </div>
      </div>
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.1, easeInOut }}
            className="fixed inset-0 bg-black/50 bg-opacity-50 flex  items-center justify-center p-4 "
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.1, easeInOut }}
              className="bg-white p-6 rounded-2xl  text-left w-[500px]"
            >
              <img src="../assets/images/icon-order-confirmed.svg" alt="" />
              <h2 className="text-4xl font-bold mt-4 text-black">
                Order Confirmed
              </h2>
              <p className="mb-4 opacity-50">We hope you enjoy your food!</p>
              <ul className="text-left mb-4">
                {productData.map(
                  (p) =>
                    (quantities[p.id] || 0) > 0 && (
                      <li
                        key={p.id}
                        className="flex justify-between items-center mb-2"
                      >
                        <div className="flex items-center">
                          <img
                            src={p.image.thumbnail} // أو p.image.mobile حسب اللي عندك
                            alt={p.name}
                            className="w-12 h-12 rounded-lg mr-3"
                          />
                          <h2 className=" font-bold">
                            {p.name} ×{quantities[p.id]}
                          </h2>
                        </div>
                        <span>${(p.price * quantities[p.id]).toFixed(2)}</span>
                      </li>
                    )
                )}
              </ul>
              <div className=" flex justify-between text-right mb-4">
                <div>Order Total:</div>
                <div className="text-2xl font-bold">
                  $
                  {productData
                    .reduce(
                      (acc, p) => acc + (quantities[p.id] || 0) * p.price,
                      0
                    )
                    .toFixed(2)}
                </div>
              </div>
              <button
                className="mt-2 bg-[var(--Red)] text-white px-4 py-2 rounded-2xl w-full"
                onClick={() => {
                  setShowPopup(false);
                  setQuantities({});
                  setShowcounter({});
                }}
              >
                Start New Order
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
