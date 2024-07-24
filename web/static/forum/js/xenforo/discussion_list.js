var _____WB$wombat$assign$function_____ = function(name) {
    return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name];
};
if (!self.__WB_pmw) {
    self.__WB_pmw = function(obj) {
        this.__WB_source = obj;
        return this;
    }
}
{
    let window = _____WB$wombat$assign$function_____("window");
    let self = _____WB$wombat$assign$function_____("self");
    let document = _____WB$wombat$assign$function_____("document");
    let location = _____WB$wombat$assign$function_____("location");
    let top = _____WB$wombat$assign$function_____("top");
    let parent = _____WB$wombat$assign$function_____("parent");
    let frames = _____WB$wombat$assign$function_____("frames");
    let opener = _____WB$wombat$assign$function_____("opener");

    /*
 * XenForo discussion_list.min.js
 * Copyright 2010-2016 XenForo Ltd.
 * Released under the XenForo License Agreement: http://xenforo.com/license-agreement
 */
    (function(b, e, d) {
        XenForo.DiscussionList = function(a) {
            this.__construct(a)
        }
        ;
        XenForo.DiscussionList.prototype = {
            __construct: function(a) {
                this.$form = a;
                b("a.EditControl", this.$form).live("click", b.context(this, "editControlClick"));
                this.loaderXhr = this.$editor = null
            },
            editControlClick: function(a) {
                if (this.loaderXhr)
                    return !1;
                var a = b(a.target)
                  , c = a.closest(".discussionListItem");
                if (this.$editor) {
                    if (this.$editor.is(":animated"))
                        return !1;
                    this.$editor.xfRemove("xfSlideUp")
                }
                c.addClass("AjaxProgress");
                c = a.data("href");
                if (!c || c.match(/^javascript:/))
                    c = a.attr("href");
                this.loaderXhr = XenForo.ajax(c, "", b.context(this, "editorLoaded"));
                return !1
            },
            editorLoaded: function(a) {
                this.loaderXhr = null;
                var c = b("#thread-" + a.threadId + ".discussionListItem");
                if (XenForo.hasResponseError(a))
                    return c.removeClass("AjaxProgress"),
                    !1;
                new XenForo.ExtLoader(a,b.context(function() {
                    this.$editor = b(a.templateHtml).data("discussionlistitemid", c.attr("id")).xfInsert("insertAfter", c, "xfSlideDown", XenForo.speed.fast, b.context(function() {
                        c.removeClass("AjaxProgress");
                        this.$editor.find(".titleField").focus();
                        b(d).trigger("TitlePrefixRecalc")
                    }, this))
                }, this))
            }
        };
        XenForo.DiscussionListItemEditor = function(a) {
            this.__construct(a)
        }
        ;
        XenForo.DiscussionListItemEditor.prototype = {
            __construct: function(a) {
                this.$editor = a;
                this.$saveButton = b("input:submit", this.$editor).click(b.context(this, "save"));
                this.$cancelButton = b("input:reset", this.$editor).click(b.context(this, "cancel"))
            },
            save: function() {
                if (!this.saverXhr) {
                    var a = this.$editor.closest("form").serializeArray()
                      , a = XenForo.ajaxDataPush(a, "_returnDiscussionListItem", 1);
                    this.$editor.addClass("InProgress");
                    this.saverXhr = XenForo.ajax(this.$saveButton.data("submiturl"), a, b.context(this, "saveSuccess"))
                }
                return !1
            },
            cancel: function() {
                this.removeEditor();
                return !1
            },
            saveSuccess: function(a) {
                this.saverXhr = null;
                this.$editor.removeClass("InProgress");
                if (XenForo.hasResponseError(a))
                    return !1;
                this.removeEditor();
                var c = b("#thread-" + a.threadId);
                c.fadeOut(XenForo.speed.normal, function() {
                    b(a.templateHtml).xfInsert("insertBefore", c, "xfFadeIn", XenForo.speed.normal);
                    c.remove()
                })
            },
            removeEditor: function() {
                this.$editor.parent().xfSlideUp({
                    duration: XenForo.speed.slow,
                    easing: "easeOutBounce",
                    complete: function() {
                        b(this).remove()
                    }
                });
                this.$editor = null
            }
        };
        XenForo.DiscussionListOptions = function(a) {
            this.__construct(a)
        }
        ;
        XenForo.DiscussionListOptions.prototype = {
            __construct: function(a) {
                this.$handle = a.click(b.context(this, "toggleOptions"));
                this.$options = b("form.DiscussionListOptions").hide();
                this.$submit = b("input:submit", this.$options).click(b.context(this, "hideOptions"));
                this.$reset = b("input:reset", this.$options).click(b.context(this, "hideOptions"))
            },
            toggleOptions: function() {
                if (this.$options.is(":animated"))
                    return !1;
                this.$options.is(":hidden") ? this.showOptions() : this.hideOptions();
                return !1
            },
            showOptions: function() {
                this.$options.xfFadeDown(XenForo.speed.normal, function() {
                    b(this).find("input, select, textarea, button").get(0).focus()
                })
            },
            hideOptions: function() {
                this.$options.xfFadeUp(XenForo.speed.normal)
            }
        };
        XenForo.register("form.DiscussionList", "XenForo.DiscussionList");
        XenForo.register(".discussionListItemEdit", "XenForo.DiscussionListItemEditor");
        XenForo.register("#DiscussionListOptionsHandle a", "XenForo.DiscussionListOptions")
    }
    )(jQuery, this, document);

}
