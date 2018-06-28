
var lhnTrack=lhnTrackingEnabled;
var blhnInstalled=0;
if (typeof lhnInstalled !='undefined'){lhnTrack='f';blhnInstalled=1;}
var lhnInstalled=1;
var InviteRepeats;
var zbrepeat=1;
var bInvited=0;
var bLHNAutoInvite=1;
var bLHNOnline=-1;
InviteRepeats=0;
var Zmutechime = lhnInviteChime;
var lhnScriptTag;
var lhnCustom1 = typeof (lhnCustom1) == 'undefined' ? '' : lhnCustom1;
var lhnCustom2 = typeof (lhnCustom2) == 'undefined' ? '' : lhnCustom2;
var lhnCustom3 = typeof (lhnCustom3) == 'undefined' ? '' : lhnCustom3;

if (blhnInstalled==0)
{
	if (typeof zCustomInvitation =='undefined'){
	var zCustomInvitation=lhnCustomInvitation;
	}

	if (zCustomInvitation=='' || !document.getElementById('Zsmenu'))	{
        var LHdef = '.lhnInviteContainer{z-index:10000000;width:278px;display:none;line-height:22px;position:fixed;top:150px;background-color:#ffffff;padding:15px;border-radius:8px;border:1px solid #666666;box-shadow:#cccccc 3px 3px 7px;font-size:16px;text-align:center;font-family:Tahoma,sans-serif;color:#555555;}.lhnInviteContainer .LHNInviteTitle{color:#333333;margin-bottom:5px;font-size:18px;width:100%;}.lhnInviteContainer .LHNInviteMessage{margin-bottom:8px;padding-bottom:12px;border-bottom:1px solid #666666;width:100%;}.lhnInviteContainer .LHNInviteMessage img{border-radius:10px;}.lhnInviteContainer .LHNInviteAcceptButton{font-size:18px;background-color:#666666;color:#ffffff;text-decoration:none;display:inline-block;padding:5px 20px 7px;}.lhnInviteContainer .LHNInviteCloseButton{background-color:#666666;color:#ffffff;position:absolute;top:-12px;right:-12px;height:24px;width:24px;font-size:20px;text-decoration:none;border-radius:12px;line-height:20px;}.LHNInviteButtons{width:100%;}';
		if (document.body)
			{
				var LHss1 = document.createElement('style');
				LHss1.setAttribute("type", "text/css");
				if (LHss1.styleSheet) {   // IE
					LHss1.styleSheet.cssText = LHdef;
				} else {                // the world
					var LHtt1 = document.createTextNode(LHdef);
					LHss1.appendChild(LHtt1);
				}
			
				var lhndiv = document.createElement('div');
				lhndiv.id = 'Zsmenu';
                lhndiv.className = "lhnInviteContainer";
                lhndiv.innerHTML="<div class=\"LHNInviteTitle\">Live Help</div><div id=\"Zsleft\" class=\"LHNInviteMessage\"></div><div class=\"LHNInviteButtons\"><a class=\"LHNInviteCloseButton\" onclick=\"CloseLHNInvite();return false;\" href=\"#\">x</a><a class=\"LHNInviteAcceptButton\" onclick=\"OpenLHNChat();return false;\" href=\"#\">Start chat</a></div>";
				if (document.body.firstChild){document.body.insertBefore(lhndiv, document.body.firstChild);document.body.insertBefore(LHss1, document.body.firstChild);}else{document.body.appendChild(lhndiv);document.body.appendChild(LHss1);}
			}
		else 
			{
				document.write('<style>' + LHdef + '</style>');
				document.write('<div id="Zsmenu" class="lhnInviteContainer"><div class="LHNInviteTitle">Live Help</div><div id="Zsleft" class="LHNInviteMessage"></div><div class="LHNInviteButtons"><a class="LHNInviteCloseButton" onclick="CloseLHNInvite();return false;" href="#">x</a><a class="LHNInviteAcceptButton" onclick="OpenLHNChat();return false;" href="#">Start chat</a></div></div>');
			}
		
    }
                        
    var LhnInvite = (function (parent) {parent.getTime = Date.now || function () { return +new Date; };parent.extend = function (dest) {var src;for (var i = 1, len = arguments.length; i < len; ++i) {src = arguments[i];for (var prop in src)dest[prop] = src[prop];}return dest;};parent.separate = function (list, iterator) {var selected = [];var rest = [];for (var i = 0, len = list.length; i < len; ++i) {if (iterator.call(this, list[i], i, list)){selected.push(list[i]);}else{rest.push(list[i]);}}return { selected: selected, rest: rest };};parent.Animation = function () {var tweens = []; var updateTween = function (tween, t) {var prop, i = tween.props.length, opts = tween.options;while (i--) {prop = tween.props[i];var v = opts.easing(t, prop.b, prop.c, opts.duration);if (opts.units)v += opts.units;tween.target[prop.name] = v;}};var tweenTo = function (target, options) {var defaults = {props: {}, initProps: null, duration: 1000, refreshRate: 20, units: null, easing: parent.Animation.Easing.linear, onStart: null, onComplete: null, onCancel: null};options = (typeof options == 'object') ?parent.extend({}, defaults, options) : defaults;clearTweensByTarget(target); if (options.initProps)LhnInvite.setProps(target, options.initProps);var propsToTween = [];for (var k in options.props) {var o = {};o.name = k;o.b = target[k];if (isNaN(o.b))o.b = parseFloat(o.b);o.c = options.props[k] - o.b;propsToTween.push(o);}if (propsToTween.length < 1 || options.duration <= 0 || options.refreshRate < 10) {return null;}var d = options.duration, tween = {};tween.target = target;tween.options = options;tween.props = propsToTween;var startTime = LhnInvite.getTime();tween.interval = setInterval(function () {var t = LhnInvite.getTime() - startTime;if (t > d)t = d;updateTween(tween, t); if (t >= d) {clearTween(tween);removeTween(tween);if (options.onComplete)options.onComplete(tween);}}, options.refreshRate);tweens.push(tween);if (options.onStart)options.onStart(tween);return tween;};var cancelTweens = function (target, bJumpToEnd, bRunComplete) {var sepTweens = getSeparatedTweens(target);var targetTweens = sepTweens.selected;var tween, i = targetTweens.length;while (i--) {tween = targetTweens[i];clearTween(tween);bJumpToEnd = bJumpToEnd || false;if (bJumpToEnd)updateTween(tween, tween.options.duration); if (tween.options.onCancel)tween.options.onCancel(tween);bRunComplete = bRunComplete || false;if (bRunComplete && tween.options.onComplete)tween.options.onComplete(tween);}tweens = sepTweens.rest;};var clearTweensByTarget = function (target) {var sepTweens = getSeparatedTweens(target);var targetTweens = sepTweens.selected;var i = targetTweens.length;while (i--)clearTween(targetTweens[i]);tweens = sepTweens.rest;};var clearTween = function (tween) {if (tween) {clearInterval(tween.interval);}};var removeTween = function (tween) {tweens = LhnInvite.separate(tweens, function (t) {return (t !== tween);});};var getSeparatedTweens = function (target) {return LhnInvite.separate(tweens, function (t) { return (t.target === target); });};return {tweenTo: tweenTo, cancelTweens: cancelTweens, Easing: { linear: function (t, b, c, d) { return c * t / d + b; }, outQuad: function (t, b, c, d) { return -c * (t /= d) * (t - 2) + b; }}};}();parent.tweenTo = parent.Animation.tweenTo;parent.cancelTweens = parent.Animation.cancelTweens;parent.setProps = function (target, props) {for (var k in props) {target[k] = props[k];}};return parent;}(LhnInvite || {})); 
}

function pausecomp(millis) 
{
zadate = new Date();
var zcurDate = null;

do { var zcurDate = new Date(); } 
while(zcurDate-zadate < millis);
} 

if (blhnInstalled==0)
{
var lhnjava;
var lhnreg = new RegExp('/');
var lhnreferrer = (document.referrer.length>400)?escape(document.referrer.substring(0,400)):escape(document.referrer);//escape(document.referrer);

var lhnpagetitle=(document.title.length>100)?escape(document.title.substring(0,100)):escape(document.title);
var srnd;
//var lhnsShortPath = escape(window.location.pathname);
var lhnsPath=(this.location.length>400)?escape(this.location.substring(0,600)):escape(this.location);//escape(this.location);
if ( !(navigator.javaEnabled()) ) {
  lhnjava="No" ;
} else {
  lhnjava="Yes" ;
}
var lhnrand_no = Math.random();


var lhnsRes;
var lhnsDepth;
if (window.screen) {
lhnsRes=screen.width + 'x' + screen.height;
lhnsDepth=screen.colorDepth;
}
}


function WriteLHNMessage(lhnmes,AutoInvite)
{
    var lhnInviteWidth='278px';
    if (bLHNOnline==0) {return false;}
    if (window.innerWidth < 451) {document.getElementById("Zsmenu").style.width = "200px";lhnInviteWidth='200px;'}

    bLHNAutoInvite=AutoInvite;
	var url="<img style='position:absolute;top:-5000px;left:-5000px;' width='1' height='1' src='//www.livehelpnow.net/lhn/jsutil/showninvitationmessage.aspx?iplhnid=24.61.234.123|28729|"+Math.random()+"' />";

    document.getElementById("Zsleft").innerHTML = lhnmes+url;

    var stopAt = 250;
    stopAt = ((stopAt+310) > window.innerWidth) ? window.innerWidth-320 : stopAt;

	var lhnInviteEl = document.getElementById('Zsmenu');
			    var lhnInviteOptions = {
			        duration: 'fast'=='slow' ? 250*7 : 250*2
                , initProps: { left : lhnInviteWidth , top: '150px' , display: 'block' , 'z-index': '10000000' , position: 'fixed'}
		            , props: { left : stopAt , top: 150 }
		            , units: 'px'
		            , refreshRate: 10
		            , easing: LhnInvite.Animation.Easing.linear
			    };
			    LhnInvite.tweenTo(lhnInviteEl.style, lhnInviteOptions);
	
		if (Zmutechime != '1')
		{
			if (navigator.userAgent.toLowerCase().indexOf('msie')>0)
			{
			var body = document.getElementsByTagName("body");
			var divE = document.createElement('bgsound');
			divE.id = "LHNSound";
			divE.style.position = "absolute";
			divE.style.left = "0px";
			divE.style.top = "0px";
			divE.hidden = "true";
			divE.src=lhnJsHost + 'www.livehelpnow.net/lhn/sounds/beep0.wav';
			divE.autostart="true";
			divE.loop="0";
			body[0].appendChild(divE);
			setTimeout("document.getElementsByTagName('body')[0].removeChild(document.getElementById('LHNSound'))", 2000);
			}
			else
			{
				var body = document.getElementsByTagName("body");
                var divE = document.createElement('audio');
                divE.setAttribute("controls",'');
                divE.setAttribute("autoplay",'');
                divE.id = "zaBellSound";
				divE.style.position = "absolute";
				divE.style.left = "-300px";
				divE.style.top = "-300px";
				divE.style.width = "0";
				divE.style.height = "0";
				divE.visible = "false";

                var divESource = document.createElement('source');
                divESource.src=lhnJsHost + 'www.livehelpnow.net/lhn/sounds/beep0.wav';
                divESource.type="audio/wav";
                divE.appendChild(divESource);

                body[0].appendChild(divE);

                setTimeout("document.getElementsByTagName('body')[0].removeChild(document.getElementById('zaBellSound'))", 2000);
			}
		}
       if(typeof(_gaq) != 'undefined' && _gaq){
          if (AutoInvite==1) {
				    _gaq.push(['_trackEvent', 'LiveHelpNow', 'Automatic chat invitation shown', '',0,1]);
           } else {
            _gaq.push(['_trackEvent', 'LiveHelpNow', 'Proactive chat invitation shown', '',0,1]);
           }
			  }
         if(typeof(ga) != 'undefined' && ga){
                if (AutoInvite==1) {
				             ga('send', 'event', 'LiveHelpNow', 'Automatic chat invitation shown','',{nonInteraction: true});
                } else {
                     ga('send', 'event', 'LiveHelpNow', 'Proactive chat invitation shown','',{nonInteraction: true});
                }
			        }

}

var lhnWin;
function OpenLHNChat()
{
if(typeof CustomOpenLHNChat == 'function') { 
CustomOpenLHNChat();
if (document.getElementById('Zsmenu') ){ document.getElementById('Zsmenu').style.display="none";}

return false;
}

if (typeof lhnWin !== 'undefined' && lhnWin){
if (!lhnWin.closed){
    lhnWin.blur();
    setTimeout(lhnWin.focus(), 10);
    return false;
    }
}
if (bLHNAutoInvite==0){
    Invitation();
    return false;
    }

var wleft = (screen.width - 500-32) / 2;
var wtop = (screen.height - 500-96) / 2;
var sScrollbars=(bLHNOnline==0)?"yes":"no";
var pcv='';
if (typeof lhnPreChatValues !== 'undefined'){
pcv=JSON.stringify(lhnPreChatValues);
}
	if (document.location.protocol=='https:' || (typeof lhnJsHost !='undefined' && lhnJsHost == "https://"))
	{
		lhnWin=window.open('https://www.livehelpnow.net/lhn/livechatvisitor.aspx?zzwindow=' + lhnWindowN + '&lhnid=' + 28729 + '&d=' + 34549+'&pcv=' + pcv + '&custom1=' + lhnCustom1 + '&custom2=' + lhnCustom2 + '&custom3=' + lhnCustom3,'','left=' + wleft + ',top=' + wtop + ',width=500,height=500,toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=' + sScrollbars + ',copyhistory=no,resizable=yes');
	}
	else
	{
		lhnWin=window.open('http://www.livehelpnow.net/lhn/livechatvisitor.aspx?zzwindow=' + lhnWindowN + '&lhnid=' + 28729 + '&d=' + 34549+'&pcv=' + pcv + '&custom1=' + lhnCustom1 + '&custom2=' + lhnCustom2 + '&custom3=' + lhnCustom3,'','left=' + wleft + ',top=' + wtop + ',width=500,height=500,toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=' + sScrollbars + ',copyhistory=no,resizable=yes');
	}

    if (document.getElementById('Zsmenu') ){ document.getElementById('Zsmenu').style.display="none";}
    if(typeof(_gaq) != 'undefined' && _gaq){
        _gaq.push(['_trackEvent', 'LiveHelpNow', 'Chat button clicked', '']);
    }
    if(typeof(ga) != 'undefined' && ga){
        ga('send', 'event', 'LiveHelpNow', 'Chat button clicked');   
    }

}
function Invitation()
{
var wleft = (screen.width - 500-32) / 2;
var wtop = (screen.height - 500-96) / 2;
	if (document.location.protocol=='https:')
	{
		window.open('https://www.livehelpnow.net/lhn/livechat.aspx?fullname=Visitor&email=unknown_email@livehelpnow.com&lhnmes=lhn&zzwindow=' + lhnWindowN + '&lhnid=' + 28729,'lhnchat','left=' + wleft + ',top=' + wtop + ',width=500,height=500,toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=no,copyhistory=no,resizable=yes');
	}
	else
	{
	    window.open('http://www.livehelpnow.net/lhn/livechat.aspx?fullname=Visitor&email=unknown_email@livehelpnow.net&lhnmes=lhn&zzwindow=' + lhnWindowN + '&lhnid=' + 28729,'lhnchat','left=' + wleft + ',top=' + wtop + ',width=500,height=500,toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=no,copyhistory=no,resizable=yes');
	}
   
    if (document.getElementById('Zsmenu') ){ document.getElementById('Zsmenu').style.display="none";}
}
//width="' + lhnButtonWidth + '" height="' + lhnButtonHeight + '"
var lhnDisplayStyle = ((lhnButtonN == '-1') ? "style=\"display:none\" " : ""); 
//document.getElementById("lhnChatButton").innerHTML='<a href="#" ' + lhnDisplayStyle +'onclick="OpenLHNChat();return false;"><img alt="Live help" id="lhnchatimg" border="0" nocache src="' + lhnJsHost + 'www.livehelpnow.net/lhn/functions/imageserver.ashx?lhnid=' + lhnAccountN + '&java=' + lhnjava + '&zimg=' + lhnButtonN + '&sres=' + lhnsRes + '&sdepth=' + lhnsDepth + '&custom1=' + lhnCustom1 + '&custom2=' + lhnCustom2 + '&custom3=' + lhnCustom3 + '&t=' + lhnTrack + '&d=' + lhnDepartmentN +'&rnd=' + lhnrand_no + '&ck=' + navigator.cookieEnabled + '&referrer=' + lhnreferrer + '&pagetitle=' + lhnpagetitle + '&pageurl=' + lhnsPath + '"></a>';

var LHNimg = new Image();
LHNimg.onload = function() {
    document.getElementById("lhnChatButton").innerHTML='<a href="#" ' + lhnDisplayStyle +' onclick="OpenLHNChat();return false;" id="aLHNBTN"></a>';
    document.getElementById("aLHNBTN").appendChild(LHNimg);
    if (typeof window.LHN_button_onLoad == "function") { // && typeof lhnHPPanel == "undefined") {
         window.LHN_button_onLoad();
    }
};
LHNimg.id = "lhnchatimg";
LHNimg.border = "0";
LHNimg.alt="Live help";
LHNimg.src = lhnJsHost + 'www.livehelpnow.net/lhn/functions/imageserver.ashx?lhnid=' + lhnAccountN + '&java=' + lhnjava + '&zimg=' + lhnButtonN + '&sres=' + lhnsRes + '&sdepth=' + lhnsDepth + '&custom1=' + lhnCustom1 + '&custom2=' + lhnCustom2 + '&custom3=' + lhnCustom3 + '&t=' + lhnTrack + '&d=' + lhnDepartmentN +'&rnd=' + lhnrand_no + '&ck=' + navigator.cookieEnabled +'&referrer=' + lhnreferrer + '&pagetitle=' + lhnpagetitle + '&pageurl=' + lhnsPath;
