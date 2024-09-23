// Add your custom JavaScript for storefront pages here.
window.list_cols = sessionStorage.getItem(`list_cols`) || "3";
document.addEventListener("DOMContentLoaded", function() {
const loadedScreenSize = window.innerWidth;

window.addEventListener('resize', function(event) {
  console.log(loadedScreenSize, window.innerWidth)
  if((loadedScreenSize > 990 && window.innerWidth < 990) || (loadedScreenSize < 990 && window.innerWidth > 990)){
    window.location.reload()
  }
}, true);

  if(storefront.context.resource == "categories"){
    sessionStorage.setItem('last_category',storefront.context.body.name)
  }
  setTimeout(() =>{
    $(window).resize();    
  }, 1000)
  let h = $(`header.header`).innerHeight();
  $(`body`).css(`--header-height`, h + 'px');

  if($(`.page--categories`).length > 0){
    $(`.page-title, .page-title + .category-description`).wrapAll(`<div class=category-text></div>`);
    $(`.category-text, .category-text +  .category-banner`).wrapAll(`<div class=category-brick></div>`)
  }

  
  $(`body`).on(`click`,`.listType button`, function(){
    let attr = $(this).attr(`col`);
    $(`.listType button`).removeClass(`active`);
    $(`#content #search-engine`).find(`.search-engine__item, .product-item`).closest(`.col-6`).removeClass(`col-lg-3`).removeClass(`col-lg-4`).addClass(`col-lg-` + attr)
    window.list_cols = attr;
    sessionStorage.setItem(`list_cols`,attr)
    $(this).addClass(`active`)
  });
  onLoadOrResize();
  $(window).resize(function(){
    onLoadOrResize()
  });

  if($(`#product-block`).length > 0 && window.innerWidth < 990){
    $(`#product-block .sticky`).insertAfter(`#product-gallery`)
  }
});


function onLoadOrResize(){
  if($(`.products-carousel__list`).length > 0){
    $(`body`).on('click',`.products-carousel__list + .glide__arrows .glide__arrow`,function(){
      setTimeout(()=>{
        refreshGlideProductList()
      },200)      
    });
    window.addEventListener('scroll', refreshGlideProductList());
    $(window).on('scroll', function () {
      refreshGlideProductList()
    });
    refreshGlideProductList()    
  }
  
}

function refreshGlideProductList(){
  $(`.products-carousel__list .product-card__pictures`).css('padding','1px 0')
  setTimeout(()=>{
    $(`.products-carousel__list`).each(function(){
      let h = $(this).find(`.glide__slide--active picture`).first().innerHeight();
      $(this).closest('.glide__track').css('--cover_height', h + 'px');
    })
    //console.log('refreshed')
  },200) 
  
}
$('body').css('--header-vh', ($('header#header').innerHeight()) + 'px');