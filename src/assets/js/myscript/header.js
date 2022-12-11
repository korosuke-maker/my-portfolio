'use strict';

/* ======================================== */
/* =========== header関連のjs ============== */
/* ======================================== */

// ページ更新時に2秒だけ遅らせてスクロール毎回0の位置に戻す
jQuery(document).ready(function(){
  $('html,body').delay(3000).animate({ scrollTop:0 },'1');
 });


//各ヘッダナビーメニューやドロワーメニューの、その他各種フラグメントリンクのスムーススクロール
jQuery(document).ready(function() {
  jQuery('a[href^="#"]').on('click',function(){
    var header =jQuery('.header').innerHeight();
    var id =jQuery(this).attr('href');
    var position = 0 ;
    if(id != '#'){
      var position =jQuery(id).offset().top - header;
    }
    jQuery('html ,body').animate({
      scrollTop:position
    },
    300);
  });
});


//headerを下スクロール時隠す挙動（ヘッダー分スクロールしてかつ下スクロール時は隠れる 上スクロール時は現れる）
jQuery(function($){
  var pos = 0;
  var header = $('.header');
  var headerHeight = header.innerHeight();

  $(window).on('scroll',function(){
    // headerの高さを超えたときに
    if($(this).scrollTop() > headerHeight){
      //scrollが下に進んでる時
      if($(this).scrollTop() > pos){
        header.addClass('hide');
        $('.drawer-icon__bar1, .drawer-icon__bar2, .drawer-icon__bar3').addClass('change-color');
      }else{
        header.removeClass('hide');
        $('.drawer-icon__bar1, .drawer-icon__bar2, .drawer-icon__bar3').removeClass('change-color');
      }
      //常に現在の位置をposに格納する
      pos = $(this).scrollTop();
    }
  })
});


//drawer（ハンバーガーメニュー）の挙動（iconクリック時のdrawer開閉とdrawerの背景）

jQuery(document).ready(function() {
  jQuery('.drawer-icon, .drawer-content__item a , .drawer-background').on('click',function(e){
    e.preventDefault();
    jQuery('.drawer-icon').toggleClass('is-active');
    jQuery('.drawer-content').toggleClass('is-active');
    jQuery('.drawer-background').toggleClass('is-active');
    jQuery('html,body').toggleClass('is-fixed');
    return false;
  });
});




