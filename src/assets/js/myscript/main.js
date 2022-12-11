/* ======================================== */
/* =========== セクション共通 ============== */
/* ======================================== */

// スクロール時、セクションテキストにつけるアニメーション、セクションに到達した時のinnerにつけるkeyframe-animationを発動(下からふわりとopacityだけふんわりの2パターン)
jQuery(document).ready(function() {
  $(window).scroll(function(){
    $('.animation-fadeIn').each(function(){
      var scroll = $(window).scrollTop();
      var blockPosition = $(this).offset().top;
      var windowHeight = $(window).height();
      if(scroll > blockPosition - windowHeight + 130){
        $(this).addClass('fadeIn');
      };
    });
    $('.opacity-animation').each(function(){
      var scroll = $(window).scrollTop();
      var blockPosition = $(this).offset().top;
      var windowHeight = $(window).height();
      if(scroll > blockPosition - windowHeight + 130){
        $(this).addClass('is-show');
      };
    });
    $('.bgextendTrigger').each(function(){
      var scroll = $(window).scrollTop();
      var blockPosition = $(this).offset().top;
      var windowHeight = $(window).height();
      if(scroll > blockPosition - windowHeight + 100){
        $(this).addClass('bgLRextend');
      };
    });
    $('.bgappearTrigger').each(function(){
      var scroll = $(window).scrollTop();
      var blockPosition = $(this).offset().top;
      var windowHeight = $(window).height();
      if(scroll > blockPosition - windowHeight + 100){
        $(this).addClass('section-bgappear');
      };
    });

  });
});




/* ======================================== */
/* =========== skillセクション ============== */
/* ======================================== */

//skill-contentのドロップダウンリスト（skill-itemクリックしたら開閉）
jQuery(document).ready(function() {
  jQuery('.skill-item').on('click',function(){
    jQuery(this).toggleClass('is-open');
    jQuery(this).children('.skill-item__content').slideToggle(300);
    jQuery(this).children('.skill-item__title').toggleClass('skill-item__title--a');
  });
});



/* ========================================== */
/* =========== contactセクション ============== */
/* ========================================== */

//コンタクトフォームとgoogleフォーム連携・送信、送信後メッセージ
jQuery(document).ready(function() {
  let $form = $('#js-form')
    $form.submit((e) => {
            $.ajax({
                url: $form.attr('action'),
                data: $form.serialize(),
                type: "POST",
                dataType: "xml",
                statusCode: {
                    0: function () {
                        //送信に成功したときの処理
                        $form.slideUp();
                        $('#js-success').slideDown();
                    },
                    200: function () {
                        //送信に失敗したときの処理
                        $form.slideUp();
                        $('#js-error').slideDown();
                    }
                }
            });
            return false;
        });
});



  //contact-formの入力完了時にボタンのスタイル変えと送信ボタンのdisabledを解放
  jQuery(document).ready(function() {
    let $submit = $('#js-submit');
    $submit.prop('disabled',true);
  
    $('#js-form input, #js-form textarea').on('change',function(){
        if(
            $('#js-form input[name="entry.2117698225"]').val() !=="" &&
            $('#js-form input[type="email"]').val() !=="" &&
            $('#js-form textarea').val() !=="" &&
            $('#js-form input[name="entry.1428257567"]').prop('checked') ===true
        ){
          //すべてフォームが入力された時
          $submit.prop('disabled',false)
          $submit.addClass('is-active')
          $submit.val('最後にボタンを押して送信する');
        }else{
          //フォームに入力されてないものがある時
          $submit.prop('disabled',true);
          $submit.removeClass('is-active')
          $submit.val('送信');
        }
    });
  });


/* =================================================================== */
/* =========== modal-privacy　プライバシーポリシーのモーダル ============== */
/* =================================================================== */

// プライバシーポリシーのモーダル開閉処理（プライバシーボタンとモーダルの連携）

// 開く時の動き
jQuery(document).ready(function() {
  jQuery('.js-open-modal-p').on('click',function(e){
    e.preventDefault();
    var target = jQuery(this).data('target');
    jQuery(target).show();
    jQuery('.modal-privacy__content').scrollTop(0);
    jQuery('body, html').addClass('is-fixed');
  });
});

// 閉じる時の動き
jQuery(document).ready(function() {
  jQuery('.js-close-modal-p').on('click',function(e){
    e.preventDefault();
    var target = jQuery(this).data('target');
    jQuery(target).hide();
    jQuery('body, html').removeClass('is-fixed');
  });
});



/* =================================================================== */
/* =========== modal-alert twitter告知のモーダルメッセージ   ============== */
/* =================================================================== */

//サイト開いて特定時間経ったらtwitter活動告知のモーダル出力と閉じるボタンとの連携
jQuery(document).ready(function() {
  setTimeout(function(){
    jQuery('.modal-twitter , .modal-twitter-background').show();
    jQuery('body, html').addClass('is-fixed');
  },60000);

  jQuery('.js-close-modal-t').on('click',function(e){
    e.preventDefault();
    var target = jQuery(this).data('target');
    jQuery(target).hide();
    jQuery('body, html').removeClass('is-fixed');
  });
});


/* ========================================== */
/* =========== totopボタン 画面右下のボタン ============== */
/* ========================================== */

//画面右下のtotop スクロール出現
jQuery(document).ready(function() {
  jQuery(window).on('scroll',function(){
    if(jQuery(this).scrollTop() > 200){
      jQuery('.totop').addClass('is-show');
    }else{
      jQuery('.totop').removeClass('is-show');
    }
  });
});


