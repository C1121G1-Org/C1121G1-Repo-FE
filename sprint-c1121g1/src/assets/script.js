window.onload = function () {


// Slider
  const rightbtn = document.querySelector('.fa-chevron-right');
  const leftbtn = document.querySelector('.fa-chevron-left');
  let index = 0;
  const imgNumber = document.querySelectorAll('.slider-content-left-top img');
  console.log(imgNumber.length)

  rightbtn.addEventListener("click", function () {
    index = index + 1;
    if (index > imgNumber.length - 1) {
      index = 0;
    }
    removeActive();
    document.querySelector(".slider-content-left-top").style.right = index * 100 + "%";
    imgNumberLi[index].classList.add("active");
  })

  leftbtn.addEventListener("click", function () {
    index = index - 1;
    if (index < 0) {
      index = imgNumber.length - 1;
    }
    removeActive();
    document.querySelector(".slider-content-left-top").style.right = index * 100 + "%";
    imgNumberLi[index].classList.add("active");
  })

//Slider choose
  const imgNumberLi = document.querySelectorAll('.slider-content-left-bottom li');
  imgNumberLi.forEach(function (image, index) {
    imgNumberLi.forEach(function (image, index) {
      image.addEventListener("click", function () {
        removeActive();
        document.querySelector(".slider-content-left-top").style.right = index * 100 + "%";
        image.classList.add("active");
      })
    })
  })

  function removeActive() {
    let imgActive = document.querySelector('.active');
    imgActive.classList.remove("active");
  }

//Slider Auto
  function imgAuto() {
    index++;
    if (index > imgNumber.length - 1) {
      index = 0;
    }
    removeActive();
    document.querySelector(".slider-content-left-top").style.right = index * 100 + "%";
    imgNumberLi[index].classList.add("active");
  }

  setInterval(imgAuto, 5000);

//Slider Product
  const rightbtntwo = document.querySelector('.fa-chevron-right-two');
  const leftbtntwo = document.querySelector('.fa-chevron-left-two');
  const imgNumbertwo = document.querySelectorAll('.slider-product-one-content-items');
  rightbtntwo.addEventListener("click", function () {
    index = index + 1;
    if (index > imgNumbertwo.length - 1) {
      index = 0;
    }
    document.querySelector(".slider-product-one-content-items-content").style.right = index * 100 + "%";
  })

  leftbtntwo.addEventListener("click", function () {
    index = index - 1;
    if (index < 0) {
      index = imgNumbertwo.length - 1;
    }
    document.querySelector(".slider-product-one-content-items-content").style.right = index * 100 + "%";
  })

}
