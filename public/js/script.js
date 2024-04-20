//Slide Tour Detail
const swiperSlider=document.querySelector(".swiperSliderThumb");
if(swiperSlider){
  let swiperSliderThumb=new Swiper(".swiperSliderThumb",{
    spaceBetween:10,
    slidesPerView:4,
  });

  let swiperSliderMain=new Swiper(".swiperSliderMain",{
    spaceBetween:10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs:{
      swiper:swiperSliderThumb,
    },
  });
}
//End Slide Tour Detail

//Cart
const cart = localStorage.getItem("cart");
if(!cart){
  localStorage.setItem("cart",JSON.stringify([]));
}
//Show Alert
const alertAddCartSuccess=()=>{
  const elementAlert=document.querySelector("[alert-add-cart-susscess]");
  if(elementAlert){
    elementAlert.classList.remove("alert-hidden");

    setTimeout(()=>{
      elementAlert.classList.add("alert-hidden");
    },3000);
  };
};

//Show Mini Cart
const showMiniCart=()=>{
  const miniCart=document.querySelector("[mini-cart]");
  if(miniCart){
    const cart=JSON.parse(localStorage.getItem("cart"));
    miniCart.innerHTML=cart.length;
  };
};
showMiniCart();

//Add to Cart
const formAddToCart=document.querySelector("[form-add-to-cart]");
if(formAddToCart){
  formAddToCart.addEventListener("submit",(e)=>{
    e.preventDefault();
    const tourId=parseInt(formAddToCart.getAttribute("tour-id"));
    const quantity=parseInt(e.target.elements.quantity.value);
    if(tourId && quantity){
      const cart=JSON.parse(localStorage.getItem("cart"));
      const existTour=cart.find((item) => item.tourId==tourId);
      if(existTour){
        existTour.quantity=existTour.quantity+quantity;
      }
      else{
        const data={
          tourId:tourId,
          quantity:quantity
        };
        cart.push(data);
      };
      localStorage.setItem("cart",JSON.stringify(cart));
      alertAddCartSuccess();
      showMiniCart();
    }
  })
}
//End Add To Cart

//End Cart

//Order
const formOrder=document.querySelector("[form-order]");
if(formOrder){
  formOrder.addEventListener("submit",(e)=>{
    e.preventDefault();
    const cart=JSON.parse(localStorage.getItem("cart"));
    const fullName=e.target.elements.fullName.value;
    const phone=e.target.elements.phone.value;
    const note=e.target.elements.note.value;
    const data = {
      info: {
        fullName: fullName,
        phone: phone,
        note: note
      },
      cart: cart
    };

    fetch("/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == 200) {
          localStorage.removeItem("cart");
          window.location.href = `/order/success?orderCode=${data.orderCode}`;
        } else {
          alert("Đặt hàng không thành công!");
        }
      });
  });
};

//End Order