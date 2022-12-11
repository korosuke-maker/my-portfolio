//lazyloadの実行

$(document).ready(function(){
  $("img.lazyload").lazyload({
    effect : 'fadeIn', //フェードインさせる
  });
});