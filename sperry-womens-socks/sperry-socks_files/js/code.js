if(typeof yiel === 'undefined'){
  var yiel = {};
  var _snaq = _snaq || []; //Analytic requests handler

  yiel = {"website":{"id":5054,"name":"sperry.com","track_yieldify_only":"false","use_snowplow":"","infrequent_basket_updates":"","shopping_class":"","shopping_selector":"","shopping_cart_multiple":"","shopping_initial":-1,"coupon_selector":"input#dwfrm_billing_couponCode, #dwfrm_cart_couponCode","submit_coupon_selector":"#add-coupon","submit_coupon_just_click":"","shopping_cart_seperator":".","track_visited_pages":"sperry,boat,sperry,/sale","track_visited_pages_expire":2592000000,"sign_out_class":"","campaigns_protocol":"//","watchdogs":"","cam_ids":"124312,123660,119175,123675,122652,123679,123638,119172,120888,120886,119178,119180,123671","campaigns":"124312,123660,119175,123675,122652,123679,123638,119172,120888,120886,119178,119180,123671","track_products":"true","products_url_pattern":"(.*)","product_image_css_path":".primary-image:eq(1)","form_targeting":"","afiliate_block":"","cookie_block":"","cookie_block_expire":"","referring_traffic_block":"demandware.net","referring_traffic_expire":null,"text_grabb_condition":"no","text_grabb_options":"","track_sale":"true","track_sale_expire":2592000000,"track_impression_sale":"true","track_impression_sales_expire":2592000000,"thanks_page_pattern":"/orderconfirmation,,true,,.order-confirmation-details p:last,,contains,,Order Number;;","sales_extra_details":"page,,Order Id,,.order-confirmation-details p:last,,\\:(.*);;","sale_ajax_update":"","track_sale_ajax":"","sub_domains":"","track_purchases":"true","last_price_pattern":"/en/revieworder","last_price_selector":".order-subtotal td.textalign-right","sale_value_multiplier":1.0,"browser_not_target":"","browser_target":"msie|chrome|firefox|safari|opera","delayed_start":0,"iv_delay":15000,"iv_delay_all":"","mouse_hh":0,"aa_delay":250,"bbb_margin":null,"bbb_ratio":8,"bbb_all_location":"","bbb_all_margin":"","bbb_all_ratio":"","exit_margin":"","exit_margin_right":"true","exit_margin_left":"true","exit_margin_right_val":null,"exit_margin_left_val":null,"exit_margin_right_unit":"px","exit_margin_left_unit":"px","show_powerd_by":"","close_image":"","delay":1800000,"encrypt_userinfo":"true","inactivity_period":4,"sale_display_type":"sale","website_sale_display_value":"1.5","block_script":"","heatmap_script":"//linkshare yieldify override fix - antony\r\nif (/8.9oyGPgP3Y/.test(window.location.href) || document.referrer.match(/8.9oyGPgP3Y/) || document.referrer.match(/t\\=t/) || document.referrer.match(/yie_coupon/)) {\r\n    yiel.fn.deleteYieldifyCookie(\"ab\");\r\n    yiel.md.website.website.affiliate_blocker = \"\";\r\n}\r\n\r\nfunction basket() {\r\n    if (!!yiel.$(\"#mini-cart .mini-cart-subtotals .value\").length) {\r\n        yiel.fn.setYieldifyCookie(\"basket\", yiel.md.currencies.parseValue(yiel.$(\"#mini-cart .mini-cart-subtotals .value:last\").text()));\r\n    } else {\r\n        yiel.fn.setYieldifyCookie(\"basket\", 0);\r\n    }\r\n}\r\n\r\n//yst:mutation\r\nvar targetDOM = yiel.$(\"body\").toArray();\r\nvar observer = new MutationObserver(function(mutations) {\r\n    mutations.forEach(function(mutation) {\r\n        basket();\r\n        scrapeCartImg();\r\n    });\r\n});\r\ntargetDOM.forEach(function(element) {\r\n    observer.observe(element, { childList: true, subtree: true });\r\n});\r\nbasket();\r\n\r\n//Build cookie of IDs and savings\r\nif (tmParam.page_type == \"product\") {\r\n    if (yiel.$(\".promo-price\").text().length > 0) {\r\n        var savingsArray = !!(yiel.fn.getYieldifyCookie(\"savingsArray\")) ? JSON.parse(yiel.fn.getYieldifyCookie(\"savingsArray\")) : {};\r\n        var salePrice = yiel.md.currencies.parseValue(yiel.$(\".promo-price\").text().match(/(\\d+\\.\\d+)/)[1]);\r\n        var fullPrice = yiel.md.currencies.parseValue(yiel.$(\".price-standard\").text().match(/(\\d+\\.\\d+)/)[1]);\r\n        var savings = fullPrice - salePrice;\r\n        savingsArray[tmParam.product_stock_number] = yiel.md.currencies.parseValue(savings.toFixed(2));\r\n        yiel.fn.setYieldifyCookie(\"savingsArray\", JSON.stringify(savingsArray));\r\n    }\r\n}\r\n\r\n//Scrape the last item's image from the minibasket and set it as a custom_dynamic_campaign cookie\r\nfunction scrapeCartImg() {\r\n    if (!!yiel.$(\".mini-cart-products\").length) {\r\n\r\n        var cart_img = (yiel.$(\".mini-cart-products .mini-cart-image img:first\")[0].src).split(\"?$\")[0],\r\n            cart_name = yiel.$(\".mini-cart-products .mini-cart-name a:first\").text();\r\n\r\n        yiel.fn.setYieldifyCookie(\"custom_dynamic_campaign\", JSON.stringify({\r\n            img: cart_img,\r\n            name: cart_name\r\n        }));\r\n    }\r\n}\r\n\r\n//yst:zindexfix\r\nyiel.md.hooks.subscribe('impression', function(campaignId) {\r\n    yiel.$(\"#overlay_\" + campaignId).css(\"z-index\", \"2147483638\");\r\n});","ajax_coupon_selector":"","max_products_store":5,"analytics_events":"","analytics_events_category_name":"Yieldify","affiliate_blocker":"SiteID=,siteID=,siteid=,siteId=,Siteid=,ranSiteID=,ranMID=,ranEAID=,RANEAID=,RANeaid=,mid=,MID=,affiliateID=,clickID=,=Linkshare,=linkshare,=linkShare,=LinkShare,=Rakutenmarketing,=RakutenMarketing,=rakutenmarketing,=rakutenMarketing,=Rakutenaffiliatenetwork,=RakutenAffiliateNetwork,=rakutenaffiliatenetwork,=Ls,=LS,=ls,=Ran,=RAN,=ran,=Rakutenlinkshare,linkshare,LinkShare,Linkshare,affiliate,aff=LS,aff=ls,icid=AFL-yieldify","affiliate_block_expire":2592000000,"form_refill":"","url_pattern":"","form_refill_fields":"","form_refill_expire":null,"website_version":2,"shopping_item_selector":"","data_fields":[],"data_events":[],"basket_fields":[],"form_fields":[]},"info":{"cr":118,"env":"production","dms":{"gls":"geo.yieldify.com","evc":"b.yieldify.com","rt":"rt-proxy.yieldify.com","es":"email-service.yieldify.com"},"request_host_with_port":"app.yieldify.com","src":"//d33wq5gej88ld6.cloudfront.net/code_revisions/000/000/118/original/yieldify_1472724462.js?1472724467"}};

  yiel.md = {};

  //load Yieldify here
  if (yiel.info.src) {
    var e = document.createElement('script');
    e.src = yiel.info.src;
    e.async = true;
    document.getElementsByTagName("head")[0].appendChild(e);
  }
}