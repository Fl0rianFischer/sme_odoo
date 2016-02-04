odoo.define('website_contact_snippet.editor', function(require) {
    'use strict';

    var options = require('web_editor.snippets.options');
    var ajax = require('web.ajax');
    var snippet_editor = require('web_editor.snippet.editor');
    var core = require('web.core');
    var qweb = core.qweb;

    ajax.loadXML('/website_contact_snippet/static/xml/contact_form_modal.xml', qweb);

    options.registry.website_contact_snippet = options.Class.extend({
        form_opt: function(type, value, $li) {
            if (type !== 'click') {return};
            var self = this;
            self.$modal = $(qweb.render("website_contact_snippet.contactus_form_modal"));
            self.$modal.appendTo('body');
            self.$modal.modal();

            var $subData = self.$modal.find($('#sub-data')),
                $sendForm = self.$target.find($('.o_website_form_send').closest('.form-group')),
                formItems = ['name','email','phone','company','message'],
                modalIds = formItems.map(function(formItem) {
                  return formItem = self.$modal.find($('#' + formItem));
                });

            _.each(formItems, function(formItem) {
                form_to_modal(formItem);
            });

            self.addEventHandler(modalIds, 'click', function() {
                ($(this).attr('checked')) ? $(this).attr('checked', false) : $(this).attr('checked', true);
            });

            $subData.on('click', function() {
                formItems.forEach(function(formItem) {
                    modal_to_form(formItem);
                });
            });

            function modal_to_form(formItem) {
                var template = $(qweb.render("website_contact_snippet.form_" + formItem)),
                    $formEl = self.$target.find($('.form-' + formItem)),
                    $modalCheck = self.$modal.find($('#' + formItem));

                if ($modalCheck.attr('checked') === 'checked' && $formEl.length < 1) {
                    template.insertBefore($sendForm);
                } else if ($modalCheck.attr('checked') === 'checked' && $formEl.length > 0) {
                    // Do nothing
                } else if ($modalCheck.attr('checked') !== 'checked')  {
                    $formEl.remove();
                }
            }

            function form_to_modal(formItem) {
                var $formEl = self.$target.find($('.form-' + formItem)),
                    $modalCheck = self.$modal.find($('#' + formItem));

                (self.$target.find($('.form-' + formItem)).length > 0) ? $modalCheck.attr('checked', true) : $modalCheck.attr('checked', false);
            }

            this.$modal.on('hidden.bs.modal', function () {
                $(this).remove();
            });
        },

        addEventHandler: function (array, type, func) {
            var len = array.length;
            $(array).each(function(index, item) {
                $(item).bind(type, func);
            });
        },
    });
});