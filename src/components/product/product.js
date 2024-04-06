import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShopContext } from '../../context/shop-context';

export const Product = (props) => {
  // Initializing translation hook
  const { t } = useTranslation();

  // Destructuring props to extract product data
  const { id,title, description, price, discountPercentage, rating, stock, brand, thumbnail, images } = props.data;

  // Accessing addToCart function and cartItems state from ShopContext
  const { addToCart, cartItems } = useContext(ShopContext);

  // State to manage slider visibility and current slide
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // State to manage notification message
  const [notificationMessage, setNotificationMessage] = useState('');

  const cartItemAmount = cartItems[id]
  const discountedPrice = (price - (price * (discountPercentage / 100))).toFixed(2);

   // Function to handle mouse enter event
  const handleMouseEnter = () => {
    setIsSliderVisible(true);
  };
  
  // Function to handle mouse leave event
  const handleMouseLeave = () => {
    setIsSliderVisible(false);
  };

  // Function to navigate to the previous slide
  const goToPreviousSlide = () => {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  };

  // Function to navigate to the next slide
  const goToNextSlide = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  };

  // Function to truncate description
  const truncateDescription = (description) => {
    const words = description.split(' ');
    if (words.length <= 10) {
      return description;
    }
    return words.slice(0, 10).join(' ') + '...';
  };
  
  // Function to show notification message
  const showNotification = (message) => {
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage('');
    }, 3000);
  };

  // Function to handle add to cart event
  const handleAddToCart = (productId) => {
    addToCart(productId);
    showNotification('Successfully added to cart!');
  }; 

  // Render Product component
  return (
    <div className="product">
      <div className="product-images" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <>
          {isSliderVisible ? (
            <div className="product-slider">
              <div className="sliderImages">
              <img src={images[currentSlide]} alt={`Image ${currentSlide + 1}`} />
              </div>
              <div className="slider-controls">
                <button onClick={goToPreviousSlide}>&#10094;</button>
                <button onClick={goToNextSlide}>&#10095;</button>
              </div>
            </div>
          ) : (
            <div className="thumbnail-container">
              <img src={thumbnail} alt={`thumbnail for Product ${title}`} />
            </div> 
          )}
        </>
      </div>
      
      <div className="description">
        <h2> {t(`title.${id}`)} </h2>
        <p> {truncateDescription(t(`description.${id}`))} </p>
        <p>
          <span className="original-price">${price}</span>
          <span className="discounted-price">${discountedPrice}</span>
          <span className="discount">{discountPercentage}% off</span>
        </p>
        <p> 
          <span> {t('rating')}: {rating} </span> 
          <span>&nbsp; {t('inStockLeft')}: {stock} </span> 
        </p>
        <p> {t('brand')}: {brand} </p>
      </div>

      {/* Add to Cart button */}
      <button className="addToCartBttn" onClick={() => handleAddToCart(id)}>
        {t('addToCart')} {cartItemAmount > 0 && <> ({cartItemAmount})</>}
      </button>

       {/* Notification message */}
      {notificationMessage && (
        <div className="notification">{notificationMessage}</div>
      )}
    </div>
  )
}
