odoo.define('website_contact_snippet.editor', function(require) {
    'use strict';

    var options = require('web_editor.snippets.options');
    var ajax = require('web.ajax');
    var snippet_editor = require('web_editor.snippet.editor');
    var core = require('web.core');
    var qweb = core.qweb;

    ajax.loadXML('/website_contact_snippet/static/src/xml/contact_form_modal.xml', qweb);

    options.registry.website_contact_snippet = options.Class.extend({
        form_opt: function(type, value, $li) {
            if (type !== 'click') {return};
            var self = this;
            self.$modal = $(qweb.render("website_contact_snippet.contactus_form_modal"));
            self.$modal.appendTo('body');
            self.$modal.modal();

            var $subData = self.$modal.find($('#sub-data')),
                $sendForm = self.$target.find($('.o_website_form_send').closest('.form-group')),
                formItems = ['name','email','phone','company','subject','message'],
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
                var $formEl = self.$target.find($('.form-' + formItem)),
                    $modalCheck = self.$modal.find($('#' + formItem)),
                    isChecked = $modalCheck.attr('checked') === 'checked';

                if (isChecked && $formEl.length < 1) {

                    var template = $(qweb.render("website_contact_snippet.form_" + formItem));
                    template.insertBefore($sendForm);

                } else if (isChecked && $formEl.length > 0) {

                    (formItem === 'subject') 
                        ? $formEl.removeClass('hidden').find('input').attr('value', '')
                        : '';

                } else if ($modalCheck.attr('checked') !== 'checked')  {

                    (formItem !== 'subject') 
                        ? $formEl.remove() 
                        : $formEl.addClass('hidden').find('input').attr('value', 'Message from contact snippet');
                }
            }

            function form_to_modal(formItem) {
                var $formEl = self.$target.find($('.form-' + formItem)),
                    $modalCheck = self.$modal.find($('#' + formItem));

                ($formEl.length > 0 && formItem !== 'subject' || formItem === 'subject' && !$formEl.hasClass('hidden'))
                    ? $modalCheck.attr('checked', true)
                    : $modalCheck.attr('checked', false);
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