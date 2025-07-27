jQuery(function ($) {
  // ===== Swiper初期化 =====
  // メインビジュアル
  new Swiper(".js-mv-swiper", {
    direction: "vertical",
    loop: true,
    speed: 2000,
    fadeEffect: { crossFade: true },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });

  // 会社ロゴ
  new Swiper(".js-company-swiper", {
    loop: true,
    speed: 4000,
    slidesPerView: 3,
    autoplay: {
      delay: 0,
    },
  });

  // ===== メニューアクティブ切り替え =====
  const menuSelector =
    ".p-news-menu__list-text, .c-category-list__text";
  $(menuSelector).on("click", function () {
    $(`${menuSelector}.active`).removeClass("active");
    $(this).addClass("active");
  });

  // ===== フェードアップアニメーション =====
  $(
    ".js-fadeUp__right, .js-fadeUp__left, .js-fadeUp__top, .js-fadeUp__bottom"
  ).on("inview", function () {
    $(this).addClass("is-inview");
  });
  // ===== ハンバーガーメニュー =====
  $(".js-hamburger").on("click", function () {
    $(this).toggleClass("is-open");
    $(".js-drawer").fadeToggle();
  });

  // ドロワーナビのaタグクリックで閉じる
  $(".js-drawer a[href]").on("click", function () {
    $(".js-hamburger").removeClass("is-open");
    $(".js-drawer").fadeOut();
  });

  // リサイズ時のドロワーナビ制御
  $(window).on("resize", function () {
    if (window.matchMedia("(min-width: 768px)").matches) {
      $(".js-hamburger").removeClass("is-open");
      $(".js-drawer").fadeOut();
    }
  });

  // ===== 文字数制限・省略 =====
  // newsページ：タイトル46文字以降を省略
  // スマホ表示時は40文字、PC・タブレットは46文字で省略
  $(".c-news-item__title p").each(function () {
    const text = $(this).text().trim();
    const isSp = window.matchMedia("(max-width: 767px)").matches;
    const limit = isSp ? 40 : 46;
    if (text.length > limit) {
      $(this).text(text.slice(0, limit) + "…");
    }
  });

  // news-detailページ：サイドバー記事36文字以降を省略
  $(".c-aside-menu__text").each(function () {
    const text = $(this).text().trim();
    if (text.length > 36) {
      $(this).text(text.slice(0, 36) + "…");
    }
  });

  // news-detailページ：サイドバー記事10文字以降を省略
  $(".current-item").each(function () {
    const text = $(this).text().trim();
    if (text.length > 10) {
      $(this).text(text.slice(0, 10) + "…");
    }
  });

  // ===== サブワークスリストタイトルの改行・省略処理 =====
  $(".c-works-item__title").each(function () {
    const text = $(this).text().trim();
    let newText = "";
    const isSp = window.matchMedia("(max-width: 767px)").matches;
    if (isSp) {
      // スマホサイズ
      newText = text.length > 24 ? text.slice(0, 24) + "…" : text;
    } else {
      // PC・タブレット
      if (text.length > 46) {
        newText = text.slice(0, 30) + "<br>" + text.slice(30, 46) + "…";
      } else if (text.length > 30) {
        newText = text.slice(0, 30) + "<br>" + text.slice(30);
      } else {
        newText = text;
      }
    }
    $(this).html(newText);
  });

  // ===== スムーススクロール（オフセット切り替え対応） =====
  const offsetPC = 200;
  const offsetSP = 100;
  $('a[href^="#"]').on("click", function (e) {
    const href = $(this).attr("href");
    if (href.length > 1) {
      const $target = $(href);
      if ($target.length) {
        e.preventDefault();
        const isSp = window.matchMedia("(max-width: 767px)").matches;
        const offset = isSp ? offsetSP : offsetPC;
        const position = $target.offset().top - offset;
        $("html, body").animate({ scrollTop: position }, 200, "swing");
      }
    }
  });

  // ===== 電話ボタンのPC無効化 =====
  var isMobile = /iPhone|Android.+Mobile|Windows Phone/.test(
    navigator.userAgent
  );
  if (!isMobile) {
    // PCの場合のみクリック無効化（見た目はそのまま）
    $(".p-contact__btn--tel").on("click", function (e) {
      e.preventDefault();
    });
  }
});
