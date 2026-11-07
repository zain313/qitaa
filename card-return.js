// The card payment's landing page (web/card-return.html): what card-return found
// (status), where to go back (platform), in the customer's language (lang). A file
// of its own: the site's CSP runs no inline script but index.html's.
// Nothing here is believed or sent anywhere: the server activated the package (or
// not) before redirecting here. The Kurdish needs a native speaker's review.
(function () {
  "use strict";

  var texts = {
    ar: {
      paid: ["تم الدفع وفُعّلت الباقة", "تجدها في «مشترياتي»."],
      pending: ["نتحقّق من الدفع", "إن أكملت الدفع فلا تدفع مرة أخرى: تُفعَّل الباقة حين يصلنا التأكيد."],
      failed: ["لم يكتمل الدفع", "حاول مرة أخرى، أو ادفع عبر واتساب."],
      app: "ارجع إلى تطبيق «قطعة».",
      web: "ارجع إلى تبويب «قطعة» وأغلق هذا التبويب.",
      title: "قطعة",
    },
    en: {
      paid: ["Payment received, your package is active", "You'll find it in My purchases."],
      pending: ["We're checking the payment", "If you completed it, don't pay again: your package is activated as soon as the confirmation reaches us."],
      failed: ["The payment didn't go through", "Try again, or pay on WhatsApp."],
      app: "Go back to the Qet'a app.",
      web: "Go back to the Qet'a tab and close this one.",
      title: "Qet'a",
    },
    ckb: {
      paid: ["پارەدانەکە وەرگیرا و پاکێجەکە چالاک کرا", "لە «کڕینەکانم»دا دەیدۆزیتەوە."],
      pending: ["پارەدانەکە دەپشکنین", "ئەگەر پارەدانەکەت تەواو کردووە دووبارە پارە مەدە: کاتێک پشتڕاستکردنەوە گەیشت پاکێجەکە چالاک دەکرێت."],
      failed: ["پارەدانەکە تەواو نەبوو", "دووبارە هەوڵ بدەرەوە، یان لە واتسئاپ پارە بدە."],
      app: "بگەڕێوە بۆ ئەپی «قطعة».",
      web: "بگەڕێوە بۆ تابی «قطعة» و ئەم تابە دابخە.",
      title: "قطعة",
    },
  };
  var marks = { paid: "✓", pending: "…", failed: "!" };

  var query = new URLSearchParams(window.location.search);
  var lang = Object.prototype.hasOwnProperty.call(texts, query.get("lang")) ? query.get("lang") : "ar";
  var status = Object.prototype.hasOwnProperty.call(marks, query.get("status")) ? query.get("status") : "pending";
  var web = query.get("platform") === "web";
  var t = texts[lang];

  function show() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
    document.title = t.title;
    var mark = document.getElementById("mark");
    mark.textContent = marks[status];
    mark.className = "mark " + status;
    // textContent only: nothing from the address becomes markup.
    document.getElementById("title").textContent = t[status][0];
    document.getElementById("body").textContent = t[status][1];
    document.getElementById("next").textContent = web ? t.web : t.app;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", show);
  } else {
    show();
  }
})();
