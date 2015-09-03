/**
 *广告上传
 * @return {[type]} [description]
 */
$(function() {
    var imageUploadify = $('.J_upload_container').imageUploadify({
            previewWidth: 120,
            previewHeight: 80,
            fieldFormat: {
                uploadedImageId: 'yourselfiamgeid',
                uploadedImagePath: 'yourselfiamgesrc'
            }
        }),
        $modal = $('.J_moal'),
        $modalTitle = $('.am-modal-hd span'),
        $modalId = $('.J_modal_id'),
        $modalTime = $('.J_modal_time'),
        $submit = $('.J_modal_submit'),
        $modalForm = $('.J_modal_form'),
        EDIT = '编辑',
        ADD = '添加';
    var ADTYPE = {
        UP: 1, //上架
        DOWN: 2 //下架
    };
    var defaultOptions = {
        imageId: '',
        imagePath: '',
        uploadTime: '',
        viewDays: '',
        adType: ADTYPE.UP
    };
    var AdUploadify = function($container, options) {
        this.options = $.extend({}, defaultOptions, options);
        this.$container = $container;
        this.id = $container.attr('data-id') || this.options.id;
        this.imageId = $container.attr('data-imageId') || this.options.imageId;
        this.imagePath = $container.attr('data-imagePath') || this.options.imagePath;
        this.uploadTime = $container.attr('data-uploadTime') || this.options.uploadTime;
        this.viewDays = $container.attr('data-viewDays') || this.options.viewDays;
        this.adType = this.options.adType;
        this._init();
    };
    AdUploadify.prototype = {
        _init: function() {
            if (this.id) {
                this._createEdit();
            } else {
                this._createAdd();
            }
        },
        _createAdd: function() {
            var sel = this;
            var innerHtml = [
                '<div class="ad-uploadify">',
                '<div class="ad-uploadify-view">',
                '<img src="' + this.imagePath + '">',
                '</div>',
                '<div class="ad-uploadify-content">',
                '<p class="ad-uploadify-days"><label>展示天数</label><span>' + this.viewDays + '</span></p>',
                '<p class="ad-uploadify-time"><label>上传时间</label><span>' + this.uploadTime + '</span></p>',
                '<div class="ad-uploadify-operate">',
                '<a href="javascript:void(0)" class="ad-uploadify-edit">替换</a>',
                '<a href="javascript:void(0)" class="ad-uploadify-down">' + (this.adType ? '上架' : '下架') + '</a>',
                '</div>',
                '</div>',
                '</div>'
            ];
            var $innerHtml = $(innerHtml.join(''));
            $('.ad-uploadify-edit', $innerHtml).on('click', function() {
                self._openUploadDialog();
            });
            $('.ad-uploadify-down', $innerHtml).on('click', function() {
                self._down();
            });
            this.$container.html($innerHtml);
        },
        _createEdit: function() {
            var self = this;
            var innerHtml = [
                '<div class="ad-uploadify">',
                '<div class="ad-uploadify-view">',
                '<a href="javascript:void(0)" class="ad-uploadify-add am-icon-plus"></a>',
                '</div>',
                '</div>'
            ];
            var $innerHtml = $(innerHtml.join(''));
            $('.ad-uploadify-add', $innerHtml).on('click', function() {
                self._openUploadDialog();
            });
            this.$container.html($innerHtml);
        },
        _openUploadDialog: function() {
            var self = this;
            $modalTitle.text(this.id ? EDIT : ADD);
            $modalId.text(this.id);
            $modalTime.text(this.viewDays);
            imageUploadify.set(this.imageId, this.imagePath);
            $modal.modal();
            $submit.one('click', function() {
                var imageObj = imageUploadify.get();
                if (!imageObj || !imageObj.pic) {
                    notify.warn('请上传图片');
                    return;
                }
                if (imageObj && (imageObj = imageObj.errorMessage)) {
                    notify.warn(imageObj);
                    return;
                }
                $modalForm.ajaxSubmit({
                    success: function(res) {
                        if (res.err_code == 0) {
                            notify.success(t + '成功');
                            $modal.modal('close');
                            self.id = res.id;
                            self.imageId = res.imageId;
                            self.imagePath = res.imagePath;
                            self.viewDays = res.viewDays;
                            self._createAdd();
                        } else {
                            notify.warn(res.err_msg);
                        }
                    }
                });
            });
        },
        _down: function() {
            var type = this.adType === ADTYPE.UP ? ADTYPE.DOWN : ADTYPE.UP;
            $.post('', {
                id: this.id,
                type: type
            }, function(res) {
                if (res.err_code == 0) {
                    this.adType = type;
                    notify.success(type === ADTYPE.UP ? '上架成功' : '下架成功');
                } else {
                    notify.warn(res.err_msg);
                }
            });
        }
    };
    $('.J_aduploadify').each(function() {
        new AdUploadify($(this));
    });
});
