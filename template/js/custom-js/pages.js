// Add your custom JavaScript for storefront pages here.
document.addEventListener("DOMContentLoaded", function() {
  let h = $(`header.header`).innerHeight();
  $(`body`).css(`--header-height`, h + 'px')
});