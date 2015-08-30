(function($) {
    $.ajaxSetup({
        cache: false
    });
    $(document).ajaxError(function(event, jqXHR, settings, thrownError) {
        notify.warn('请求异常，请重试!');
    });
    /**
     * 生成菜单
     * @return {[type]} [description]
     */
    (function() {
        return;
        var menuData = [{
            name: '车源管理',
            href: '#',
            iconClass: 'iconfont icon-01jixiegongying',
            active: false,
            children: [{
                name: '已审核车源',
                href: '车源管理-已审核车源.html',
                iconClass: 'iconfont icon-shenhechenggong'
            }, {
                name: '待审核车源',
                href: '车源管理-待审核车源.html',
                iconClass: 'iconfont icon-daishenhe'
            }]
        }, {
            name: '销售管理',
            href: '#',
            iconClass: 'iconfont icon-xiaoshouguanli01',
            active: false,
            children: [{
                name: '已售车',
                href: '销售管理-全部已售车.html',
                iconClass: 'iconfont icon-03jixieqiugou'
            }]
        }, {
            name: '用户管理',
            href: '#',
            iconClass: 'iconfont icon-yonghuguanli',
            active: false,
            children: [{
                name: '个人用户',
                href: '用户管理-个人用户.html',
                iconClass: 'iconfont icon-person'
            }, {
                name: '未认证经纪人',
                href: '用户管理-未认证经纪人.html',
                iconClass: 'iconfont icon-weishimingrenzheng'
            }, {
                name: '已认证经纪人',
                href: '用户管理-已认证经纪人.html',
                iconClass: 'iconfont icon-renzheng'
            }, {
                name: '待审核经纪人',
                href: '用户管理-待审核经纪人.html',
                iconClass: 'iconfont icon-shenhe'
            }, {
                name: '管理员',
                href: '用户管理-管理员.html',
                iconClass: 'iconfont icon-guanliyuan'
            }]
        }, {
            name: '奖励管理',
            href: '#',
            iconClass: 'iconfont icon-jiangliguanli',
            active: false,
            children: [{
                name: '认证奖励',
                href: '奖励管理-认证奖励.html',
                iconClass: 'iconfont icon-jiangli'
            }, {
                name: '车源奖励',
                href: '奖励管理-车源奖励.html',
                iconClass: 'iconfont icon-jixieshebeijizhaomingb'
            }]
        }, {
            name: '配置管理',
            href: '#',
            active: false,
            iconClass: 'iconfont icon-peizhi',
            children: [{
                name: '品牌配置',
                href: '配置管理-品牌配置.html',
                iconClass: 'iconfont icon-pinpai'
            }, {
                name: '机型配置',
                href: '配置管理-机型配置.html',
                iconClass: 'iconfont icon-model'
            }, {
                name: '奖励配置',
                href: '配置管理-奖励配置.html',
                iconClass: 'iconfont icon-jiangli'
            }]
        }, {
            name: '图文管理',
            href: '图文管理-全部.html',
            iconClass: 'iconfont icon-tuwen',
            active: true,
            children: [{
                name: '全部图文',
                href: '图文管理-全部.html',
                active: true,
                iconClass: 'iconfont icon-tuwen'
            }]
        }];
        var i = 0,
            item,
            $ul = $('<ul class="am-list admin-sidebar-list"></ul>'),
            $li,
            $a,
            j,
            subLen,
            subcollapseName,
            subItem,
            $subul,
            $subli,
            len = menuData.length;
        for (; i < len; i++) {
            item = menuData[i];
            if (item.children && (subLen = item.children.length)) {
                $li = $('<li class="admin-parent"></li>');
                subcollapseName = 'collapse-nav-' + i;
                $a = $('<a class="am-cf" data-am-collapse="{target: \'#' + subcollapseName + '\'}"><span class="' + item.iconClass + '"></span> ' + item.name + ' <span class="am-icon-angle-right am-fr am-margin-right"></span></a>');
                $subul = $('<ul class="am-list admin-sidebar-sub am-collapse' + (item.active ? ' am-in ' : '') + '" id="' + subcollapseName + '">');
                for (j = 0; j < item.children.length; j++) {
                    subItem = item.children[j];
                    $subli = $('<li><a class="' + (subItem.active ? 'active' : '') + '" href="' + subItem.href + '"><span class="' + subItem.iconClass + '"></span> ' + subItem.name + '</a></li>');
                    $subul.append($subli);
                }
                $li.append($a).append($subul);
            } else {
                $li = $('<li><a href="' + item.href + '"><span class="' + item.iconClass + '"></span>' + item.name + '</a></li>');
            }
            $ul.append($li);
        }
        // $('.J_menu').offCanvas();
        $('.J_menu .am-offcanvas-bar').html($ul);
    })();

    $(function() {
        var $fullText = $('.admin-fullText');
        $('#admin-fullscreen').on('click', function() {
            $.AMUI.fullscreen.toggle();
        });

        $(document).on($.AMUI.fullscreen.raw.fullscreenchange, function() {
            $fullText.text($.AMUI.fullscreen.isFullscreen ? '退出全屏' : '开启全屏');
        });
        /**
         * 警告框
         * @return {[type]} [description]
         */
        (function() {
            var win = window,
                doc = document;
            var ENV = {
                on: function(el, type, cb) {
                    if ('addEventListener' in win) {
                        el.addEventListener(type, cb, false);
                    } else {
                        el.attachEvent('on' + type, cb);
                    }
                },

                off: function(el, type, cb) {
                    if ('addEventListener' in win) {
                        el.removeEventListener(type, cb, false);
                    } else {
                        el.detachEvent('on' + type, cb);
                    }
                },

                bind: function(fn, ctx) {
                    return function() {
                        fn.apply(ctx, arguments);
                    };
                },

                isArray: Array.isArray ||
                    function(obj) {
                        return Object.prototype.toString.call(obj) === '[object Array]';
                    },

                config: function(preferred, fallback) {
                    return preferred ? preferred : fallback;
                },

                transSupport: false,

                useFilter: /msie [678]/i.test(navigator.userAgent),
                // sniff, sniff
                checkTransition: function() {
                    var el = doc.createElement('div');
                    var vendors = {
                        webkit: 'webkit',
                        Moz: '',
                        O: 'o',
                        ms: 'MS'
                    };

                    for (var vendor in vendors) {
                        if (vendor + 'Transition' in el.style) {
                            this.vendorPrefix = vendors[vendor];
                            this.transSupport = true;
                        }
                    }
                }
            };

            ENV.checkTransition();
            var DOMPanel = (function() {

                var panel = null;

                return {

                    append: function(dom) {
                        this.getPanel().append(dom);
                    },

                    prepend: function(dom) {
                        this.getPanel().prepend(dom);
                    },

                    getPanel: function() {
                        if (panel === null) {
                            panel = jQuery('#domPanel');
                            if (panel.size() === 0) {
                                panel = jQuery('<div id="domPanel" />').prependTo('body');
                            }

                            // 点击对话框不会触发给document绑定的点击行为
                            panel.click(Toolkit.cancelBubble);
                            panel.mousedown(Toolkit.cancelBubble);
                        }

                        return panel;
                    }
                };

            })();

            var Notify = function(o) {
                o = o || {};
                this.queue = [];
                this.baseCls = o.baseCls || 'notify';
                this.addnCls = o.addnCls || '';
                this.timeout = 'timeout' in o ? o.timeout : 3000;
                this.waitForMove = o.waitForMove || false;
                this.clickToClose = o.clickToClose || false;
                this.container = o.container;

                try {
                    this.setupEl();
                } catch (e) {
                    jQuery(ENV.bind(this.setupEl, this));
                }
            };

            Notify.prototype = {

                constructor: Notify,

                setupEl: function() {
                    var el = doc.createElement('div');
                    el.style.display = 'none';
                    this.container = this.container || DOMPanel.getPanel()[0];
                    this.container.appendChild(el);
                    this.el = el;
                    this.removeEvent = ENV.bind(this.remove, this);
                    this.transEvent = ENV.bind(this.afterAnimation, this);
                    this.run();
                },

                afterTimeout: function() {
                    if (!ENV.config(this.currentMsg.waitForMove, this.waitForMove)) {
                        this.remove();
                    } else if (!this.removeEventsSet) {
                        ENV.on(doc.body, 'mousemove', this.removeEvent);
                        ENV.on(doc.body, 'click', this.removeEvent);
                        ENV.on(doc.body, 'keypress', this.removeEvent);
                        ENV.on(doc.body, 'touchstart', this.removeEvent);
                        this.removeEventsSet = true;
                    }
                },

                run: function() {
                    if (this.animating || !this.queue.length || !this.el) {
                        return;
                    }

                    this.animating = true;
                    if (this.currentTimer) {
                        clearTimeout(this.currentTimer);
                        this.currentTimer = null;
                    }

                    var msg = this.queue.shift();
                    var clickToClose = ENV.config(msg.clickToClose, this.clickToClose);

                    if (clickToClose) {
                        ENV.on(this.el, 'click', this.removeEvent);
                        ENV.on(this.el, 'touchstart', this.removeEvent);
                    }
                    var timeout = ENV.config(msg.timeout, this.timeout);

                    if (timeout > 0) {
                        this.currentTimer = setTimeout(ENV.bind(this.afterTimeout, this), timeout);
                    }

                    if (ENV.isArray(msg.html)) {
                        msg.html = '<ul><li>' + msg.html.join('<li>') + '</ul>';
                    }

                    this.el.innerHTML = msg.html;
                    this.currentMsg = msg;
                    this.el.className = this.baseCls;
                    if (ENV.transSupport) {
                        this.el.style.display = 'block';
                        setTimeout(ENV.bind(this.showMessage, this), 50);
                    } else {
                        this.showMessage();
                    }

                },

                setOpacity: function(opacity) {
                    if (ENV.useFilter) {
                        try {
                            this.el.filters.item('DXImageTransform.Microsoft.Alpha').Opacity = opacity * 100;
                        } catch (err) {}
                    } else {
                        this.el.style.opacity = String(opacity);
                    }
                },

                showMessage: function() {
                    var addnCls = ENV.config(this.currentMsg.addnCls, this.addnCls);
                    if (ENV.transSupport) {
                        this.el.className = this.baseCls + ' ' + addnCls + ' ' + this.baseCls + '-animate';
                    } else {
                        var opacity = 0;
                        this.el.className = this.baseCls + ' ' + addnCls + ' ' + this.baseCls + '-js-animate';
                        this.setOpacity(0); // reset value so hover states work
                        this.el.style.display = 'block';

                        var self = this;
                        var interval = setInterval(function() {
                            if (opacity < 1) {
                                opacity += 0.1;
                                opacity = Math.min(1, opacity);
                                self.setOpacity(opacity);
                            } else {
                                clearInterval(interval);
                            }
                        }, 30);
                    }
                },

                hideMessage: function() {
                    var addnCls = ENV.config(this.currentMsg.addnCls, this.addnCls);
                    if (ENV.transSupport) {
                        this.el.className = this.baseCls + ' ' + addnCls;
                        ENV.on(this.el, ENV.vendorPrefix ? ENV.vendorPrefix + 'TransitionEnd' : 'transitionend', this.transEvent);
                    } else {
                        var opacity = 1;
                        var self = this;
                        var interval = setInterval(function() {
                            if (opacity > 0) {
                                opacity -= 0.1;
                                opacity = Math.max(0, opacity);
                                self.setOpacity(opacity);
                            } else {
                                self.el.className = self.baseCls + ' ' + addnCls;
                                clearInterval(interval);
                                self.afterAnimation();
                            }
                        }, 30);
                    }
                },

                afterAnimation: function() {
                    if (ENV.transSupport) {
                        ENV.off(this.el, ENV.vendorPrefix ? ENV.vendorPrefix + 'TransitionEnd' : 'transitionend', this.transEvent);
                    }

                    if (this.currentMsg.cb) {
                        this.currentMsg.cb();
                    }
                    this.el.style.display = 'none';
                    this.animating = false;
                    this.run();
                },

                remove: function(e) {
                    var cb = typeof e === 'function' ? e : null;

                    ENV.off(doc.body, 'mousemove', this.removeEvent);
                    ENV.off(doc.body, 'click', this.removeEvent);
                    ENV.off(doc.body, 'keypress', this.removeEvent);
                    ENV.off(doc.body, 'touchstart', this.removeEvent);
                    ENV.off(this.el, 'click', this.removeEvent);
                    ENV.off(this.el, 'touchstart', this.removeEvent);
                    this.removeEventsSet = false;

                    if (cb && this.currentMsg) {
                        this.currentMsg.cb = cb;
                    }
                    if (this.animating) {
                        this.hideMessage();
                    } else if (cb) {
                        cb();
                    }
                },

                log: function(html, o, cb, defaults) {
                    var msg = {},
                        opt = null;
                    if (defaults) {
                        for (opt in defaults) {
                            msg[opt] = defaults[opt];
                        }
                    }

                    if (typeof o === 'function') {
                        cb = o;
                    } else if (o) {
                        for (opt in o) {
                            msg[opt] = o[opt];
                        }
                    }

                    msg.html = html;
                    msg.cb = cb ? cb : msg.cb;
                    this.queue.push(msg);
                    this.run();
                    return this;
                },

                spawn: function(defaults) {
                    var self = this;
                    return function(html, o, cb) {
                        return self.log.call(self, html, o, cb, defaults);
                    };
                }
            };

            window.notify = new Notify();

            notify.info = notify.spawn({
                addnCls: 'notify-info'
            });

            notify.error = notify.spawn({
                addnCls: 'notify-error'
            });

            notify.warn = notify.spawn({
                addnCls: 'notify-warn'
            });

            notify.success = notify.spawn({
                addnCls: 'notify-success'
            });
        })();
        window.Toolkit = {
            // 纵向滚动到指定位置
            scrollTween: function(y, callback) {
                jQuery('html,body').animate({
                    scrollTop: (y || 0)
                }, 500, 'easeOutExpo', function() {
                    return callback && callback();
                });
            },

            // 取消选中的文本
            clearSelect: function() {
                if (document.selection && document.selection.empty) {
                    document.selection.empty();
                } else if (window.getSelection) {
                    window.getSelection().removeAllRanges();
                }
            },

            // 计算字符串的字节长度
            countByte: function(str) {
                var size = 0;
                for (var i = 0, l = str.length; i < l; i++) {
                    size += str.charCodeAt(i) > 255 ? 2 : 1;
                }

                return size;
            },

            // 根据字节截取长度
            substrByByte: function(str, limit) {
                for (var i = 1, l = str.length + 1; i < l; i++) {
                    if (this.countByte(str.substring(0, i)) > limit) {
                        return str.substring(0, i - 1);
                    }
                }

                return str;
            },

            paramOfUrl: function(url) {
                url = url || location.href;
                var paramSuit = url.substring(url.indexOf('?') + 1).split("&");
                var paramObj = {};
                for (var i = 0; i < paramSuit.length; i++) {
                    var param = paramSuit[i].split('=');
                    if (param.length == 2) {
                        var key = decodeURIComponent(param[0]),
                            val = decodeURIComponent(param[1]);
                        if (paramObj.hasOwnProperty(key)) {
                            paramObj[key] = jQuery.makeArray(paramObj[key]);
                            paramObj[key].push(val);
                        } else {
                            paramObj[key] = val;
                        }
                    }
                }
                return paramObj;
            },
            getCurDate: function() {
                var date = new Date();
                return date.getFullYear() + '-' + this.formatLenth(date.getMonth() + 1) + '-' + this.formatLenth(date.getDate())
            },

            parseDate: function(str) {
                var list = str.split(/[-:\s]/),
                    date = new Date();
                date.setFullYear(list[0]);
                date.setDate(1); //设置每月都有的day
                date.setMonth(list[1].toInt() - 1);
                date.setDate(list[2].toInt());
                date.setHours(list[3].toInt());
                date.setMinutes(list[4].toInt());
                date.setSeconds(list[5].toInt());

                return date;
            },

            formatDate: function(date) {
                if (typeOf(date) !== 'date') {
                    date = this.parseDate(date);
                }
                return date.getFullYear() + '-' + this.formatLenth(date.getMonth() + 1) + '-' + this.formatLenth(date.getDate()) + ' ' + this.formatLenth(date.getHours()) + ':' + this.formatLenth(date.getMinutes()) + ':' + this.formatLenth(date.getSeconds());
            },

            str2mills: function(str) {
                return this.parseDate(str).getTime();
            },

            mills2str: function(num) {
                var date = new Date(num);
                return date.getFullYear() + '-' + this.formatLenth(date.getMonth() + 1) + '-' + this.formatLenth(date.getDate());
            },

            formatLenth: function(x, len) {
                x = '' + x;
                len = len || 2;
                while (x.length < len) {
                    x = '0' + x;
                }
                return x;
            },

            stopPropagation: function(e) {
                e.stopPropagation();
            },

            loadTempl: function(url, force) {
                this.templHash = this.templHash || new Hash();

                if (this.templHash.has(url) && !force) {
                    return this.templHash.get(url);
                }

                var self = this;
                return jQuery.get(url, function(templ) {
                    self.templHash.set(url, templ);
                });
            },
            getParameterByName: function(name) {
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                    results = regex.exec(location.search);
                return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
            }
        };
    });
    var $multiCheckbox = $('th input[type="checkbox"]'), //多选
        $singleCheckbox = $('td input[type="checkbox"]'); //单选
    /**
     * 全选
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $multiCheckbox.on('change', function() {
        var mulitdom = this;
        $singleCheckbox.each(function() {
            this.checked = mulitdom.checked;
        });
    });
    /**
     * 单选
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $singleCheckbox.on('change', function() {
        var isAllchecked = true;
        $singleCheckbox.each(function() {
            if (!this.checked) {
                isAllchecked = false;
                return false;
            }
        });
        $multiCheckbox[0].checked = isAllchecked;
    });
    /**
     *图片上传
     * @return {[type]} [description]
     */
    (function() {
        var defaultOptions = {
            buttonClass: '',
            width: 120,
            height: 32,
            previewWidth: 100,
            previewHeight: 80,
            buttonText: '上传图片',
            fileFormat: '*.gif; *.jpg; *.png; *.jpeg;',
            uploadLimit: 999,
            sizeLimit: '5MB',
            multi: false,
            removeTimeout: 0,
            swf: 'assets/js/uploadify/uploadify.swf',
            uploader: '',
            defaultID: '',
            defaultPath: '',
            queueID: '01234556789',
            fieldFormat: { //删除图片id字段名称和路径名称
                uploadedImageId: 'id', //上传成功后台返回的图片ID字段名称
                uploadedImagePath: 'src', //上传成功后台返回的图片路径字段名称
                formImageId: 'id', //提交form表单的图片ID字段名称
                formImagePath: 'src' //提交form表单的图片路径字段名称
            }

        };
        var UPLOADSTATUS = {
            'UPLOADED': 0,
            'UPLOADING': 1
        };
        var IMAGEID = 'imageupload_',
            IMAGEINDEX = 1;
        var ImageUploadify = function(container, options) {
            this.$container = $(container);

            var formValue = {},
                formIdValue = this.$container.attr('data-idvalue'),
                formPathValue = this.$container.attr('data-pathvalue');
            formIdValue !== '' && (formValue.defaultID = formIdValue);
            formPathValue !== '' && (formValue.defaultPath = formPathValue);

            this.options = $.extend({}, defaultOptions, formValue, options);
            var formField = {},
                formIdField = this.$container.attr('data-idname'),
                formPathField = this.$container.attr('data-pathname');
            formIdField !== '' && (formField.formImageId = formIdField);
            formPathField !== '' && (formField.formImagePath = formPathField);
            this.fieldFormat = $.extend({}, defaultOptions.fieldFormat, formField, options && options.fieldFormat);
            this.uploadStatus = UPLOADSTATUS.UPLOADED;
            this._init();
        };
        ImageUploadify.prototype = {
            _init: function() {
                var self = this;
                ++IMAGEINDEX;
                var $innerHtml = $('<div><input type="hidden" name="' + this.fieldFormat.formImageId + '"/><input type="hidden" name="' + this.fieldFormat.formImagePath + '"/><input type="file" id="' + IMAGEID + IMAGEINDEX + '" /><div class="image-uploadify-preview"></div></div>'),
                    $uploadify = this.$uploadify = $('[type="file"]', $innerHtml),
                    $hiddenid = this.$hiddenid = $('[type="hidden"]', $innerHtml).eq(0),
                    $hiddenpath = this.$hiddenpath = $('[type="hidden"]', $innerHtml).eq(1),
                    $preview = this.$preview = $('.image-uploadify-preview', $innerHtml);
                this.$container.html($innerHtml);
                $preview.on('click', function(e) {
                    var $target = $(e.target);
                    if ($target.hasClass('J_close') || $target.closest('.J_close').length) {
                        self.reset();
                    }
                });
                $uploadify.uploadify({
                    'buttonClass': this.options.buttonClass,
                    'width': this.options.width,
                    'height': this.options.height,
                    'buttonText': '<i class="am-icon-upload"></i> ' + this.options.buttonText,
                    'uploadLimit': this.options.uploadLimit,
                    'fileTypeExts': this.options.fileFormat,
                    'fileSizeLimit': this.options.sizeLimit,
                    'swf': this.options.swf,
                    'uploader': this.options.uploader,
                    'multi': this.options.multi,
                    'queueID': this.options.queueID,
                    'removeTimeout': this.options.removeTimeout,
                    'onUploadProgress': function(file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
                        var percent = ((bytesUploaded / bytesTotal).toFixed(2) * 100);
                        $preview.html('<i class="am-icon-spinner icon-spin"></i> 正在上传...' + percent + '%').show();
                    },
                    'onUploadStart': function() {
                        $preview.html('<i class="am-icon-spinner icon-spin"></i> 正在上传...').show();
                        self.uploadStatus = UPLOADSTATUS.UPLOADING;
                    },
                    'onQueueComplete': function() {
                        self.uploadStatus = UPLOADSTATUS.UPLOADED;
                    },
                    'onUploadError': function() {
                        $preview.html('上传失败，请重试 :(').show();
                    },
                    'onUploadSuccess': function(file, data, response) {
                        data = JSON.parse(data);
                        if (response && data) {
                            //更新图像及ID
                            var dId = data[self.fieldFormat.uploadedImageId],
                                dPath = data[self.fieldFormat.uploadedImagePath];
                            $preview.html('<img width="' + self.options.previewWidth + '" height="' + self.options.previewHeight + '" src="' + dPath + '" alt=""/><a href="javascript:void(0)" class="J_close am-close" title="删除">&times;</a>').show();
                            self.imageId = dId;
                            self.imagePath = dPath;
                            $hiddenid.val(dId);
                            $hiddenpath.val(dPath);
                        }
                    }
                });
                this.set(this.options.defaultID, this.options.defaultPath);
            },
            set: function(imageid, imagePath) {
                if (!imageid || !imagePath) {
                    this.reset();
                    return;
                }
                this.uploadStatus === UPLOADSTATUS.UPLOADING && this.$uploadify.uploadify('stop');
                this.imageId = imageid;
                this.imagePath = imagePath;
                this.$hiddenid.val(imageid);
                this.$hiddenpath.val(imagePath);
                this.$preview.html('<img width="' + this.options.previewWidth + '" height="' + this.options.previewHeight + '"  src="' + imagePath + '" alt=""/><a href="javascript:void(0)" class="J_close am-close" title="删除">&times;</a>').show();
                return this;
            },
            reset: function() {
                this.uploadStatus === UPLOADSTATUS.UPLOADING && this.$uploadify.uploadify('stop');
                this.imageId = '';
                this.imagePath = '';
                this.$hiddenid.val('');
                this.$hiddenpath.val('');
                this.$preview.hide();
                return this;
            },
            get: function() {
                var result = {};
                result[this.fieldFormat.formImageId] = this.imageId;
                result[this.fieldFormat.formImagePath] = this.imagePath;
                this.uploadStatus === UPLOADSTATUS.UPLOADING && (result.errorMessage = '正在上传，请稍后。。。');
                return result;
            }
        };
        $.fn.imageUploadify = function(options) {
            var imageUploadify = new ImageUploadify(this, options);
            //接口
            return {
                set: function(imageid, imagePath) {
                    imageUploadify.set(imageid, imagePath);
                    return imageUploadify;
                },
                reset: function() {
                    imageUploadify.reset();
                    return imageUploadify;
                },
                get: function() {
                    return imageUploadify.get();
                }
            };
        };
    })();
})(jQuery);
/*!
 * jQuery Form Plugin
 * version: 3.36.0-2013.06.16
 * @requires jQuery v1.5 or later
 * Copyright (c) 2013 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
/*global ActiveXObject */
;
(function($) {
    "use strict";

    /*
        Usage Note:
        -----------
        Do not use both ajaxSubmit and ajaxForm on the same form.  These
        functions are mutually exclusive.  Use ajaxSubmit if you want
        to bind your own submit handler to the form.  For example,

        $(document).ready(function() {
            $('#myForm').on('submit', function(e) {
                e.preventDefault(); // <-- important
                $(this).ajaxSubmit({
                    target: '#output'
                });
            });
        });

        Use ajaxForm when you want the plugin to manage all the event binding
        for you.  For example,

        $(document).ready(function() {
            $('#myForm').ajaxForm({
                target: '#output'
            });
        });

        You can also use ajaxForm with delegation (requires jQuery v1.7+), so the
        form does not have to exist when you invoke ajaxForm:

        $('#myForm').ajaxForm({
            delegation: true,
            target: '#output'
        });

        When using ajaxForm, the ajaxSubmit function will be invoked for you
        at the appropriate time.
    */

    /**
     * Feature detection
     */
    var feature = {};
    feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
    feature.formdata = window.FormData !== undefined;

    var hasProp = !!$.fn.prop;

    // attr2 uses prop when it can but checks the return type for
    // an expected string.  this accounts for the case where a form 
    // contains inputs with names like "action" or "method"; in those
    // cases "prop" returns the element
    $.fn.attr2 = function() {
        if (!hasProp)
            return this.attr.apply(this, arguments);
        var val = this.prop.apply(this, arguments);
        if ((val && val.jquery) || typeof val === 'string')
            return val;
        return this.attr.apply(this, arguments);
    };

    /**
     * ajaxSubmit() provides a mechanism for immediately submitting
     * an HTML form using AJAX.
     */
    $.fn.ajaxSubmit = function(options) {
        /*jshint scripturl:true */
        // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
        if (!this.length) {
            log('ajaxSubmit: skipping submit process - no element selected');
            return this;
        }

        var method, action, url, $form = this;

        if (typeof options == 'function') {
            options = {
                success: options
            };
        }

        method = options.type || this.attr2('method');
        action = options.url || this.attr2('action');

        url = (typeof action === 'string') ? $.trim(action) : '';
        url = url || window.location.href || '';
        if (url) {
            // clean url (don't include hash vaue)
            url = (url.match(/^([^#]+)/) || [])[1];
        }

        options = $.extend(true, {
            url: url,
            success: $.ajaxSettings.success,
            type: method || 'GET',
            iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
        }, options);

        // hook for manipulating the form data before it is extracted;
        // convenient for use with rich editors like tinyMCE or FCKEditor
        var veto = {};
        this.trigger('form-pre-serialize', [this, options, veto]);
        if (veto.veto) {
            log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
            return this;
        }

        // provide opportunity to alter form data before it is serialized
        if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
            log('ajaxSubmit: submit aborted via beforeSerialize callback');
            return this;
        }

        var traditional = options.traditional;
        if (traditional === undefined) {
            traditional = $.ajaxSettings.traditional;
        }

        var elements = [];
        var qx, a = this.formToArray(options.semantic, elements);
        if (options.data) {
            options.extraData = options.data;
            qx = $.param(options.data, traditional);
        }

        // give pre-submit callback an opportunity to abort the submit
        if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
            log('ajaxSubmit: submit aborted via beforeSubmit callback');
            return this;
        }

        // fire vetoable 'validate' event
        this.trigger('form-submit-validate', [a, this, options, veto]);
        if (veto.veto) {
            log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
            return this;
        }

        var q = $.param(a, traditional);
        if (qx) {
            q = (q ? (q + '&' + qx) : qx);
        }
        if (options.type.toUpperCase() == 'GET') {
            options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
            options.data = null; // data is null for 'get'
        } else {
            options.data = q; // data is the query string for 'post'
        }

        var callbacks = [];
        if (options.resetForm) {
            callbacks.push(function() {
                $form.resetForm();
            });
        }
        if (options.clearForm) {
            callbacks.push(function() {
                $form.clearForm(options.includeHidden);
            });
        }

        // perform a load on the target only if dataType is not provided
        if (!options.dataType && options.target) {
            var oldSuccess = options.success || function() {};
            callbacks.push(function(data) {
                var fn = options.replaceTarget ? 'replaceWith' : 'html';
                $(options.target)[fn](data).each(oldSuccess, arguments);
            });
        } else if (options.success) {
            callbacks.push(options.success);
        }

        options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
            var context = options.context || this; // jQuery 1.4+ supports scope context
            for (var i = 0, max = callbacks.length; i < max; i++) {
                callbacks[i].apply(context, [data, status, xhr || $form, $form]);
            }
        };

        if (options.error) {
            var oldError = options.error;
            options.error = function(xhr, status, error) {
                var context = options.context || this;
                oldError.apply(context, [xhr, status, error, $form]);
            };
        }

        if (options.complete) {
            var oldComplete = options.complete;
            options.complete = function(xhr, status) {
                var context = options.context || this;
                oldComplete.apply(context, [xhr, status, $form]);
            };
        }

        // are there files to upload?

        // [value] (issue #113), also see comment:
        // https://github.com/malsup/form/commit/588306aedba1de01388032d5f42a60159eea9228#commitcomment-2180219
        var fileInputs = $('input[type=file]:enabled[value!=""]', this);

        var hasFileInputs = fileInputs.length > 0;
        var mp = 'multipart/form-data';
        var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

        var fileAPI = feature.fileapi && feature.formdata;
        log("fileAPI :" + fileAPI);
        var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;

        var jqxhr;

        // options.iframe allows user to force iframe mode
        // 06-NOV-09: now defaulting to iframe mode if file input is detected
        if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
            // hack to fix Safari hang (thanks to Tim Molendijk for this)
            // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
            if (options.closeKeepAlive) {
                $.get(options.closeKeepAlive, function() {
                    jqxhr = fileUploadIframe(a);
                });
            } else {
                jqxhr = fileUploadIframe(a);
            }
        } else if ((hasFileInputs || multipart) && fileAPI) {
            jqxhr = fileUploadXhr(a);
        } else {
            jqxhr = $.ajax(options);
        }

        $form.removeData('jqxhr').data('jqxhr', jqxhr);

        // clear element array
        for (var k = 0; k < elements.length; k++)
            elements[k] = null;

        // fire 'notify' event
        this.trigger('form-submit-notify', [this, options]);
        return this;

        // utility fn for deep serialization
        function deepSerialize(extraData) {
            var serialized = $.param(extraData, options.traditional).split('&');
            var len = serialized.length;
            var result = [];
            var i, part;
            for (i = 0; i < len; i++) {
                // #252; undo param space replacement
                serialized[i] = serialized[i].replace(/\+/g, ' ');
                part = serialized[i].split('=');
                // #278; use array instead of object storage, favoring array serializations
                result.push([decodeURIComponent(part[0]), decodeURIComponent(part[1])]);
            }
            return result;
        }

        // XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)
        function fileUploadXhr(a) {
            var formdata = new FormData();

            for (var i = 0; i < a.length; i++) {
                formdata.append(a[i].name, a[i].value);
            }

            if (options.extraData) {
                var serializedData = deepSerialize(options.extraData);
                for (i = 0; i < serializedData.length; i++)
                    if (serializedData[i])
                        formdata.append(serializedData[i][0], serializedData[i][1]);
            }

            options.data = null;

            var s = $.extend(true, {}, $.ajaxSettings, options, {
                contentType: false,
                processData: false,
                cache: false,
                type: method || 'POST'
            });

            if (options.uploadProgress) {
                // workaround because jqXHR does not expose upload property
                s.xhr = function() {
                    var xhr = $.ajaxSettings.xhr();
                    if (xhr.upload) {
                        xhr.upload.addEventListener('progress', function(event) {
                            var percent = 0;
                            var position = event.loaded || event.position; /*event.position is deprecated*/
                            var total = event.total;
                            if (event.lengthComputable) {
                                percent = Math.ceil(position / total * 100);
                            }
                            options.uploadProgress(event, position, total, percent);
                        }, false);
                    } else {
                        options.uploadProgress(event, position, total, 100);
                    }
                    return xhr;
                };
            }

            s.data = null;
            var beforeSend = s.beforeSend;
            s.beforeSend = function(xhr, o) {
                o.data = formdata;
                if (beforeSend)
                    beforeSend.call(this, xhr, o);
            };
            return $.ajax(s);
        }

        // private function for handling file uploads (hat tip to YAHOO!)
        function fileUploadIframe(a) {
            var form = $form[0],
                el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
            var deferred = $.Deferred();

            if (a) {
                // ensure that every serialized input is still enabled
                for (i = 0; i < elements.length; i++) {
                    el = $(elements[i]);
                    if (hasProp)
                        el.prop('disabled', false);
                    else
                        el.removeAttr('disabled');
                }
            }

            s = $.extend(true, {}, $.ajaxSettings, options);
            s.context = s.context || s;
            id = 'jqFormIO' + (new Date().getTime());
            if (s.iframeTarget) {
                $io = $(s.iframeTarget);
                n = $io.attr2('name');
                if (!n)
                    $io.attr2('name', id);
                else
                    id = n;
            } else {
                $io = $('<iframe name="' + id + '" src="' + s.iframeSrc + '" />');
                $io.css({
                    position: 'absolute',
                    top: '-1000px',
                    left: '-1000px'
                });
            }
            io = $io[0];


            xhr = { // mock object
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: 'n/a',
                getAllResponseHeaders: function() {},
                getResponseHeader: function() {},
                setRequestHeader: function() {},
                abort: function(status) {
                    var e = (status === 'timeout' ? 'timeout' : 'aborted');
                    log('aborting upload... ' + e);
                    this.aborted = 1;

                    try { // #214, #257
                        if (io.contentWindow.document.execCommand) {
                            io.contentWindow.document.execCommand('Stop');
                        }
                    } catch (ignore) {}

                    $io.attr('src', s.iframeSrc); // abort op in progress
                    xhr.error = e;
                    if (s.error)
                        s.error.call(s.context, xhr, e, status);
                    if (g)
                        $.event.trigger("ajaxError", [xhr, s, e]);
                    if (s.complete)
                        s.complete.call(s.context, xhr, e);
                }
            };

            g = s.global;
            // trigger ajax global events so that activity/block indicators work like normal
            if (g && 0 === $.active++) {
                $.event.trigger("ajaxStart");
            }
            if (g) {
                $.event.trigger("ajaxSend", [xhr, s]);
            }

            if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
                if (s.global) {
                    $.active--;
                }
                deferred.reject();
                return deferred;
            }
            if (xhr.aborted) {
                deferred.reject();
                return deferred;
            }

            // add submitting element to data if we know it
            sub = form.clk;
            if (sub) {
                n = sub.name;
                if (n && !sub.disabled) {
                    s.extraData = s.extraData || {};
                    s.extraData[n] = sub.value;
                    if (sub.type == "image") {
                        s.extraData[n + '.x'] = form.clk_x;
                        s.extraData[n + '.y'] = form.clk_y;
                    }
                }
            }

            var CLIENT_TIMEOUT_ABORT = 1;
            var SERVER_ABORT = 2;

            function getDoc(frame) {
                /* it looks like contentWindow or contentDocument do not
                 * carry the protocol property in ie8, when running under ssl
                 * frame.document is the only valid response document, since
                 * the protocol is know but not on the other two objects. strange?
                 * "Same origin policy" http://en.wikipedia.org/wiki/Same_origin_policy
                 */

                var doc = null;

                // IE8 cascading access check
                try {
                    if (frame.contentWindow) {
                        doc = frame.contentWindow.document;
                    }
                } catch (err) {
                    // IE8 access denied under ssl & missing protocol
                    log('cannot get iframe.contentWindow document: ' + err);
                }

                if (doc) { // successful getting content
                    return doc;
                }

                try { // simply checking may throw in ie8 under ssl or mismatched protocol
                    doc = frame.contentDocument ? frame.contentDocument : frame.document;
                } catch (err) {
                    // last attempt
                    log('cannot get iframe.contentDocument: ' + err);
                    doc = frame.document;
                }
                return doc;
            }

            // Rails CSRF hack (thanks to Yvan Barthelemy)
            var csrf_token = $('meta[name=csrf-token]').attr('content');
            var csrf_param = $('meta[name=csrf-param]').attr('content');
            if (csrf_param && csrf_token) {
                s.extraData = s.extraData || {};
                s.extraData[csrf_param] = csrf_token;
            }

            // take a breath so that pending repaints get some cpu time before the upload starts
            function doSubmit() {
                // make sure form attrs are set
                var t = $form.attr2('target'),
                    a = $form.attr2('action');

                // update form attrs in IE friendly way
                form.setAttribute('target', id);
                if (!method) {
                    form.setAttribute('method', 'POST');
                }
                if (a != s.url) {
                    form.setAttribute('action', s.url);
                }

                // ie borks in some cases when setting encoding
                if (!s.skipEncodingOverride && (!method || /post/i.test(method))) {
                    $form.attr({
                        encoding: 'multipart/form-data',
                        enctype: 'multipart/form-data'
                    });
                }

                // support timout
                if (s.timeout) {
                    timeoutHandle = setTimeout(function() {
                        timedOut = true;
                        cb(CLIENT_TIMEOUT_ABORT);
                    }, s.timeout);
                }

                // look for server aborts
                function checkState() {
                    try {
                        var state = getDoc(io).readyState;
                        log('state = ' + state);
                        if (state && state.toLowerCase() == 'uninitialized')
                            setTimeout(checkState, 50);
                    } catch (e) {
                        log('Server abort: ', e, ' (', e.name, ')');
                        cb(SERVER_ABORT);
                        if (timeoutHandle)
                            clearTimeout(timeoutHandle);
                        timeoutHandle = undefined;
                    }
                }

                // add "extra" data to form if provided in options
                var extraInputs = [];
                try {
                    if (s.extraData) {
                        for (var n in s.extraData) {
                            if (s.extraData.hasOwnProperty(n)) {
                                // if using the $.param format that allows for multiple values with the same name
                                if ($.isPlainObject(s.extraData[n]) && s.extraData[n].hasOwnProperty('name') && s.extraData[n].hasOwnProperty('value')) {
                                    extraInputs.push(
                                        $('<input type="hidden" name="' + s.extraData[n].name + '">').val(s.extraData[n].value)
                                        .appendTo(form)[0]);
                                } else {
                                    extraInputs.push(
                                        $('<input type="hidden" name="' + n + '">').val(s.extraData[n])
                                        .appendTo(form)[0]);
                                }
                            }
                        }
                    }

                    if (!s.iframeTarget) {
                        // add iframe to doc and submit the form
                        $io.appendTo('body');
                        if (io.attachEvent)
                            io.attachEvent('onload', cb);
                        else
                            io.addEventListener('load', cb, false);
                    }
                    setTimeout(checkState, 15);

                    try {
                        form.submit();
                    } catch (err) {
                        // just in case form has element with name/id of 'submit'
                        var submitFn = document.createElement('form').submit;
                        submitFn.apply(form);
                    }
                } finally {
                    // reset attrs and remove "extra" input elements
                    form.setAttribute('action', a);
                    if (t) {
                        form.setAttribute('target', t);
                    } else {
                        $form.removeAttr('target');
                    }
                    $(extraInputs).remove();
                }
            }

            if (s.forceSync) {
                doSubmit();
            } else {
                setTimeout(doSubmit, 10); // this lets dom updates render
            }

            var data, doc, domCheckCount = 50,
                callbackProcessed;

            function cb(e) {
                if (xhr.aborted || callbackProcessed) {
                    return;
                }

                doc = getDoc(io);
                if (!doc) {
                    log('cannot access response document');
                    e = SERVER_ABORT;
                }
                if (e === CLIENT_TIMEOUT_ABORT && xhr) {
                    xhr.abort('timeout');
                    deferred.reject(xhr, 'timeout');
                    return;
                } else if (e == SERVER_ABORT && xhr) {
                    xhr.abort('server abort');
                    deferred.reject(xhr, 'error', 'server abort');
                    return;
                }

                if (!doc || doc.location.href == s.iframeSrc) {
                    // response not received yet
                    if (!timedOut)
                        return;
                }
                if (io.detachEvent)
                    io.detachEvent('onload', cb);
                else
                    io.removeEventListener('load', cb, false);

                var status = 'success',
                    errMsg;
                try {
                    if (timedOut) {
                        throw 'timeout';
                    }

                    var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
                    log('isXml=' + isXml);
                    if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
                        if (--domCheckCount) {
                            // in some browsers (Opera) the iframe DOM is not always traversable when
                            // the onload callback fires, so we loop a bit to accommodate
                            log('requeing onLoad callback, DOM not available');
                            setTimeout(cb, 250);
                            return;
                        }
                        // let this fall through because server response could be an empty document
                        //log('Could not access iframe DOM after mutiple tries.');
                        //throw 'DOMException: not available';
                    }

                    //log('response detected');
                    var docRoot = doc.body ? doc.body : doc.documentElement;
                    xhr.responseText = docRoot ? docRoot.innerHTML : null;
                    xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                    if (isXml)
                        s.dataType = 'xml';
                    xhr.getResponseHeader = function(header) {
                        var headers = {
                            'content-type': s.dataType
                        };
                        return headers[header];
                    };
                    // support for XHR 'status' & 'statusText' emulation :
                    if (docRoot) {
                        xhr.status = Number(docRoot.getAttribute('status')) || xhr.status;
                        xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
                    }

                    var dt = (s.dataType || '').toLowerCase();
                    var scr = /(json|script|text)/.test(dt);
                    if (scr || s.textarea) {
                        // see if user embedded response in textarea
                        var ta = doc.getElementsByTagName('textarea')[0];
                        if (ta) {
                            xhr.responseText = ta.value;
                            // support for XHR 'status' & 'statusText' emulation :
                            xhr.status = Number(ta.getAttribute('status')) || xhr.status;
                            xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
                        } else if (scr) {
                            // account for browsers injecting pre around json response
                            var pre = doc.getElementsByTagName('pre')[0];
                            var b = doc.getElementsByTagName('body')[0];
                            if (pre) {
                                xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
                            } else if (b) {
                                xhr.responseText = b.textContent ? b.textContent : b.innerText;
                            }
                        }
                    } else if (dt == 'xml' && !xhr.responseXML && xhr.responseText) {
                        xhr.responseXML = toXml(xhr.responseText);
                    }

                    try {
                        data = httpData(xhr, dt, s);
                    } catch (err) {
                        status = 'parsererror';
                        xhr.error = errMsg = (err || status);
                    }
                } catch (err) {
                    log('error caught: ', err);
                    status = 'error';
                    xhr.error = errMsg = (err || status);
                }

                if (xhr.aborted) {
                    log('upload aborted');
                    status = null;
                }

                if (xhr.status) { // we've set xhr.status
                    status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
                }

                // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
                if (status === 'success') {
                    if (s.success)
                        s.success.call(s.context, data, 'success', xhr);
                    deferred.resolve(xhr.responseText, 'success', xhr);
                    if (g)
                        $.event.trigger("ajaxSuccess", [xhr, s]);
                } else if (status) {
                    if (errMsg === undefined)
                        errMsg = xhr.statusText;
                    if (s.error)
                        s.error.call(s.context, xhr, status, errMsg);
                    deferred.reject(xhr, 'error', errMsg);
                    if (g)
                        $.event.trigger("ajaxError", [xhr, s, errMsg]);
                }

                if (g)
                    $.event.trigger("ajaxComplete", [xhr, s]);

                if (g && !--$.active) {
                    $.event.trigger("ajaxStop");
                }

                if (s.complete)
                    s.complete.call(s.context, xhr, status);

                callbackProcessed = true;
                if (s.timeout)
                    clearTimeout(timeoutHandle);

                // clean up
                setTimeout(function() {
                    if (!s.iframeTarget)
                        $io.remove();
                    xhr.responseXML = null;
                }, 100);
            }

            var toXml = $.parseXML || function(s, doc) { // use parseXML if available (jQuery 1.5+)
                if (window.ActiveXObject) {
                    doc = new ActiveXObject('Microsoft.XMLDOM');
                    doc.async = 'false';
                    doc.loadXML(s);
                } else {
                    doc = (new DOMParser()).parseFromString(s, 'text/xml');
                }
                return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
            };
            var parseJSON = $.parseJSON || function(s) {
                /*jslint evil:true */
                return window['eval']('(' + s + ')');
            };

            var httpData = function(xhr, type, s) { // mostly lifted from jq1.4.4

                var ct = xhr.getResponseHeader('content-type') || '',
                    xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
                    data = xml ? xhr.responseXML : xhr.responseText;

                if (xml && data.documentElement.nodeName === 'parsererror') {
                    if ($.error)
                        $.error('parsererror');
                }
                if (s && s.dataFilter) {
                    data = s.dataFilter(data, type);
                }
                if (typeof data === 'string') {
                    if (type === 'json' || !type && ct.indexOf('json') >= 0) {
                        data = parseJSON(data);
                    } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
                        $.globalEval(data);
                    }
                }
                return data;
            };

            return deferred;
        }
    };

    /**
     * ajaxForm() provides a mechanism for fully automating form submission.
     *
     * The advantages of using this method instead of ajaxSubmit() are:
     *
     * 1: This method will include coordinates for <input type="image" /> elements (if the element
     *    is used to submit the form).
     * 2. This method will include the submit element's name/value data (for the element that was
     *    used to submit the form).
     * 3. This method binds the submit() method to the form for you.
     *
     * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
     * passes the options argument along after properly binding events for submit elements and
     * the form itself.
     */
    $.fn.ajaxForm = function(options) {
        options = options || {};
        options.delegation = options.delegation && $.isFunction($.fn.on);

        // in jQuery 1.3+ we can fix mistakes with the ready state
        if (!options.delegation && this.length === 0) {
            var o = {
                s: this.selector,
                c: this.context
            };
            if (!$.isReady && o.s) {
                log('DOM not ready, queuing ajaxForm');
                $(function() {
                    $(o.s, o.c).ajaxForm(options);
                });
                return this;
            }
            // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
            log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
            return this;
        }

        if (options.delegation) {
            $(document)
                .off('submit.form-plugin', this.selector, doAjaxSubmit)
                .off('click.form-plugin', this.selector, captureSubmittingElement)
                .on('submit.form-plugin', this.selector, options, doAjaxSubmit)
                .on('click.form-plugin', this.selector, options, captureSubmittingElement);
            return this;
        }

        return this.ajaxFormUnbind()
            .bind('submit.form-plugin', options, doAjaxSubmit)
            .bind('click.form-plugin', options, captureSubmittingElement);
    };

    // private event handlers
    function doAjaxSubmit(e) {
        /*jshint validthis:true */
        var options = e.data;
        if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
            e.preventDefault();
            $(this).ajaxSubmit(options);
        }
    }

    function captureSubmittingElement(e) {
        /*jshint validthis:true */
        var target = e.target;
        var $el = $(target);
        if (!($el.is("[type=submit],[type=image]"))) {
            // is this a child element of the submit el?  (ex: a span within a button)
            var t = $el.closest('[type=submit]');
            if (t.length === 0) {
                return;
            }
            target = t[0];
        }
        var form = this;
        form.clk = target;
        if (target.type == 'image') {
            if (e.offsetX !== undefined) {
                form.clk_x = e.offsetX;
                form.clk_y = e.offsetY;
            } else if (typeof $.fn.offset == 'function') {
                var offset = $el.offset();
                form.clk_x = e.pageX - offset.left;
                form.clk_y = e.pageY - offset.top;
            } else {
                form.clk_x = e.pageX - target.offsetLeft;
                form.clk_y = e.pageY - target.offsetTop;
            }
        }
        // clear form vars
        setTimeout(function() {
            form.clk = form.clk_x = form.clk_y = null;
        }, 100);
    }


    // ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
    $.fn.ajaxFormUnbind = function() {
        return this.unbind('submit.form-plugin click.form-plugin');
    };

    /**
     * formToArray() gathers form element data into an array of objects that can
     * be passed to any of the following ajax functions: $.get, $.post, or load.
     * Each object in the array has both a 'name' and 'value' property.  An example of
     * an array for a simple login form might be:
     *
     * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
     *
     * It is this array that is passed to pre-submit callback functions provided to the
     * ajaxSubmit() and ajaxForm() methods.
     */
    $.fn.formToArray = function(semantic, elements) {
        var a = [];
        if (this.length === 0) {
            return a;
        }

        var form = this[0];
        var els = semantic ? form.getElementsByTagName('*') : form.elements;
        if (!els) {
            return a;
        }

        var i, j, n, v, el, max, jmax;
        for (i = 0, max = els.length; i < max; i++) {
            el = els[i];
            n = el.name;
            if (!n || el.disabled) {
                continue;
            }

            if (semantic && form.clk && el.type == "image") {
                // handle image inputs on the fly when semantic == true
                if (form.clk == el) {
                    a.push({
                        name: n,
                        value: $(el).val(),
                        type: el.type
                    });
                    a.push({
                        name: n + '.x',
                        value: form.clk_x
                    }, {
                        name: n + '.y',
                        value: form.clk_y
                    });
                }
                continue;
            }

            v = $.fieldValue(el, true);
            if (v && v.constructor == Array) {
                if (elements)
                    elements.push(el);
                for (j = 0, jmax = v.length; j < jmax; j++) {
                    a.push({
                        name: n,
                        value: v[j]
                    });
                }
            } else if (feature.fileapi && el.type == 'file') {
                if (elements)
                    elements.push(el);
                var files = el.files;
                if (files.length) {
                    for (j = 0; j < files.length; j++) {
                        a.push({
                            name: n,
                            value: files[j],
                            type: el.type
                        });
                    }
                } else {
                    // #180
                    a.push({
                        name: n,
                        value: '',
                        type: el.type
                    });
                }
            } else if (v !== null && typeof v != 'undefined') {
                if (elements)
                    elements.push(el);
                a.push({
                    name: n,
                    value: v,
                    type: el.type,
                    required: el.required
                });
            }
        }

        if (!semantic && form.clk) {
            // input type=='image' are not found in elements array! handle it here
            var $input = $(form.clk),
                input = $input[0];
            n = input.name;
            if (n && !input.disabled && input.type == 'image') {
                a.push({
                    name: n,
                    value: $input.val()
                });
                a.push({
                    name: n + '.x',
                    value: form.clk_x
                }, {
                    name: n + '.y',
                    value: form.clk_y
                });
            }
        }
        return a;
    };

    /**
     * Serializes form data into a 'submittable' string. This method will return a string
     * in the format: name1=value1&amp;name2=value2
     */
    $.fn.formSerialize = function(semantic) {
        //hand off to jQuery.param for proper encoding
        return $.param(this.formToArray(semantic));
    };

    /**
     * Serializes all field elements in the jQuery object into a query string.
     * This method will return a string in the format: name1=value1&amp;name2=value2
     */
    $.fn.fieldSerialize = function(successful) {
        var a = [];
        this.each(function() {
            var n = this.name;
            if (!n) {
                return;
            }
            var v = $.fieldValue(this, successful);
            if (v && v.constructor == Array) {
                for (var i = 0, max = v.length; i < max; i++) {
                    a.push({
                        name: n,
                        value: v[i]
                    });
                }
            } else if (v !== null && typeof v != 'undefined') {
                a.push({
                    name: this.name,
                    value: v
                });
            }
        });
        //hand off to jQuery.param for proper encoding
        return $.param(a);
    };

    /**
     * Returns the value(s) of the element in the matched set.  For example, consider the following form:
     *
     *  <form><fieldset>
     *      <input name="A" type="text" />
     *      <input name="A" type="text" />
     *      <input name="B" type="checkbox" value="B1" />
     *      <input name="B" type="checkbox" value="B2"/>
     *      <input name="C" type="radio" value="C1" />
     *      <input name="C" type="radio" value="C2" />
     *  </fieldset></form>
     *
     *  var v = $('input[type=text]').fieldValue();
     *  // if no values are entered into the text inputs
     *  v == ['','']
     *  // if values entered into the text inputs are 'foo' and 'bar'
     *  v == ['foo','bar']
     *
     *  var v = $('input[type=checkbox]').fieldValue();
     *  // if neither checkbox is checked
     *  v === undefined
     *  // if both checkboxes are checked
     *  v == ['B1', 'B2']
     *
     *  var v = $('input[type=radio]').fieldValue();
     *  // if neither radio is checked
     *  v === undefined
     *  // if first radio is checked
     *  v == ['C1']
     *
     * The successful argument controls whether or not the field element must be 'successful'
     * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
     * The default value of the successful argument is true.  If this value is false the value(s)
     * for each element is returned.
     *
     * Note: This method *always* returns an array.  If no valid value can be determined the
     *    array will be empty, otherwise it will contain one or more values.
     */
    $.fn.fieldValue = function(successful) {
        for (var val = [], i = 0, max = this.length; i < max; i++) {
            var el = this[i];
            var v = $.fieldValue(el, successful);
            if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
                continue;
            }
            if (v.constructor == Array)
                $.merge(val, v);
            else
                val.push(v);
        }
        return val;
    };

    /**
     * Returns the value of the field element.
     */
    $.fieldValue = function(el, successful) {
        var n = el.name,
            t = el.type,
            tag = el.tagName.toLowerCase();
        if (successful === undefined) {
            successful = true;
        }

        if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
                (t == 'checkbox' || t == 'radio') && !el.checked ||
                (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
                tag == 'select' && el.selectedIndex == -1)) {
            return null;
        }

        if (tag == 'select') {
            var index = el.selectedIndex;
            if (index < 0) {
                return null;
            }
            var a = [],
                ops = el.options;
            var one = (t == 'select-one');
            var max = (one ? index + 1 : ops.length);
            for (var i = (one ? index : 0); i < max; i++) {
                var op = ops[i];
                if (op.selected) {
                    var v = op.value;
                    if (!v) { // extra pain for IE...
                        v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
                    }
                    if (one) {
                        return v;
                    }
                    a.push(v);
                }
            }
            return a;
        }
        return $(el).val();
    };

    /**
     * Clears the form data.  Takes the following actions on the form's input fields:
     *  - input text fields will have their 'value' property set to the empty string
     *  - select elements will have their 'selectedIndex' property set to -1
     *  - checkbox and radio inputs will have their 'checked' property set to false
     *  - inputs of type submit, button, reset, and hidden will *not* be effected
     *  - button elements will *not* be effected
     */
    $.fn.clearForm = function(includeHidden) {
        return this.each(function() {
            $('input,select,textarea', this).clearFields(includeHidden);
        });
    };

    /**
     * Clears the selected form elements.
     */
    $.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
        var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
        return this.each(function() {
            var t = this.type,
                tag = this.tagName.toLowerCase();
            if (re.test(t) || tag == 'textarea') {
                this.value = '';
            } else if (t == 'checkbox' || t == 'radio') {
                this.checked = false;
            } else if (tag == 'select') {
                this.selectedIndex = -1;
            } else if (t == "file") {
                if (/MSIE/.test(navigator.userAgent)) {
                    $(this).replaceWith($(this).clone(true));
                } else {
                    $(this).val('');
                }
            } else if (includeHidden) {
                // includeHidden can be the value true, or it can be a selector string
                // indicating a special test; for example:
                //  $('#myForm').clearForm('.special:hidden')
                // the above would clean hidden inputs that have the class of 'special'
                if ((includeHidden === true && /hidden/.test(t)) ||
                    (typeof includeHidden == 'string' && $(this).is(includeHidden)))
                    this.value = '';
            }
        });
    };

    /**
     * Resets the form data.  Causes all form elements to be reset to their original value.
     */
    $.fn.resetForm = function() {
        return this.each(function() {
            // guard against an input with the name of 'reset'
            // note that IE reports the reset function as an 'object'
            if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
                this.reset();
            }
        });
    };

    /**
     * Enables or disables any matching elements.
     */
    $.fn.enable = function(b) {
        if (b === undefined) {
            b = true;
        }
        return this.each(function() {
            this.disabled = !b;
        });
    };

    /**
     * Checks/unchecks any matching checkboxes or radio buttons and
     * selects/deselects and matching option elements.
     */
    $.fn.selected = function(select) {
        if (select === undefined) {
            select = true;
        }
        return this.each(function() {
            var t = this.type;
            if (t == 'checkbox' || t == 'radio') {
                this.checked = select;
            } else if (this.tagName.toLowerCase() == 'option') {
                var $sel = $(this).parent('select');
                if (select && $sel[0] && $sel[0].type == 'select-one') {
                    // deselect all other options
                    $sel.find('option').selected(false);
                }
                this.selected = select;
            }
        });
    };

    // expose debug var
    $.fn.ajaxSubmit.debug = false;

    // helper fn for console logging
    function log() {
        if (!$.fn.ajaxSubmit.debug)
            return;
        var msg = '[jquery.form] ' + Array.prototype.join.call(arguments, '');
        if (window.console && window.console.log) {
            // window.console.log(msg);
        } else if (window.opera && window.opera.postError) {
            window.opera.postError(msg);
        }
    }

})(jQuery);
