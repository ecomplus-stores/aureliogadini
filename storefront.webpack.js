const path = require('path')

module.exports = () => ({
  resolve: {
    alias: {
      './base-config': path.resolve(__dirname, 'template/js/netlify-cms/base-config'),
      './js/TheProduct.js': path.resolve(__dirname, 'template/js/custom-js/html/TheProduct.js'), 
      './html/TheProduct.html': path.resolve(__dirname, 'template/js/custom-js/html/TheProduct.html'), 
      './html/SearchEngine.html': path.resolve(__dirname, 'template/js/custom-js/html/SearchEngine.html'),   
      './html/InstantSearch.html': path.resolve(__dirname, 'template/js/custom-js/html/InstantSearch.html'),   
      './js/InstantSearch.js': path.resolve(__dirname, 'template/js/custom-js/html/InstantSearch.js'), 
      './html/ShippingCalculator.html': path.resolve(__dirname, 'template/js/custom-js/html/ShippingCalculator.html'), 
      './html/APrices.html': path.resolve(__dirname, 'template/js/custom-js/html/APrices.html'),   
      './js/ShippingCalculator.js': path.resolve(__dirname, 'template/js/custom-js/html/ShippingCalculator.js'),  
      './html/CartQuickview.html': path.resolve(__dirname, 'template/js/custom-js/html/CartQuickview.html'),   
      './js/CartQuickview.js': path.resolve(__dirname, 'template/js/custom-js/html/CartQuickview.js'),    
      './html/CartItem.html': path.resolve(__dirname, 'template/js/custom-js/html/CartItem.html'),   
      './js/CartItem.js': path.resolve(__dirname, 'template/js/custom-js/html/CartItem.js'),   
      './js/SearchEngine.js': path.resolve(__dirname, 'template/js/custom-js/html/SearchEngine.js'),
      
      './js/APicture.js': path.resolve(__dirname, 'template/js/custom-js/html/APicture.js'), 
      
      './html/ProductCard.html': path.resolve(__dirname, 'template/js/custom-js/html/ProductCard.html'), 
      './js/ProductCard.js': path.resolve(__dirname, 'template/js/custom-js/html/ProductCard.js'), 
      './lib/glide-slides': path.resolve(__dirname, 'template/js/custom-js/html/glide-slides.js'),     
      './lib/lazy-load': path.resolve(__dirname, 'template/js/custom-js/html/lazy-load.js'),     
      // './js/ProductCard.js': path.resolve(__dirname, 'template/js/custom-js/html/ProductCard.js'),   

      './html/TheCart.html': path.resolve(__dirname, 'template/js/custom-js/html/TheCart.html'),   
      './html/EcCheckout.html': path.resolve(__dirname, 'template/js/custom-js/html/EcCheckout.html'),   
      './js/EcCheckout.js': path.resolve(__dirname, 'template/js/custom-js/html/EcCheckout.js'),   
      './html/PaymentMethods.html': path.resolve(__dirname, 'template/js/custom-js/html/PaymentMethods.html'),   
      './App.vue': path.resolve(__dirname, 'template/js/custom-js/html/App.vue'), 
      './html/TheAccount.html': path.resolve(__dirname, 'template/js/custom-js/html/TheAccount.html'), 
      //'./modules/account': path.resolve(__dirname, 'template/js/custom-js/html/account.js'), 
      './helpers/favorite-products': path.resolve(__dirname, 'template/js/custom-js/html/favorite-products.js'),   
      './helpers/favorite-products.js': path.resolve(__dirname, 'template/js/custom-js/html/favorite-products.js'),   
      '@ecomplus/storefront-components/src/js/helpers/favorite-products': path.resolve(__dirname, 'template/js/custom-js/html/favorite-products.js'), 
    }    
  }
})
