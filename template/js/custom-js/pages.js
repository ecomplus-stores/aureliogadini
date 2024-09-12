// Add your custom JavaScript for storefront pages here.
window.list_cols = sessionStorage.getItem(`list_cols`) || "3";
document.addEventListener("DOMContentLoaded", function() {
  setTimeout(() =>{
    $(window).resize();
  }, 1000)
  let h = $(`header.header`).innerHeight();
  $(`body`).css(`--header-height`, h + 'px');

  if($(`.page--categories`)){
    $(`.page-title, .page-title + .category-description`).wrapAll(`<div class=category-text></div>`);
    $(`.category-text, .category-text +  .category-banner`).wrapAll(`<div class=category-brick></div>`)
  }

  
  $(`body`).on(`click`,`.listType button`, function(){
    let attr = $(this).attr(`col`);
    $(`.listType button`).removeClass(`active`);
    $(`#content #search-engine`).find(`.search-engine__item`).closest(`.col-6`).removeClass(`col-lg-3`).removeClass(`col-lg-4`).addClass(`col-lg-` + attr)
    window.list_cols = attr;
    sessionStorage.setItem(`list_cols`,attr)
    $(this).addClass(`active`)
  });
  onLoadOrResize();
  $(window).resize(function(){
    onLoadOrResize()
  })
});


function onLoadOrResize(){
  if($(`.products-carousel__list`).length > 0){
    $(window).scroll(function(){
      $(`.products-carousel__list`).each(function(){
        let h = $(this).find(`picture`).first().innerHeight();
        $(this).closest('.glide__track').css('--cover_height', h + 'px');
      })
    })
    $(`.products-carousel__list`).each(function(){
      let h = $(this).find(`picture`).first().innerHeight();
      $(this).closest('.glide__track').css('--cover_height', h + 'px');
    })
  }
  
}

$('body').css('--header-vh', ($('header#header').innerHeight()) + 'px');