/* ================================================================================
* Title: Jquery Function
*
* Copyright (c) NineAXIS
* http://www.studio.co.jp/
* Date: Feb.13, 2009
* @author: Chihiro Mori,Otto Kamiya
* @version: 2.0.0
*
* jQuery 1.5+
*
* 確認済ブラウザ: [Mac] FireFox3.0, Safari3.1.2 [Win] IE6.0, 7.0
* Macで作業するときの注意：バックスラッシュ\を入力するときはoptionを押しながらエンマーク
================================================================================ */

(function($)
{
//---------------------------------------------------------------------
     $(function()
     {
          $.ASconf.extend();//jQueryの拡張
          $.ASconf.selfLink();//自分自身にリンクしているページにcurrentつける
          $.ASconf.pngFix();//dd_blatedPNG発動
          $.ASconf.btnRollover();//画像のロールオーバー時の挙動
          $.ASconf.menuScroll();//サイドメニューのスクロール
          $.ASconf.headerScroll();//ヘッダーのスクロール
         
     });
//---------------------------------------------------------------------
     $.ASconf =
     {
     //---------------------------------------------------------------------
     extend:function(){
               $.fn.extend({
                    //.log()をつけてチェーン途中でもログ出力
                    log: function() {
                           console.log($(this));
                           return this;
                    },
                   
                  
                    //ブラウザーごとのクラスを付与
                    addBrowserClass:function(){
                           //http://w3g.jp/blog/tools/jquery_browser_sniffingを参照
                           if(!$.support.checkOn && $.support.checkClone){
                                var _browser = "webkit";
                           }else if($.support.checkOn && $.support.noCloneEvent && window.globalStorage){
                              var _browser = "firefox";
                           }else if($.support.checkOn && $.support.noCloneEvent && !window.globalStorage){
                                var _browser = "opera";
                           }else if(!$.support.noCloneEvent && $.support.opacity){
                                var _browser = "ie9";
                           }else if(!$.support.opacity){
                                 if(!$.support.style){
                                        if (typeof document.documentElement.style.maxHeight != "undefined") {
                                          var _browser = "ie7";
                                        } else {
                                          var _browser = "ie6";
                                        }
                                 }else{
                                     var _browser = "ie8";
                                 }
                           }else{
                                 var _browser = "unknown";
                           }
                           $(this).addClass(_browser)
                           return this;
                    }                        
                    });
                    $.extend({
                         returnBrowser:function(){
                                   if(!$.support.checkOn && $.support.checkClone){
                                             var _browser = "webkit";
                                      }else if($.support.checkOn && $.support.noCloneEvent && window.globalStorage){
                                          var _browser = "firefox";
                                      }else if($.support.checkOn && $.support.noCloneEvent && !window.globalStorage){
                                             var _browser = "opera";
                                      }else if(!$.support.noCloneEvent && $.support.opacity){
                                             var _browser = "ie9";
                                      }else if(!$.support.opacity){
                                             if(!$.support.style){
                                                       if (typeof document.documentElement.style.maxHeight != "undefined") {
                                                         var _browser = "ie7";
                                                       } else {
                                                         var _browser = "ie6";
                                                       }
                                             }else{
                                                  var _browser = "ie8";
                                             }
                                      }else{
                                             var _browser = "unknown";
                                      }
                                     return _browser;
                                   }
                         })
               },
          selfLink: function ()
          {
               var c = $.extend(
               {
                    selfLinkClass:'current'
               });
              
               $.ASconf.selfLinkClass = '.' + c.selfLinkClass;
               $.ASconf.theUrl = location.href.replace(location.hash, '');
               $.ASconf.shrUrl = document.getElementById('baseCSS').href.replace('css/reset.css', '');
               var theUrl = $.ASconf.theUrl.replace(/(\/|\#)$/, '/index.html');
              
               $('a[href]').each(function()
               {
                    var i = document.createElement('span');
                    i.innerHTML = '<a href="' + $(this).attr('href') + '" />';
                    var absolutePath = i.firstChild.href;                   
                    if (absolutePath == theUrl)
                    {
                         $(this).addClass(c.selfLinkClass).removeAttr('href');
                         var gN = $(this).parent().parent().attr('id');
                         if(gN == 'gNavi'){
                              $(this).find('img').fadeTo(0, 0);
                         }else {
                              $(this).find('img').fadeTo(0, 0.6);
                         }
                    }
               });
          }
          ,
          //-----------------------------------------------------------------
          pulldown: function()
          {
               var c = $.extend(
               {
                    selector:'#cNav li[id]'
               });
              
               $(c.selector).hover(function()
               {
                    $(this).find('ul:not(:animated)').slideDown('normal');
                    //$('#headerWrap').css('height','300');
               }
               ,function()
               {
                    $(this).find('ul').slideUp(0);
                    //$('#headerWrap').css('height','auto');
               });
          }
          ,
          //-----------------------------------------------------------------
          pngFix: function()
          {         
                   
               if ($.returnBrowser() === 'ie6') {
                    try{
                         DD_belatedPNG.fix('img');
                    }catch(e){
                    }
               }

          }
          ,
          //-----------------------------------------------------------------
          btnRollover: function()
          {              
    
               $('a:not(.current) img').each(function()
               {
                    $(this).hover(function(){
                         var gN = $(this).parent().parent().parent().attr('id');
                         if(gN == 'gNavi'){
                              $(this).not(':animated').fadeTo('fast', 0);
                         }else {
                              $(this).not(':animated').fadeTo('fast', 0.6);
                         }
                    }
                    ,function(){
                         $(this).fadeTo('fast', 1);
                    });
               });
              
    
              
               $('.btn').each(function()
               {
                    $(this).hover(function(){
                         $(this).not(':animated').fadeTo('fast', 0.8);
                    }
                    ,function(){
                         $(this).fadeTo('fast', 1);
                    });
               });
          }
          ,         

          //-----------------------------------------------------------------
          menuScroll: function()
          {
               $('body:not(.home) div#sNav').each(function()
               {
                    var target = $(this);
                    var defaultTopPs = 13;
                    if($(target).css("right") != "0px")
                    {//* htmlでIE6のみ違う値を設定し除外する
                         var offsetTop = target.offset().top;
                         var targetHeight = target.attr('offsetHeight');
                         var footerOffset = $('div#contentBottom').offset().top;
                         var maxScroll = footerOffset - (targetHeight + offsetTop - defaultTopPs);
                        
                        
                         function winScroll(e)
                         {
                              var scrollTop = $(document).scrollTop();
                              if(scrollTop < maxScroll)
                              {
                                   if(offsetTop -13 < scrollTop)
                                   {
                                        var offset = (scrollTop - offsetTop + defaultTopPs);
    
                                        $(target).stop().animate({top:offset+'px'},{ duration:350, queue: false });
                                   }
                                   else
                                   {
                                        $(target).stop().animate({top:defaultTopPs},{ duration:350, queue: false });
                                   }                             
                              }
                              else
                              {
                                   $(target).stop().animate({top:maxScroll},{ duration:350, queue: false });
                              }
                         }
                        
                        
                         target.find('img').each(function(){
                              $(this).load(function(){
                                   targetHeight = target.height();
                                   initScroll();                             
                              })
                         });
                        
                         function initScroll(){
                              if(targetHeight < $('#contentLeft').height()){
                              winScroll();//Fire Fox で Google Analyticsを埋め込んだページでは、ページ読み込み時のscrollイベントが発生しない？？ので、その対策
                              $(window).bind('scroll', winScroll);
                              $(window).bind('resize', winScroll);
                              } else {
                                   $('#contentLeft').height(targetHeight);
                              }
                         }
                    }
               });
          }
          ,
          //-----------------------------------------------------------------
          headerScroll: function()
          {
               if($.returnBrowser() !== 'ie6' && $.returnBrowser() !== 'ie7'){
               window.onload = function(){
                    $('body ul#gNavi').each(function()
                    {
                         var target = $(this);
                         var defTop = target.offset();
                        
                         function menuScroll(e)
                         {
                              var scrollTop = $(document).scrollTop();
                              //console.log(defTop + " , " + scrollTop);
                              if(scrollTop > defTop.top)
                              {
                                   target.css("top", scrollTop);
                                   //console.log(scrollTop);
                              }
                              else
                                   target.css("top", defTop.top);
                         }
                         $(window).bind('scroll', menuScroll);
                         $(window).bind('resize', menuScroll);
                         menuScroll();
                   
                    });
               }
               }
               //$("body ul#gNavi").addBrowserClass().log()
          }
     //-----------------------------------------------------------------
     };
//---------------------------------------------------------------------
})(jQuery);
if (!window.console) {
  (function() {
      var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
        "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
      window.console = {};
      for (var i = 0; i < names.length; ++i)
        window.console[names[i]] = function() {}
  })();
}
               