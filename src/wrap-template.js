(function () {

  // <%= contents %>
  
  if (typeof window !== 'undefined') {
    window.Enum = Enum;
    window.Class = Class;
  } else {
    module.exports.Enum = Enum;
    module.exports.Class = Class;
  }
})();