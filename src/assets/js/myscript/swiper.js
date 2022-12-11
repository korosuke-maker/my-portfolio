// mainvisual(Home)のswiperスライダー
//javascriptのプラグイン

const swiper = new Swiper('.swiper', {
  // Optional parameters

  loop: true,
  effect:'fade',
  autoplay: {
    delay: 8000, //8秒後に次のスライドへ
    disableOnInteraction: false //ユーザー操作後に自動再生を再開する
  },
  speed: 1500,//1.5秒かけてフェードで切り替える
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable:true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});
