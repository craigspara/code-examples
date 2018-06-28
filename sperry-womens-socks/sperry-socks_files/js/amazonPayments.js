(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(document).ready(function() {

	var progress = require('./progress'),
		tooltip = require('./tooltip'),
		validator = require('./validator'),
		util = require('./util');
	
	var shippingMethods;
	
	var amazonPaymentsObject = {  
		
		/*
		*   This function is used to initialize address book widget 
		*/
		initializeAddressBookWidget : function() {
			var refID = "";
			new OffAmazonPayments.Widgets.AddressBook({
				  sellerId: app.amazonSitePreferences.AMAZON_MERCHANT_ID  || '',
				  onOrderReferenceCreate: function(orderReference) {
				          refID = orderReference.getAmazonOrderReferenceId();
				          // store order reference id for back-end
				          $('[name$="_orderReferenceID"]').val(refID);
				          
				          // keep order reference id at session 
				          $.ajax ({
				        	  url: app.urls.setOrderReferenceID,
				        	  method : "POST",
				        	  data: {
				        		  orderID: refID
				        	  },
				        	  success: function(data) {
			        			  console.log("Order reference id stored successfuly");
				        	  },
				        	  error: function() {
				        		  console.error("There was a problem with storing the refference id.");
				        	  }
				          });
				          
				          console.log("referenceID " + refID);  
				  },
				  onAddressSelect: function(orderReference) {
					    // disable continue button
					    $('#apShippingContinue, #secondary .minisummary-continuecheckout').attr('disabled', 'disabled');
					    // get order reference details call
				  		$.ajax ({
				  			url : app.urls.getOrderReferenceDetails + "?orderReferenceID=" + refID,
				  			method : "GET",
				  			success : function(data) {
				  				if(app.resources.AMAZON_ALLOWED_SHIPPING_COUNTRIES.length == 0 || app.resources.AMAZON_ALLOWED_SHIPPING_COUNTRIES.indexOf(data.countryCode) >= 0) {
				  					$('.checkout-shipping .country-error').text('');
				  					amazonPaymentsObject.updateShippingMethodsList(data);
				  				} else {
				  					$('.checkout-shipping .country-error').text(app.resources.AMAZON_INVALID_SHIPPING_ADDRESS);
				  				}
				  			}
				  		});
				  		
				  },
				  design: {
				     designMode: this.getDesignMode()
				  },
				  onError: function(error) {
					 // display error message
					 alert(error.getErrorMessage());
				  }
				}).bind("addressBookWidgetDiv");
		},
		
		/*
		 * Wallet widget for billing page.
		 * Widget content id: walletWidgetDiv
		 */
		initializeWalletWidget: function(){
			
			// disable continue button
			$('[name$="_save"], #secondary .minisummary-continuecheckout').attr('disabled', 'disabled');
			
			new OffAmazonPayments.Widgets.Wallet({

				sellerId: app.amazonSitePreferences.AMAZON_MERCHANT_ID || '',

				onPaymentSelect: function(orderReference) {
					 // enable continue button after payment selection
					 $('[name$="_save"], #secondary .minisummary-continuecheckout').removeAttr('disabled');

				},

				design: {
					designMode: this.getDesignMode()
				},

				onError: function(error) {
					// display error message  
					alert(error.getErrorMessage());
				}

			}).bind("walletWidgetDiv"); 
			
		},
		
		/*
		 * This function is used to determine the design mode for the amazon widgets. 
		 */
		getDesignMode: function() {
			
			// check if it's a touch device with a small screen
			if (('ontouchstart' in window) && $(window).width() < 600) {
				return 'smartphoneCollapsible';				
			}
			
			return 'responsive';
		},
		
		/*
		 * AmazonPayButton.
		 * Content id: AmazonPayButton
		 */
		initializeAmazonPayButton: function($btn){
			var authRequest;
			var data = {};
			data.merchantId = app.amazonSitePreferences.AMAZON_MERCHANT_ID;
			data.scope = app.amazonSitePreferences.AMAZON_SCOPE;
			var btnData = $btn.data();
			var id = $btn.attr('id');
			
			// attach a random generated id
			if ( ! id) {
				id = amazonPaymentsObject.getUniqueId();
				$btn.attr('id', id);
			}
			
			if (btnData.button == 'payButton'){
				data.type =  util.isMobile() ? app.amazonSitePreferences.MOBILE_AMAZON_PAY_BUTTON_TYPE : app.amazonSitePreferences.AMAZON_PAY_BUTTON_TYPE;
				data.color = app.amazonSitePreferences.AMAZON_PAY_BUTTON_COLOR;
				data.size = util.isMobile() ? app.amazonSitePreferences.MOBILE_AMAZON_PAY_BUTTON_SIZE : app.amazonSitePreferences.AMAZON_PAY_BUTTON_SIZE;
				data.redirect = app.amazonSitePreferences.AMAZON_PAY_REDIRECT_URL;				
			} else {
				// login button functionality
				data.type = app.amazonSitePreferences.AMAZON_LOGIN_BUTTON_TYPE;
				data.color = app.amazonSitePreferences.AMAZON_LOGIN_BUTTON_COLOR;
				data.size = app.amazonSitePreferences.AMAZON_LOGIN_BUTTON_SIZE;
				data.redirect = app.amazonSitePreferences.AMAZON_LOGIN_REDIRECT_URL;
			}
			
			if (btnData.page == 'shipping') {
				data.redirect += '?shipping=true';
			}
			
			OffAmazonPayments.Button(id, data.merchantId, {
			    type:  data.type,
			    color: data.color,
			    size:  data.size,
			    useAmazonAddressBook: true,
			    authorization: function() {
			      var loginOptions = {scope: data.scope};
			      authRequest = amazon.Login.authorize(loginOptions, data.redirect);
			    },
			    
			    onError: function(error) {
			      // Write your custom error handling
			    }
			    
			});
			  
		},
		
		/**
		 * Adds the event listener on the logout button.
		 */
		initLogout: function() {

			var $logoutBtn = $('.js-logout');
			
			if ((typeof amazon != 'undefined') && amazon.Login) {
				
				if($logoutBtn.length) {				
					$logoutBtn.on('click', function() {
						amazon.Login.logout();
					});
				}
				// if an element on the page has this attribute
				// logout the user from the amazon account
				if ($('[data-amz-logout]').length) {
					amazon.Login.logout();
				}
			}
		},
		
		/*
		 * This function is used to update shipping methods list with appropriate shipping methods
		 */
		updateShippingMethodsList : function(params) {
			var $shippingMethodList = $('#shipping-method-list');
			if (!$shippingMethodList || $shippingMethodList.length === 0) { return; }
			var url = util.appendParamsToUrl(app.urls.shippingMethodsJSON, params);

			$.ajax({
				dataType: 'json',
				url: url,
			})
			.done(function (data) {
				if (!data) {
					window.alert('Couldn\'t get list of applicable shipping methods.');
					return false;
				}
				
				// We need to update the UI.  The list has changed.
				// Cache the array of returned shipping methods.
				shippingMethods = data;
				// indicate progress
				progress.show($shippingMethodList);
				// load the shipping method form
				var smlUrl =  util.appendParamsToUrl(app.urls.shippingMethodsList, params); 
				$shippingMethodList.load(smlUrl, function () {
					$shippingMethodList.fadeIn('fast');
					// rebind the radio buttons onclick function to a handler.
					$shippingMethodList.find('[name$="_shippingMethodID"]').click(function () {
						amazonPaymentsObject.selectShippingMethod($(this).val(), params);
					});
					
					// update the summary
					amazonPaymentsObject.updateSummary();
					progress.hide();
					$('#apShippingContinue, #secondary .minisummary-continuecheckout').removeAttr('disabled');
					tooltip.init();
					//if nothing is selected in the shipping methods select the first one
					if ($shippingMethodList.find('.input-radio:checked').length === 0) {
						$shippingMethodList.find('.input-radio:first').attr('checked', true);
					}
				});
			});
			
		},
		
		/*
		 * This function is used to select active shipping method 
		*/
		selectShippingMethod : function(shippingMethodID, params) {
			// nothing entered
			if (!shippingMethodID) {
				return;
			}
			params.shippingMethodID = shippingMethodID;
			// attempt to set shipping method
			var url = util.appendParamsToUrl(app.urls.selectShippingMethodsList, params); 
				$.ajax({
					dataType: 'json',
					url: url,
				})
				.done(function (data) {
					
					amazonPaymentsObject.updateSummary();
					
					if (!data || !data.shippingMethodID) {
						window.alert('Couldn\'t select shipping method.');
						return false;
					}
					// display promotion in UI and update the summary section,
					// if some promotions were applied
					$('.shippingpromotions').empty();
				});
				
			;
		 },
		 
		 /*
		  * This function is used to update summary section 
		 */
		 updateSummary : function() {
			var $summary = $('#secondary.summary');
			// indicate progress
			progress.show($summary);
			// load the updated summary area
			$summary.load(app.urls.summaryRefreshURL, function () {
				
				
				// hide edit shipping method link
				$summary.fadeIn('fast');
				$summary.find('.checkout-mini-cart .minishipment .header a').hide();
				$summary.find('.order-totals-table .order-shipping .label a').hide();
			}); 
		 },
		
		/**
		 * This function will generate a unique id
		 */
		getUniqueId: function () {
		  // Math.random should be unique because of its seeding algorithm.
		  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
		  // after the decimal.
		  return 'random-' + Math.random().toString(36).substr(2, 9);
		},
		
		/*
		 * this function is used to init Amazon Payments popup
		 */
		initPopup : function() {
			$(document).on("click", "a.amazonpopup", function(e) {
				e.preventDefault();
				window.open($(this).attr('href'), '', 'width=626,height=436');
				return false;
			});
		},
		
		/*
		 * This function will be used to scroll the page to the wallet widget if
		 * it has the data-scroll-to-element attribute set.
		 */
		scrollToWidget: function() {
			var $el = $('[data-scroll-to-element]').last();
			var offset;
			if ($el.length) {
				var offset = $el.offset();
				$("html, body").animate({ scrollTop: offset.top + "px" });
			}
			
		},
		
		/*
		  * This function is used initialize necessary functions  
		*/
		init : function() {
			var $amazonBtns = $('.js-amazon-button');

			if($('#addressBookWidgetDiv').length > 0){
				amazonPaymentsObject.initializeAddressBookWidget();
			}
			
			if($('#walletWidgetDiv').length > 0){
				amazonPaymentsObject.initializeWalletWidget();
			}
			
			// remove disable attribute when the gift card code met the balance.
			if($('.checkout-billing .gift-cert-used').length > 0){
				$('[name$="_save"], #secondary .minisummary-continuecheckout').removeAttr('disabled');
			}
			
			if($amazonBtns.length > 0){
				$amazonBtns.each(function(i) {
					amazonPaymentsObject.initializeAmazonPayButton( $(this) );
				});
				amazonPaymentsObject.initPopup();
			}
			
			
			amazonPaymentsObject.initLogout();
			amazonPaymentsObject.scrollToWidget();
		}
	
	};
	
	amazonPaymentsObject.init();
	
});
},{"./progress":2,"./tooltip":3,"./util":4,"./validator":5}],2:[function(require,module,exports){
'use strict';

var $loader;

/**
* @function
* @description Shows an AJAX-loader on top of a given container
* @param {Element} container The Element on top of which the AJAX-Loader will be shown
*/
var show = function (container) {
   var target = (!container || $(container).length === 0) ? $('body') : $(container);
   $loader = $loader || $('.loader');

   if ($loader.length === 0) {
       $loader = $('<div/>').addClass('loader')
           .append($('<div/>').addClass('loader-indicator'), $('<div/>').addClass('loader-bg'));
   }
   return $loader.appendTo(target).show();
};

/**
 * @function
 * @description Hides an AJAX-loader
 */
var hide = function () {
	if ($loader) {
		$loader.hide();
	}
};

exports.show = show;
exports.hide = hide;

},{}],3:[function(require,module,exports){
'use strict';

/**
 * @function
 * @description Initializes the tooltip-content and layout
 */
exports.init = function () {
	$('.tooltip').tooltip({
		track: true,
		showURL: false,
		bodyHandler: function () {
			// add a data attribute of data-layout="some-class" to your tooltip-content container if you want a custom class
			var tooltipClass = '';
			if ($(this).find('.tooltip-content').data('layout')) {
				tooltipClass = ' class="' + $(this).find('.tooltip-content').data('layout') + '" ';
			}
		return '<div ' + tooltipClass + '>' + $(this).find('.tooltip-content').html() + '</div>';
		}
	});
};

},{}],4:[function(require,module,exports){
/* global Countries */

'use strict';

var util = {
	/**
	 * @function
	 * @description appends the parameter with the given name and value to the given url and returns the changed url
	 * @param {String} url the url to which the parameter will be added
	 * @param {String} name the name of the parameter
	 * @param {String} value the value of the parameter
	 */
	appendParamToURL: function (url, name, value) {
		// quit if the param already exists
		if (url.indexOf(name + '=') !== -1) {
			return url;
		}
		var separator = url.indexOf('?') !== -1 ? '&' : '?';
		return url + separator + name + '=' + encodeURIComponent(value);
	},
	/**
	 * @function
	 * @description
	 * @param {String}
	 * @param {String}
	 */
	elementInViewport: function (el, offsetToTop) {
		var top = el.offsetTop,
			left = el.offsetLeft,
			width = el.offsetWidth,
			height = el.offsetHeight;

		while (el.offsetParent) {
			el = el.offsetParent;
			top += el.offsetTop;
			left += el.offsetLeft;
		}

		if (typeof(offsetToTop) !== 'undefined') {
			top -= offsetToTop;
		}

		if (window.pageXOffset !== null) {
			return (
				top < (window.pageYOffset + window.innerHeight) &&
				left < (window.pageXOffset + window.innerWidth) &&
				(top + height) > window.pageYOffset &&
				(left + width) > window.pageXOffset
			);
		}

		if (document.compatMode === 'CSS1Compat') {
			return (
				top < (window.document.documentElement.scrollTop + window.document.documentElement.clientHeight) &&
				left < (window.document.documentElement.scrollLeft + window.document.documentElement.clientWidth) &&
				(top + height) > window.document.documentElement.scrollTop &&
				(left + width) > window.document.documentElement.scrollLeft
			);
		}
	},
	/**
	 * @function
	 * @description appends the parameters to the given url and returns the changed url
	 * @param {String} url the url to which the parameters will be added
	 * @param {String} params a JSON string with the parameters
	 */
	appendParamsToUrl: function (url, params) {
		var uri = this.getUri(url),
			includeHash = arguments.length < 3 ? false : arguments[2];

		var qsParams = $.extend(uri.queryParams, params);
		var result = uri.path + '?' + $.param(qsParams);
		if (includeHash) {
			result += uri.hash;
		}
		if (result.indexOf('http') < 0 && result.charAt(0) !== '/') {
			result = '/' + result;
		}
		return result;
	},

	/**
	 * @function
	 * @description Appends the parameter 'format=ajax' to a given path
	 * @param {String} path the relative path
	 */
	ajaxUrl: function (path) {
		return this.appendParamToURL(path, 'format', 'ajax');
	},

	/**
	 * @function
	 * @description
	 * @param {String} url
	 */
	toAbsoluteUrl: function (url) {
		if (url.indexOf('http') !== 0 && url.charAt(0) !== '/') {
			url = '/' + url;
		}
		return url;
	},
	/**
	 * @function
	 * @description Loads css dynamically from given urls
	 * @param {Array} urls Array of urls from which css will be dynamically loaded.
	 */
	loadDynamicCss: function (urls) {
		var i, len = urls.length;
		for (i = 0; i < len; i++) {
			this.loadedCssFiles.push(this.loadCssFile(urls[i]));
		}
	},

	/**
	 * @function
	 * @description Loads css file dynamically from given url
	 * @param {String} url The url from which css file will be dynamically loaded.
	 */
	loadCssFile: function (url) {
		return $('<link/>').appendTo($('head')).attr({
			type: 'text/css',
			rel: 'stylesheet'
		}).attr('href', url); // for i.e. <9, href must be added after link has been appended to head
	},
	// array to keep track of the dynamically loaded CSS files
	loadedCssFiles: [],

	/**
	 * @function
	 * @description Removes all css files which were dynamically loaded
	 */
	clearDynamicCss: function () {
		var i = this.loadedCssFiles.length;
		while (0 > i--) {
			$(this.loadedCssFiles[i]).remove();
		}
		this.loadedCssFiles = [];
	},
	/**
	 * @function
	 * @description Extracts all parameters from a given query string into an object
	 * @param {String} qs The query string from which the parameters will be extracted
	 */
	getQueryStringParams: function (qs) {
		if (!qs || qs.length === 0) { return {}; }
		var params = {},
			unescapedQS = decodeURIComponent(qs);
		// Use the String::replace method to iterate over each
		// name-value pair in the string.
		unescapedQS.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'),
			function ($0, $1, $2, $3) {
				params[$1] = $3;
			}
		);
		return params;
	},
	/**
	 * @function
	 * @description Returns an URI-Object from a given element with the following properties:
	 * - protocol
	 * - host
	 * - hostname
	 * - port
	 * - path
	 * - query
	 * - queryParams
	 * - hash
	 * - url
	 * - urlWithQuery
	 * @param {Object} o The HTML-Element
	 */
	getUri: function (o) {
		var a;
		if (o.tagName && $(o).attr('href')) {
			a = o;
		} else if (typeof o === 'string') {
			a = document.createElement('a');
			a.href = o;
		} else {
			return null;
		}
		return {
			protocol: a.protocol, //http:
			host: a.host, //www.myexample.com
			hostname: a.hostname, //www.myexample.com'
			port: a.port, //:80
			path: a.pathname, // /sub1/sub2
			query: a.search, // ?param1=val1&param2=val2
			queryParams: a.search.length > 1 ? this.getQueryStringParams(a.search.substr(1)) : {},
			hash: a.hash, // #OU812,5150
			url: a.protocol + '//' + a.host + a.pathname,
			urlWithQuery: a.protocol + '//' + a.host + a.port + a.pathname + a.search
		};
	},

	fillAddressFields: function (address, $form) {
		for (var field in address) {
			if (field === 'ID' || field === 'UUID' || field === 'key') {
				continue;
			}
			// if the key in address object ends with 'Code', remove that suffix
			// keys that ends with 'Code' are postalCode, stateCode and countryCode
			$form.find('[name$="' + field.replace('Code', '') + '"]').val(address[field]);
			// update the state fields
			if (field === 'countryCode') {
				$form.find('[name$="country"]').trigger('change');
				// retrigger state selection after country has changed
				// this results in duplication of the state code, but is a necessary evil
				// for now because sometimes countryCode comes after stateCode
				$form.find('[name$="state"]').val(address.stateCode);
			}
		}
	},
	/**
	 * @function
	 * @description Updates the states options to a given country
	 * @param {String} countrySelect The selected country
	 */
	updateStateOptions: function (form) {
		var $form = $(form),
			$country = $form.find('select[id$="_country"]'),
			country = Countries[$country.val()];
		if ($country.length === 0 || !country) {
			return;
		}
		var arrHtml = [],
			$stateField = $country.data('stateField') ? $country.data('stateField') : $form.find('select[name$="_state"]'),
			$postalField = $country.data('postalField') ? $country.data('postalField') : $form.find('input[name$="_postal"]'),
			$stateLabel = ($stateField.length > 0) ? $form.find('label[for="' + $stateField[0].id + '"] span').not('.required-indicator') : undefined,
			$postalLabel = ($postalField.length > 0) ? $form.find('label[for="' + $postalField[0].id + '"] span').not('.required-indicator') : undefined,
			prevStateValue = $stateField.val();
		// set the label text
		if ($postalLabel) {
			$postalLabel.html(country.postalLabel);
		}
		if ($stateLabel) {
			$stateLabel.html(country.regionLabel);
		} else {
			return;
		}
		var s;
		for (s in country.regions) {
			arrHtml.push('<option value="' + s + '">' + country.regions[s] + '</option>');
		}
		// clone the empty option item and add to stateSelect
		var o1 = $stateField.children().first().clone();
		$stateField.html(arrHtml.join('')).removeAttr('disabled').children().first().before(o1);
		// if a state was selected previously, save that selection
		if (prevStateValue && $.inArray(prevStateValue, country.regions)) {
			$stateField.val(prevStateValue);
		} else {
			$stateField[0].selectedIndex = 0;
		}
	},
	/**
	 * @function
	 * @description Updates the number of the remaining character
	 * based on the character limit in a text area
	 */
	limitCharacters: function () {
		$('form').find('textarea[data-character-limit]').each(function () {
			var characterLimit = $(this).data('character-limit');
			var charCountHtml = String.format(app.resources.CHAR_LIMIT_MSG,
				'<span class="char-remain-count">' + characterLimit + '</span>',
				'<span class="char-allowed-count">' + characterLimit + '</span>');
			var charCountContainer = $(this).next('div.char-count');
			if (charCountContainer.length === 0) {
				charCountContainer = $('<div class="char-count"/>').insertAfter($(this));
			}
			charCountContainer.html(charCountHtml);
			// trigger the keydown event so that any existing character data is calculated
			$(this).change();
		});
	},
	/**
	 * @function
	 * @description Binds the onclick-event to a delete button on a given container,
	 * which opens a confirmation box with a given message
	 * @param {String} container The name of element to which the function will be bind
	 * @param {String} message The message the will be shown upon a click
	 */
	setDeleteConfirmation: function (container, message) {
		$(container).on('click', '.delete', function () {
			return window.confirm(message);
		});
	},
	/**
	 * @function
	 * @description Scrolls a browser window to a given x point
	 * @param {String} The x coordinate
	 */
	scrollBrowser: function (xLocation) {
		$('html, body').animate({scrollTop: xLocation}, 500);
	},

	isMobile: function () {
		var mobileAgentHash = ['mobile', 'tablet', 'phone', 'ipad', 'ipod', 'android', 'blackberry', 'windows ce', 'opera mini', 'palm'];
		var	idx = 0;
		var isMobile = false;
		var userAgent = (navigator.userAgent).toLowerCase();

		while (mobileAgentHash[idx] && !isMobile) {
			isMobile = (userAgent.indexOf(mobileAgentHash[idx]) >= 0);
			idx++;
		}
		return isMobile;
	}
};

module.exports = util;

},{}],5:[function(require,module,exports){
'use strict';

var naPhone = /^\(?([2-9][0-8][0-9])\)?[\-\. ]?([2-9][0-9]{2})[\-\. ]?([0-9]{4})(\s*x[0-9]+)?$/,
	regex = {
		phone: {
			us: naPhone,
			ca: naPhone
		},
		postal: {
			us: /^\d{5}(-\d{4})?$/,
			ca: /^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/,
			gb: /^GIR?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|[A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))|[0-9][A-HJKS-UW])?[0-9][ABD-HJLNP-UW-Z]{2}$/
		},
		email: /^[\w.%+\-]+@[\w.\-]+\.[\w]{2,6}$/,
		notCC: /^(?!(([0-9 -]){13,19})).*$/
	},
	settings = {
		// global form validator settings
		errorClass: 'error',
		errorElement: 'span',
		onkeyup: false,
		onfocusout: function (element) {
			if (!this.checkable(element)) {
				this.element(element);
			}
		}
	};
/**
 * @function
 * @description Validates a given phone number against the countries phone regex
 * @param {String} value The phone number which will be validated
 * @param {String} el The input field
 */
var validatePhone = function (value, el) {
	var country = $(el).closest('form').find('.country');
	if (country.length === 0 || country.val().length === 0 || !regex.phone[country.val().toLowerCase()]) {
		return true;
	}

	var rgx = regex.phone[country.val().toLowerCase()];
	var isOptional = this.optional(el);
	var isValid = rgx.test($.trim(value));

	return isOptional || isValid;
};
/**
 * @function
 * @description Validates a given email
 * @param {String} value The email which will be validated
 * @param {String} el The input field
 */
var validateEmail = function (value, el) {
	var isOptional = this.optional(el);
	var isValid = regex.email.test($.trim(value));
	return isOptional || isValid;
};

/**
 * @function
 * @description Validates that a credit card owner is not a Credit card number
 * @param {String} value The owner field which will be validated
 * @param {String} el The input field
 */
var validateOwner = function (value) {
	var isValid = regex.notCC.test($.trim(value));
	return isValid;
};

/**
 * Add phone validation method to jQuery validation plugin.
 * Text fields must have 'phone' css class to be validated as phone
 */
$.validator.addMethod('phone', validatePhone, app.resources.INVALID_PHONE);

/**
 * Add email validation method to jQuery validation plugin.
 * Text fields must have 'email' css class to be validated as email
 */
$.validator.addMethod('email', validateEmail, app.resources.INVALID_EMAIL);

/**
 * Add CCOwner validation method to jQuery validation plugin.
 * Text fields must have 'owner' css class to be validated as not a credit card
 */
$.validator.addMethod('owner', validateOwner, app.resources.INVALID_OWNER);

/**
 * Add gift cert amount validation method to jQuery validation plugin.
 * Text fields must have 'gift-cert-amont' css class to be validated
 */
$.validator.addMethod('gift-cert-amount', function (value, el) {
	var isOptional = this.optional(el);
	var isValid = (!isNaN(value)) && (parseFloat(value) >= 5) && (parseFloat(value) <= 5000);
	return isOptional || isValid;
}, app.resources.GIFT_CERT_AMOUNT_INVALID);

/**
 * Add positive number validation method to jQuery validation plugin.
 * Text fields must have 'positivenumber' css class to be validated as positivenumber
 */
$.validator.addMethod('positivenumber', function (value) {
	if ($.trim(value).length === 0) { return true; }
	return (!isNaN(value) && Number(value) >= 0);
}, ''); // '' should be replaced with error message if needed

var validator = {
	regex: regex,
	settings: settings,
	init: function () {
		var self = this;
		$('form:not(.suppress)').each(function () {
			$(this).validate(self.settings);
		});
	},
	initForm: function (f) {
		$(f).validate(this.settings);
	}
};

module.exports = validator;

},{}]},{},[1]);
