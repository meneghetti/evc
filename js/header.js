/**
 * @file
 * Header helpers for the evc theme.
 */

(function ($, Drupal) {

  'use strict';

  /**
   * Header behaviours.
   */
  Drupal.behaviors.evcHeader = {
    attach: function (context, settings) {
      // Support for nested BS dropdowns.
      $('.dropdown-menu a[data-toggle="dropdown"]', context).on('click', function (e) {
        var $this = $(this);
        if (!$this.next().hasClass('show')) {
          $this.parents('.dropdown-menu').first().find('.show').removeClass('show');
        }
        var $subMenu = $this.next('.dropdown-menu');
        $subMenu.toggleClass('show');

        $this.toggleClass('show');
        return false;
      });
    }
  };

})(jQuery, Drupal);
