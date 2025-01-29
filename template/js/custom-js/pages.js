// Add your custom JavaScript for storefront pages here.
window.list_cols = sessionStorage.getItem(`list_cols`) || "3";
document.addEventListener("DOMContentLoaded", function() {
  const loadedScreenSize = window.innerWidth;

  window.addEventListener('resize', function(event) {
    console.log(loadedScreenSize, window.innerWidth)
    if((loadedScreenSize > 990 && window.innerWidth < 990) || (loadedScreenSize < 990 && window.innerWidth > 990)){
      window.location.reload()
    }
    //$(`body`).append(`<p>${loadedScreenSize}</p>`)
  }, true);

    if(storefront.context.resource == "categories"){
      sessionStorage.setItem('last_category',storefront.context.body.name)
    }
    setTimeout(() =>{
      $(window).resize();    
    }, 1000)
    let h = $(`header.header`).innerHeight();
    $(`body`).css(`--header-height`, h + 'px');
    $('body').css('--header-vh', ($('header#header').innerHeight()) + 'px');
    $(`body`).css(`--screen-width`, screen.width + 'px');
    $(`body`).css(`--screen-width`, screen.width + 'px');
    $(`body`).css(`--avail-width`, screen.availWidth + 'px');

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

const { toggleFavorite, checkFavorite } = require('@ecomplus/storefront-components/src/js/helpers/favorite-products');
const search = new EcomSearch()
const EcomPassport = require('@ecomplus/passport-client');
const client = EcomPassport.ecomPassport.getCustomer();   

if(client.display_name){
  $('[data-username]').text(client.display_name || `Visitante` )
  $(`[data-isnotlogged]`).hide()
}else{
  $(`[data-islogged]`).hide()
}

const getDefaultState = () => {
  return {
    customer: {
      _id: '',
      locale: '',
      main_email: '',
      accepts_marketing: false,
      display_name: '',
      name: {},
      birth_date: {},
      gender: '',
      photos: [],
      phones: [],
      registry_type: 'p',
      doc_country: '',
      doc_number: '',
      inscription_type: '',
      inscription_number: '',
      corporate_name: '',
      addresses: [],
      loyalty_points_entries: []
    },
    orders: []
  }
}

window.logout = function(){
  localStorage.removeItem(`ecomPassportClient`);
  document.cookie = "ecomPassportClient=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.reload()
}


$('body').on('click','#favorites-quickview button[data-product-id]', function(){
  toggleFavorite($(this).data(`product-id`), EcomPassport.ecomPassport)
  $(this).closest(`.item`).remove();
  checkFavoriteLocal()
});

async function syncFavorites(){
  if(client.display_name && localStorage.getItem(`apxLocalFavorites`)){
    const localFavorites = JSON.parse(localStorage.getItem(`apxLocalFavorites`));
    const { favorites } = await EcomPassport.ecomPassport.getCustomer(); 
    const newFavorites = localFavorites.concat(favorites.filter(item => !localFavorites.includes(item)));
    EcomPassport.ecomPassport.requestApi('/me.json', 'patch', { newFavorites })
    localStorage.removeItem(`apxLocalFavorites`)
  }
}



async function placeFavorites(){  
  $(`.favorites__body`).html('<p class="h5 d-block m-3 text-center">Carregando...</p>');
  
  try {
    let favoriteList = []
    if(client.display_name){
      const { favorites } = await EcomPassport.ecomPassport.getCustomer();  
      favoriteList = favorites  
    }else{
      let localFavorites = localStorage.getItem(`apxLocalFavorites`)
      if(localFavorites){
        localFavorites = JSON.parse(localFavorites)
        favoriteList = localFavorites
      }
    }
    
    search.setProductIds(favoriteList).fetch().then(result => {
      //console.log(result)
      $(`.favorites__body`).empty()
      $.each(result.hits.hits, function(k,i){
        let item = i._source;        
        $(`<div class="item"><a href=/${item.slug}><img alt="${item.pictures ? item.pictures[0].normal.alt : ''}"src="${item.pictures ? item.pictures[0].normal.url : '/assets/img-placeholder.png'}"><h3 class=product-card__name>${item.name}</h3></a><button type="button" data-product-id=${i._id}><i class="i-trash"></i></button></div>`).appendTo(`.favorites__body`);
      });  
      
      if(result.hits.hits.length == 0){
        $(`.favorites__body`).html('<p class="m-4 text-center h5 font-small d-block">Ops... você não adicionou nenhum produto a sua lista de favoritos</p>');
      }

      $(`.favorite-count`).text(result.hits.hits.length)
    })
    
  }catch(e){
    console.log(e)
    $(`.favorites__body`).html('<p class="h5 d-block m-4 text-center">Ocorreu um erro ao carregar os favoritos :(</p>');
    $(`#favorites-toggle span`).text(`0`)
  }
}


$(`body`).on(`click`,`[href="/app/#/account/favorites"], #favorites-toggle`,function(e){
  e.preventDefault();  
  placeFavorites();
  $(`#favorites-quickview`).show()
});
$(`body`).on(`click`,`#favorites-quickview .close`,function(e){
  e.preventDefault();
  $(`#favorites-quickview`).hide()
});

window.messageBullet = function(message) {
  const container = document.getElementById('message-container');
  
  // Create a new div for the message
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.textContent = message;
  
  // Append the new message to the container
  container.appendChild(messageElement);
  
  // Trigger fadeIn effect
  setTimeout(() => {
    messageElement.classList.add('fade-in');
  }, 10);  // Small delay to allow the DOM to update

  // Wait 3 seconds, then trigger fadeOut
  setTimeout(() => {
    messageElement.classList.remove('fade-in');
    messageElement.classList.add('fade-out');
    
    // Remove the message element after fadeOut transition (500ms)
    setTimeout(() => {
      messageElement.remove();
    }, 500);
  }, 3000);
}


placeFavorites();
syncFavorites();