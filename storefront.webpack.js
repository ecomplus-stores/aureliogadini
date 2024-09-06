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
      './html/CartQuickview.html': path.resolve(__dirname, 'template/js/custom-js/html/CartQuickview.html'),   
      './js/CartQuickview.js': path.resolve(__dirname, 'template/js/custom-js/html/CartQuickview.js'),    
      './html/CartItem.html': path.resolve(__dirname, 'template/js/custom-js/html/CartItem.html'),   
      './js/CartItem.js': path.resolve(__dirname, 'template/js/custom-js/html/CartItem.js'),   
      //'./js/SearchEngine.js': path.resolve(__dirname, 'template/js/custom-js/html/SearchEngine.js'), 
          
    }    
  }
})
