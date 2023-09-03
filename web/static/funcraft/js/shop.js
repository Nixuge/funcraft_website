function updateDedipass(){for(var t=0;t<dedipassListener.frames.length;t++){var e=dedipassListener.frames[t];console.log(e.id),document.getElementById(e.id)||(dedipassListener.frames.splice(t,1),t--,console.log("Dedipass frame removed."))}$(".dedipass-frame").each(function(){initDedipass(this)}),0===dedipassListener.frames.length&&unregisterDedipassListener()}var $shop=$("#shop"),$shopInfo=$("#shop-info"),historyAPI=window.history||history,historyUpdateUrl;if(historyAPI&&historyAPI.pushState){console.log("History API is supported ! (Emulated: "+historyAPI.emulate+")");var getCurrentState=function(){return{shop:$shop.html(),shopInfoHidden:$shopInfo.hasClass("hidden")}};historyAPI.replaceState(getCurrentState(),null,null),historyUpdateUrl=function(t,e){try{e===!0?historyAPI.replaceState(getCurrentState(),null,t):historyAPI.pushState(getCurrentState(),null,t)}catch(o){console.error(o)}},$(window).on("popstate",function(t){var e=t.originalEvent.state;$shop.html(e.shop),e.shopInfoHidden?$shopInfo.addClass("hidden"):$shopInfo.removeClass("hidden")})}else console.log("History API is not supported."),historyUpdateUrl=function(){};var $shopProgressBar=$("#shop-progressbar",$shop).find(".progress-bar"),ajaxShop=function(t,e,o){console.log("Load page ("+t+"): "+e);var s=$shop.find(".shop-link").add($shop.find("button")).not(".disabled");s.addClass("disabled").attr("disabled","disabled"),$shopProgressBar.addClass("active"),$.ajax({method:t,url:e,data:o,dataType:"html",success:function(t,o,s){var n=$("<div>").html(t);updateShopContainer(n),FunJs.init(n),$(".tooltip").remove(),$("#shop-progress",$shop).replaceWith(n.find("#shop-progress")),$("#shop-step",$shop).replaceWith(n.find("#shop-step")),$shopProgressBar.css("width",n.find("#shop-progressbar").find(".progress-bar").css("width"));var i=n.find("#shop-data").data("shop");i.step>1?$shopInfo.addClass("hidden"):$shopInfo.removeClass("hidden"),$("#shop-step",$shop).find("[autofocus]").focus();var a=s.getResponseHeader("X-Location");historyUpdateUrl(a||e),updateDedipass(),n.children("script").appendTo($("body"))},error:function(t,e,o){var s=t.status;console.error("Error during ajax request, response code: "+s+"/"+e),console.error(o);var n;n=0===s?"Impossible de communiquer avec le serveur. Vérifiez votre connexion internet.":"Une erreur inconnue est survenue: #"+s+" / "+e,BootstrapDialog.show({type:BootstrapDialog.TYPE_DANGER,title:"Erreur",message:n,buttons:[{label:"Ok",action:function(t){t.close()}}]})}}).always(function(){s.removeClass("disabled").removeAttr("disabled"),$shopProgressBar.removeClass("active")})},$shopObjects,updateShopContainer=function(t){$shopObjects=$("#shop-objects",t).find(".object"),$shopObjects.find("a").click(function(t){var e=$(this);$shopObjects.removeClass("selected"),e.parent().addClass("selected");var o=e.data("objectdisplay");$("#shop-objdetails").removeClass("hidden"),$("#shop-objdetails-favorstotal1").text(o.amount.favors_total),$("#shop-objdetails-price1").text(o.amount.price),$("#shop-objdetails-price2").text(o.amount.price),$("#shop-objdetails-favors1").text(o.amount.favors),null===o.amount.bonus?($("#shop-objdetails-bonusrow1").addClass("hidden"),$("#shop-objdetails-bonusrow2").addClass("hidden")):($("#shop-objdetails-bonusrow1").removeClass("hidden"),$("#shop-objdetails-bonusrow2").removeClass("hidden"),$("#shop-objdetails-bonus1").text(o.amount.bonus),$("#shop-objdetails-bonus2").text(o.amount.favors_bonus),$("#shop-objdetails-economy").text(o.amount.bonus)),$("#shop-objdetails-total1").text(o.amount.favors_total),$("#shop-objdetails-total2").text(o.amount.favors_total),$("#shop-objdetails-delay").text(o.delay),$("#shop-objdetails-link").attr("href",o.link),historyUpdateUrl(e.attr("href"),!0),t.preventDefault()}),$(".shop-form",t).submit(function(t){var e=$(this),o=e.attr("action");ajaxShop("POST",o,e.serializeArray()),t.preventDefault()}),$(".shop-link",t).click(function(t){var e=$(this),o=e.attr("href");if("javascript:;"!=o){if(e.hasClass("disabled"))return void t.preventDefault();ajaxShop("GET",o),t.preventDefault()}}),$(".shop-box.disabled",t).click(function(t){BootstrapDialog.show({type:BootstrapDialog.TYPE_DANGER,title:"Erreur",message:"Ce mode de paiement n'est pas encore disponible. Nous vous conseillons d'utiliser le paiement par Carte Bancaire à la place.",buttons:[{label:"Ok",action:function(t){t.close()}}]}),t.preventDefault()})};updateShopContainer(document);var initDedipass=function(t){var e=$(t),o=e.data("dedipass-pubkey");if(o){var s=e.attr("id"),n=e.data("dedipass-params");e.removeAttr("data-dedipass-pubkey"),e.removeAttr("data-dedipass-params");var i=$("<iframe>");i.attr("id",s+"-iframe"),i.attr("src","https://api.dedipass.com/pay-2/#"+o+"&"+n),i.attr("style","width: 100%;border: 0 solid transparent;"),e.html(i),registerDedipassListener(document.getElementById(s+"-iframe"))}},dedipassListener={addEventMethod:null,removeEventMethod:null,eventName:null,registered:!1,frames:[]},registerDedipassListener=function(t){if(null===dedipassListener.addEventMethod&&("function"==typeof window.addEventListener?(dedipassListener.addEventMethod=window.addEventListener,dedipassListener.removeEventMethod=window.removeEventListener,dedipassListener.eventName="message"):(dedipassListener.addEventMethod=window.attachEvent,dedipassListener.removeEventMethod=window.detachEvent,dedipassListener.eventName="onmessage")),dedipassListener.registered===!1){console.log("Registering dedipass listener...");var e=-1;dedipassListener.registered=function(t){var o=dedipassListener.frames[dedipassListener.frames.length-1];"number"==typeof t.data?e!=t.data&&(e>640&&Math.abs(e-t.data)>640&&(console.log("Dedipass: Check visible"),setTimeout(function(){o.scrollIntoView(!0)},1)),e=t.data,o.style.height=t.data+"px"):"pleasegotop"===t.data&&o.scrollIntoView(!0)},dedipassListener.addEventMethod(dedipassListener.eventName,dedipassListener.registered,!1),console.log("Dedipass listener registered!")}dedipassListener.frames.push(t),console.log("Dedipass frame added.")},unregisterDedipassListener=function(){dedipassListener.registered!==!1&&(console.log("Unregistering dedipass listener..."),dedipassListener.removeEventMethod(dedipassListener.eventName,dedipassListener.registered,!1),dedipassListener.registered=!1,console.log("Dedipass listener unregistered!"))};updateDedipass(),function(t,e){"use strict";"undefined"!=typeof module&&module.exports?module.exports=e(require("jquery"),require("bootstrap")):"function"==typeof define&&define.amd?define("bootstrap-dialog",["jquery","bootstrap"],function(t){return e(t)}):t.BootstrapDialog=e(t.jQuery)}(this,function(t){"use strict";var e=t.fn.modal.Constructor,o=function(t,o){e.call(this,t,o)};o.getModalVersion=function(){var e=null;return e="undefined"==typeof t.fn.modal.Constructor.VERSION?"v3.1":/3\.2\.\d+/.test(t.fn.modal.Constructor.VERSION)?"v3.2":/3\.3\.[1,2]/.test(t.fn.modal.Constructor.VERSION)?"v3.3":"v3.3.4"},o.ORIGINAL_BODY_PADDING=parseInt(t("body").css("padding-right")||0,10),o.METHODS_TO_OVERRIDE={},o.METHODS_TO_OVERRIDE["v3.1"]={},o.METHODS_TO_OVERRIDE["v3.2"]={hide:function(e){if(e&&e.preventDefault(),e=t.Event("hide.bs.modal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()){this.isShown=!1;var o=this.getGlobalOpenedDialogs();0===o.length&&this.$body.removeClass("modal-open"),this.resetScrollbar(),this.escape(),t(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),t.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",t.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal()}}},o.METHODS_TO_OVERRIDE["v3.3"]={setScrollbar:function(){var t=o.ORIGINAL_BODY_PADDING;this.bodyIsOverflowing&&this.$body.css("padding-right",t+this.scrollbarWidth)},resetScrollbar:function(){var t=this.getGlobalOpenedDialogs();0===t.length&&this.$body.css("padding-right",o.ORIGINAL_BODY_PADDING)},hideModal:function(){this.$element.hide(),this.backdrop(t.proxy(function(){var t=this.getGlobalOpenedDialogs();0===t.length&&this.$body.removeClass("modal-open"),this.resetAdjustments(),this.resetScrollbar(),this.$element.trigger("hidden.bs.modal")},this))}},o.METHODS_TO_OVERRIDE["v3.3.4"]=t.extend({},o.METHODS_TO_OVERRIDE["v3.3"]),o.prototype={constructor:o,getGlobalOpenedDialogs:function(){var e=[];return t.each(s.dialogs,function(t,o){o.isRealized()&&o.isOpened()&&e.push(o)}),e}},o.prototype=t.extend(o.prototype,e.prototype,o.METHODS_TO_OVERRIDE[o.getModalVersion()]);var s=function(e){this.defaultOptions=t.extend(!0,{id:s.newGuid(),buttons:[],data:{},onshow:null,onshown:null,onhide:null,onhidden:null},s.defaultOptions),this.indexedButtons={},this.registeredButtonHotkeys={},this.draggableData={isMouseDown:!1,mouseOffset:{}},this.realized=!1,this.opened=!1,this.initOptions(e),this.holdThisInstance()};return s.BootstrapDialogModal=o,s.NAMESPACE="bootstrap-dialog",s.TYPE_DEFAULT="type-default",s.TYPE_INFO="type-info",s.TYPE_PRIMARY="type-primary",s.TYPE_SUCCESS="type-success",s.TYPE_WARNING="type-warning",s.TYPE_DANGER="type-danger",s.DEFAULT_TEXTS={},s.DEFAULT_TEXTS[s.TYPE_DEFAULT]="Information",s.DEFAULT_TEXTS[s.TYPE_INFO]="Information",s.DEFAULT_TEXTS[s.TYPE_PRIMARY]="Information",s.DEFAULT_TEXTS[s.TYPE_SUCCESS]="Success",s.DEFAULT_TEXTS[s.TYPE_WARNING]="Warning",s.DEFAULT_TEXTS[s.TYPE_DANGER]="Danger",s.DEFAULT_TEXTS.OK="OK",s.DEFAULT_TEXTS.CANCEL="Cancel",s.DEFAULT_TEXTS.CONFIRM="Confirmation",s.SIZE_NORMAL="size-normal",s.SIZE_SMALL="size-small",s.SIZE_WIDE="size-wide",s.SIZE_LARGE="size-large",s.BUTTON_SIZES={},s.BUTTON_SIZES[s.SIZE_NORMAL]="",s.BUTTON_SIZES[s.SIZE_SMALL]="",s.BUTTON_SIZES[s.SIZE_WIDE]="",s.BUTTON_SIZES[s.SIZE_LARGE]="btn-lg",s.ICON_SPINNER="glyphicon glyphicon-asterisk",s.defaultOptions={type:s.TYPE_PRIMARY,size:s.SIZE_NORMAL,cssClass:"",title:null,message:null,nl2br:!0,closable:!0,closeByBackdrop:!0,closeByKeyboard:!0,spinicon:s.ICON_SPINNER,autodestroy:!0,draggable:!1,animate:!0,description:"",tabindex:-1},s.configDefaultOptions=function(e){s.defaultOptions=t.extend(!0,s.defaultOptions,e)},s.dialogs={},s.openAll=function(){t.each(s.dialogs,function(t,e){e.open()})},s.closeAll=function(){t.each(s.dialogs,function(t,e){e.close()})},s.moveFocus=function(){var e=null;t.each(s.dialogs,function(t,o){e=o}),null!==e&&e.isRealized()&&e.getModal().focus()},s.METHODS_TO_OVERRIDE={},s.METHODS_TO_OVERRIDE["v3.1"]={handleModalBackdropEvent:function(){return this.getModal().on("click",{dialog:this},function(t){t.target===this&&t.data.dialog.isClosable()&&t.data.dialog.canCloseByBackdrop()&&t.data.dialog.close()}),this},updateZIndex:function(){var e=1040,o=1050,n=0;t.each(s.dialogs,function(t,e){n++});var i=this.getModal(),a=i.data("bs.modal").$backdrop;return i.css("z-index",o+20*(n-1)),a.css("z-index",e+20*(n-1)),this},open:function(){return!this.isRealized()&&this.realize(),this.getModal().modal("show"),this.updateZIndex(),this}},s.METHODS_TO_OVERRIDE["v3.2"]={handleModalBackdropEvent:s.METHODS_TO_OVERRIDE["v3.1"].handleModalBackdropEvent,updateZIndex:s.METHODS_TO_OVERRIDE["v3.1"].updateZIndex,open:s.METHODS_TO_OVERRIDE["v3.1"].open},s.METHODS_TO_OVERRIDE["v3.3"]={},s.METHODS_TO_OVERRIDE["v3.3.4"]=t.extend({},s.METHODS_TO_OVERRIDE["v3.1"]),s.prototype={constructor:s,initOptions:function(e){return this.options=t.extend(!0,this.defaultOptions,e),this},holdThisInstance:function(){return s.dialogs[this.getId()]=this,this},initModalStuff:function(){return this.setModal(this.createModal()).setModalDialog(this.createModalDialog()).setModalContent(this.createModalContent()).setModalHeader(this.createModalHeader()).setModalBody(this.createModalBody()).setModalFooter(this.createModalFooter()),this.getModal().append(this.getModalDialog()),this.getModalDialog().append(this.getModalContent()),this.getModalContent().append(this.getModalHeader()).append(this.getModalBody()).append(this.getModalFooter()),this},createModal:function(){var e=t('<div class="modal" role="dialog" aria-hidden="true"></div>');return e.prop("id",this.getId()),e.attr("aria-labelledby",this.getId()+"_title"),e},getModal:function(){return this.$modal},setModal:function(t){return this.$modal=t,this},createModalDialog:function(){return t('<div class="modal-dialog"></div>')},getModalDialog:function(){return this.$modalDialog},setModalDialog:function(t){return this.$modalDialog=t,this},createModalContent:function(){return t('<div class="modal-content"></div>')},getModalContent:function(){return this.$modalContent},setModalContent:function(t){return this.$modalContent=t,this},createModalHeader:function(){return t('<div class="modal-header"></div>')},getModalHeader:function(){return this.$modalHeader},setModalHeader:function(t){return this.$modalHeader=t,this},createModalBody:function(){return t('<div class="modal-body"></div>')},getModalBody:function(){return this.$modalBody},setModalBody:function(t){return this.$modalBody=t,this},createModalFooter:function(){return t('<div class="modal-footer"></div>')},getModalFooter:function(){return this.$modalFooter},setModalFooter:function(t){return this.$modalFooter=t,this},createDynamicContent:function(t){var e=null;return e="function"==typeof t?t.call(t,this):t,"string"==typeof e&&(e=this.formatStringContent(e)),e},formatStringContent:function(t){return this.options.nl2br?t.replace(/\r\n/g,"<br />").replace(/[\r\n]/g,"<br />"):t},setData:function(t,e){return this.options.data[t]=e,this},getData:function(t){return this.options.data[t]},setId:function(t){return this.options.id=t,this},getId:function(){return this.options.id},getType:function(){return this.options.type},setType:function(t){return this.options.type=t,this.updateType(),this},updateType:function(){if(this.isRealized()){var t=[s.TYPE_DEFAULT,s.TYPE_INFO,s.TYPE_PRIMARY,s.TYPE_SUCCESS,s.TYPE_WARNING,s.TYPE_DANGER];this.getModal().removeClass(t.join(" ")).addClass(this.getType())}return this},getSize:function(){return this.options.size},setSize:function(t){return this.options.size=t,this.updateSize(),this},updateSize:function(){if(this.isRealized()){var e=this;this.getModal().removeClass(s.SIZE_NORMAL).removeClass(s.SIZE_SMALL).removeClass(s.SIZE_WIDE).removeClass(s.SIZE_LARGE),this.getModal().addClass(this.getSize()),this.getModalDialog().removeClass("modal-sm"),this.getSize()===s.SIZE_SMALL&&this.getModalDialog().addClass("modal-sm"),this.getModalDialog().removeClass("modal-lg"),this.getSize()===s.SIZE_WIDE&&this.getModalDialog().addClass("modal-lg"),t.each(this.options.buttons,function(o,s){var n=e.getButton(s.id),i=["btn-lg","btn-sm","btn-xs"],a=!1;if("string"==typeof s.cssClass){var d=s.cssClass.split(" ");t.each(d,function(e,o){t.inArray(o,i)!==-1&&(a=!0)})}a||(n.removeClass(i.join(" ")),n.addClass(e.getButtonSize()))})}return this},getCssClass:function(){return this.options.cssClass},setCssClass:function(t){return this.options.cssClass=t,this},getTitle:function(){return this.options.title},setTitle:function(t){return this.options.title=t,this.updateTitle(),this},updateTitle:function(){if(this.isRealized()){var t=null!==this.getTitle()?this.createDynamicContent(this.getTitle()):this.getDefaultText();this.getModalHeader().find("."+this.getNamespace("title")).html("").append(t).prop("id",this.getId()+"_title")}return this},getMessage:function(){return this.options.message},setMessage:function(t){return this.options.message=t,this.updateMessage(),this},updateMessage:function(){if(this.isRealized()){var t=this.createDynamicContent(this.getMessage());this.getModalBody().find("."+this.getNamespace("message")).html("").append(t)}return this},isClosable:function(){return this.options.closable},setClosable:function(t){return this.options.closable=t,this.updateClosable(),this},setCloseByBackdrop:function(t){return this.options.closeByBackdrop=t,this},canCloseByBackdrop:function(){return this.options.closeByBackdrop},setCloseByKeyboard:function(t){return this.options.closeByKeyboard=t,this},canCloseByKeyboard:function(){return this.options.closeByKeyboard},isAnimate:function(){return this.options.animate},setAnimate:function(t){return this.options.animate=t,this},updateAnimate:function(){return this.isRealized()&&this.getModal().toggleClass("fade",this.isAnimate()),this},getSpinicon:function(){return this.options.spinicon},setSpinicon:function(t){return this.options.spinicon=t,this},addButton:function(t){return this.options.buttons.push(t),this},addButtons:function(e){var o=this;return t.each(e,function(t,e){o.addButton(e)}),this},getButtons:function(){return this.options.buttons},setButtons:function(t){return this.options.buttons=t,this.updateButtons(),this},getButton:function(t){return"undefined"!=typeof this.indexedButtons[t]?this.indexedButtons[t]:null},getButtonSize:function(){return"undefined"!=typeof s.BUTTON_SIZES[this.getSize()]?s.BUTTON_SIZES[this.getSize()]:""},updateButtons:function(){return this.isRealized()&&(0===this.getButtons().length?this.getModalFooter().hide():this.getModalFooter().show().find("."+this.getNamespace("footer")).html("").append(this.createFooterButtons())),this},isAutodestroy:function(){return this.options.autodestroy},setAutodestroy:function(t){this.options.autodestroy=t},getDescription:function(){return this.options.description},setDescription:function(t){return this.options.description=t,this},setTabindex:function(t){return this.options.tabindex=t,this},getTabindex:function(){return this.options.tabindex},updateTabindex:function(){return this.isRealized()&&this.getModal().attr("tabindex",this.getTabindex()),this},getDefaultText:function(){return s.DEFAULT_TEXTS[this.getType()]},getNamespace:function(t){return s.NAMESPACE+"-"+t},createHeaderContent:function(){var e=t("<div></div>");return e.addClass(this.getNamespace("header")),e.append(this.createTitleContent()),e.prepend(this.createCloseButton()),e},createTitleContent:function(){var e=t("<div></div>");return e.addClass(this.getNamespace("title")),e},createCloseButton:function(){var e=t("<div></div>");e.addClass(this.getNamespace("close-button"));var o=t('<button class="close">&times;</button>');return e.append(o),e.on("click",{dialog:this},function(t){t.data.dialog.close()}),e},createBodyContent:function(){var e=t("<div></div>");return e.addClass(this.getNamespace("body")),e.append(this.createMessageContent()),e},createMessageContent:function(){var e=t("<div></div>");return e.addClass(this.getNamespace("message")),e},createFooterContent:function(){var e=t("<div></div>");return e.addClass(this.getNamespace("footer")),e},createFooterButtons:function(){var e=this,o=t("<div></div>");return o.addClass(this.getNamespace("footer-buttons")),this.indexedButtons={},t.each(this.options.buttons,function(t,n){n.id||(n.id=s.newGuid());var i=e.createButton(n);e.indexedButtons[n.id]=i,o.append(i)}),o},createButton:function(e){var o=t('<button class="btn"></button>');return o.prop("id",e.id),o.data("button",e),"undefined"!=typeof e.icon&&""!==t.trim(e.icon)&&o.append(this.createButtonIcon(e.icon)),"undefined"!=typeof e.label&&o.append(e.label),"undefined"!=typeof e.cssClass&&""!==t.trim(e.cssClass)?o.addClass(e.cssClass):o.addClass("btn-default"),"undefined"!=typeof e.hotkey&&(this.registeredButtonHotkeys[e.hotkey]=o),o.on("click",{dialog:this,$button:o,button:e},function(t){var e=t.data.dialog,o=t.data.$button,s=o.data("button");"function"==typeof s.action&&s.action.call(o,e,t),s.autospin&&o.toggleSpin(!0)}),this.enhanceButton(o),o},enhanceButton:function(t){return t.dialog=this,t.toggleEnable=function(t){var e=this;return"undefined"!=typeof t?e.prop("disabled",!t).toggleClass("disabled",!t):e.prop("disabled",!e.prop("disabled")),e},t.enable=function(){var t=this;return t.toggleEnable(!0),t},t.disable=function(){var t=this;return t.toggleEnable(!1),t},t.toggleSpin=function(e){var o=this,s=o.dialog,n=o.find("."+s.getNamespace("button-icon"));return"undefined"==typeof e&&(e=!(t.find(".icon-spin").length>0)),e?(n.hide(),t.prepend(s.createButtonIcon(s.getSpinicon()).addClass("icon-spin"))):(n.show(),t.find(".icon-spin").remove()),o},t.spin=function(){var t=this;return t.toggleSpin(!0),t},t.stopSpin=function(){var t=this;return t.toggleSpin(!1),t},this},createButtonIcon:function(e){var o=t("<span></span>");return o.addClass(this.getNamespace("button-icon")).addClass(e),o},enableButtons:function(e){return t.each(this.indexedButtons,function(t,o){o.toggleEnable(e)}),this},updateClosable:function(){return this.isRealized()&&this.getModalHeader().find("."+this.getNamespace("close-button")).toggle(this.isClosable()),this},onShow:function(t){return this.options.onshow=t,this},onShown:function(t){return this.options.onshown=t,this},onHide:function(t){return this.options.onhide=t,this},onHidden:function(t){return this.options.onhidden=t,this},isRealized:function(){return this.realized},setRealized:function(t){return this.realized=t,this},isOpened:function(){return this.opened},setOpened:function(t){return this.opened=t,this},handleModalEvents:function(){return this.getModal().on("show.bs.modal",{dialog:this},function(t){var e=t.data.dialog;if(e.setOpened(!0),e.isModalEvent(t)&&"function"==typeof e.options.onshow){var o=e.options.onshow(e);return o===!1&&e.setOpened(!1),o}}),this.getModal().on("shown.bs.modal",{dialog:this},function(t){var e=t.data.dialog;e.isModalEvent(t)&&"function"==typeof e.options.onshown&&e.options.onshown(e)}),this.getModal().on("hide.bs.modal",{dialog:this},function(t){var e=t.data.dialog;if(e.setOpened(!1),e.isModalEvent(t)&&"function"==typeof e.options.onhide){var o=e.options.onhide(e);return o===!1&&e.setOpened(!0),o}}),this.getModal().on("hidden.bs.modal",{dialog:this},function(e){var o=e.data.dialog;o.isModalEvent(e)&&"function"==typeof o.options.onhidden&&o.options.onhidden(o),o.isAutodestroy()&&(delete s.dialogs[o.getId()],t(this).remove()),s.moveFocus()}),this.handleModalBackdropEvent(),this.getModal().on("keyup",{dialog:this},function(t){27===t.which&&t.data.dialog.isClosable()&&t.data.dialog.canCloseByKeyboard()&&t.data.dialog.close()}),this.getModal().on("keyup",{dialog:this},function(e){var o=e.data.dialog;if("undefined"!=typeof o.registeredButtonHotkeys[e.which]){var s=t(o.registeredButtonHotkeys[e.which]);!s.prop("disabled")&&s.focus().trigger("click")}}),this},handleModalBackdropEvent:function(){return this.getModal().on("click",{dialog:this},function(e){t(e.target).hasClass("modal-backdrop")&&e.data.dialog.isClosable()&&e.data.dialog.canCloseByBackdrop()&&e.data.dialog.close()}),this},isModalEvent:function(t){return"undefined"!=typeof t.namespace&&"bs.modal"===t.namespace},makeModalDraggable:function(){return this.options.draggable&&(this.getModalHeader().addClass(this.getNamespace("draggable")).on("mousedown",{dialog:this},function(t){var e=t.data.dialog;e.draggableData.isMouseDown=!0;var o=e.getModalDialog().offset();e.draggableData.mouseOffset={top:t.clientY-o.top,left:t.clientX-o.left}}),this.getModal().on("mouseup mouseleave",{dialog:this},function(t){t.data.dialog.draggableData.isMouseDown=!1}),t("body").on("mousemove",{dialog:this},function(t){var e=t.data.dialog;e.draggableData.isMouseDown&&e.getModalDialog().offset({top:t.clientY-e.draggableData.mouseOffset.top,left:t.clientX-e.draggableData.mouseOffset.left})})),this},realize:function(){return this.initModalStuff(),this.getModal().addClass(s.NAMESPACE).addClass(this.getCssClass()),this.updateSize(),this.getDescription()&&this.getModal().attr("aria-describedby",this.getDescription()),this.getModalFooter().append(this.createFooterContent()),this.getModalHeader().append(this.createHeaderContent()),this.getModalBody().append(this.createBodyContent()),this.getModal().data("bs.modal",new o(this.getModal(),{backdrop:"static",keyboard:!1,show:!1})),this.makeModalDraggable(),this.handleModalEvents(),this.setRealized(!0),this.updateButtons(),this.updateType(),this.updateTitle(),this.updateMessage(),this.updateClosable(),this.updateAnimate(),this.updateSize(),this.updateTabindex(),this},open:function(){return!this.isRealized()&&this.realize(),this.getModal().modal("show"),this},close:function(){return this.getModal().modal("hide"),this}},s.prototype=t.extend(s.prototype,s.METHODS_TO_OVERRIDE[o.getModalVersion()]),s.newGuid=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0,o="x"===t?e:3&e|8;return o.toString(16)})},s.show=function(t){return new s(t).open()},s.alert=function(){var e={},o={type:s.TYPE_PRIMARY,title:null,message:null,closable:!1,draggable:!1,buttonLabel:s.DEFAULT_TEXTS.OK,callback:null};return e="object"==typeof arguments[0]&&arguments[0].constructor==={}.constructor?t.extend(!0,o,arguments[0]):t.extend(!0,o,{message:arguments[0],callback:"undefined"!=typeof arguments[1]?arguments[1]:null}),new s({type:e.type,title:e.title,message:e.message,closable:e.closable,draggable:e.draggable,data:{callback:e.callback},onhide:function(t){!t.getData("btnClicked")&&t.isClosable()&&"function"==typeof t.getData("callback")&&t.getData("callback")(!1)},buttons:[{label:e.buttonLabel,action:function(t){t.setData("btnClicked",!0),"function"==typeof t.getData("callback")&&t.getData("callback")(!0),t.close()}}]}).open()},s.confirm=function(){var e={},o={type:s.TYPE_PRIMARY,title:null,message:null,closable:!1,draggable:!1,btnCancelLabel:s.DEFAULT_TEXTS.CANCEL,btnOKLabel:s.DEFAULT_TEXTS.OK,btnOKClass:null,callback:null};return e="object"==typeof arguments[0]&&arguments[0].constructor==={}.constructor?t.extend(!0,o,arguments[0]):t.extend(!0,o,{message:arguments[0],closable:!1,buttonLabel:s.DEFAULT_TEXTS.OK,callback:"undefined"!=typeof arguments[1]?arguments[1]:null}),null===e.btnOKClass&&(e.btnOKClass=["btn",e.type.split("-")[1]].join("-")),new s({type:e.type,title:e.title,message:e.message,closable:e.closable,draggable:e.draggable,data:{callback:e.callback},buttons:[{label:e.btnCancelLabel,action:function(t){"function"==typeof t.getData("callback")&&t.getData("callback")(!1),t.close()}},{label:e.btnOKLabel,cssClass:e.btnOKClass,action:function(t){"function"==typeof t.getData("callback")&&t.getData("callback")(!0),t.close()}}]}).open()},s.warning=function(t,e){return new s({type:s.TYPE_WARNING,message:t}).open()},s.danger=function(t,e){return new s({type:s.TYPE_DANGER,message:t}).open()},s.success=function(t,e){return new s({type:s.TYPE_SUCCESS,message:t}).open()},s});