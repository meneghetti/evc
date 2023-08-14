/**
 * @file
 * Simple helpers for the evc theme.
 */

(function ($, Drupal, drupalSettings) {

  'use strict';

  /**
   * Core/Misc behaviours.
   */
  Drupal.behaviors.evcMisc = {
    attach: function (context, settings) {

      // Menu interactions
      function openMenu() {
        $('#navbarSupportedContent').addClass('show');
        $('.menu--utility-menu').addClass('d-lg-none');
        $('#menu-backdrop').show();
        $('#block-sitebranding').css('opacity', '.2');
        $('body').addClass('no-scroll');
      }
      function closeMenu() {
        $('#navbarSupportedContent').removeClass('show');
        $('.menu--utility-menu').removeClass('d-lg-none');
        $('#menu-backdrop').hide();
        $('#block-sitebranding').css('opacity', '1');
        $('body').removeClass('no-scroll');
        $('.menu-item--expanded > span').removeClass('expanded');
        $('.menu-item--expanded ul.menu').hide();
      }
      $('#open-main-nav').click(openMenu);
      $('#close-main-nav').click(closeMenu);
      $('#menu-backdrop').click(closeMenu);
      $('.breadcrumb a').on('focus', closeMenu);
      $('.menu--utility-menu ul li a[title="Search"]').click(function (e) {
        e.preventDefault();
        openMenu();
        $('.form-search').focus();
        setTimeout(function () {
          $('#search-block-form').addClass('highlight');
        }, 700);
        setTimeout(function () {
          $('#search-block-form').removeClass('highlight');
        }, 1500);
      });
      $('.menu-item--expanded > span').off().on('click', (function (e) {
        e.preventDefault();
        $(this).toggleClass('expanded');
        $(this).siblings('ul.menu').slideToggle('fast');
      }));

      // Accessibility labels
      $('.menu--utility-menu ul li a[title="Search"]').attr('aria-label', 'Search button');
      $('.menu-item--expanded > span').attr('tabindex', '0');
      $('#block-connectwithevc a').each(function () {
        let title_value = $(this).attr('title');
        $(this).attr('aria-label', title_value + ' link');
      });

      // Keypress actions
      $('.menu-item--expanded > span').on('keypress', function (e) {
        if (e.key == 'Enter') {
          $(this).toggleClass('expanded');
          $(this).siblings('ul.menu').slideToggle('fast');
        };
      });
      $(document).on('keydown', function (e) {
        if (e.key == 'Escape') {
          closeMenu();
        }
      });

      // Mobile Utility Menu
      function mobileUtilityMenu() {
        let height = ($(window).height() - 290);
        $('.hidden-menu .menu--main > ul.menu').css('min-height', height + 'px');
      }
      mobileUtilityMenu();
      $(window).on('resize', mobileUtilityMenu);

      // Accordion
      $('.acc-container .acc-heading-wrapper').off().on('click', (function (e) {
        e.preventDefault();
        if ($(this).parent().parent().parent().parent().parent().parent('.two-columns')[0]) {
          $('.acc-heading-wrapper').removeClass('expanded');
          $(this).addClass('expanded');
          $('.vertical-tabbed-text-content').empty();
          $(this).siblings('.acc-content').clone().appendTo('.vertical-tabbed-text-content');
        } else {
          $(this).toggleClass('expanded');
          $(this).siblings('.acc-content').slideToggle('fast');
        }
      }));

      // Ping-pong
      function resizeMedia() {
        let inner_width = $(window).innerWidth();
        let container_width = $('.ping-pong-block').closest('.container').width();
        let single_margin = (inner_width - container_width) / 2;
        if ($(window).outerWidth() < 992) {
          $('.ping-pong-block .field--name-field-image-video').width(inner_width).css('margin-left', single_margin * -1);
        } else {
          let media_size_right = (container_width * .42) + single_margin;
          let media_size_left = (container_width * .39) + single_margin;
          let ping_left = $('.ping-pong-block .media-on-left .field--name-field-image-video');
          let ping_right = $('.ping-pong-block .media-on-right .field--name-field-image-video');
          $(ping_right).width(media_size_right).css('margin-left', '0');
          $(ping_left).width(media_size_left);
          if ($(window).outerWidth() < 1417) {
            $(ping_left).css('margin-left', single_margin * -1);
          } else {
            $(ping_left).css('margin-left', '-162px');
          }
        }
      }
      resizeMedia();
      $(window).resize(resizeMedia);

      // Tabbed links
      function matchPath(link) {
        link.each(function () {
          let path = $(this).attr('href');
          let url = window.location.href;
          let lastPart = url.substr(url.lastIndexOf('/'));
          if (path.indexOf(lastPart) > -1) {
            $(this).parent().parent().addClass('active');
          }
        });
      }
      matchPath($('.tabbed-links-block .icon-link a'));

      // Event Banner - Date and times format
      $('.view-event-banner .views-field-field-dates-and-times .field-content').each(function () {
        let text = $(this).html().replace(/\|/g, '<br>');
        $(this).html(text);
        $(this).parent().css('visibility', 'visible');
        $(this).parent().next().css('visibility', 'visible');
      });

      // Add layout builder styles
      if ($('#layout-builder').length !== 0 || $("[class^='layout-builder']").length !== 0) {
        $('main').addClass('admin-main');
      }

      // Add class to Calendar pages
      if (window.location.href.indexOf('calendar') > -1) {
        $('body').addClass('calendar');
      }
      // Links to cross-origin destinations safety
      function link_is_external(link_element) {
        return (link_element.host !== window.location.host);
      }
      $('a').each(function () {
        if (link_is_external(this)) {
          $(this).attr('rel', 'noreferrer');
        }
      });

      // Update Reset button behavior to refresh the page
      $('.reset-events').click(function (e) {
        e.preventDefault();
        if (window.history.pushState) {
          window.history.pushState('', '/', window.location.pathname);
          location.reload();
        } else {
          window.location.hash = '';
        }
      });

      // Vertical Tabbed Text - Set columns
      function createSecondColumn() {
        if ($('.vertical-tabbed-text-content').css('display') == 'block') {
          $('.vertical-tabbed-text-block').addClass('two-columns');
        } else {
          $('.vertical-tabbed-text-block').removeClass('two-columns');
        }
      }
      function openFirstTab() {
        if ($('.vertical-tabbed-text-content').css('display') == 'block') {
          let firstTab = $('.two-columns .field--name-field-tabbed-item .field__item:first-child .acc-heading-wrapper');
          firstTab.addClass('expanded');
          $('.vertical-tabbed-text-content').empty();
          firstTab.siblings('.acc-content').clone().appendTo('.vertical-tabbed-text-content');
        }
      }
      createSecondColumn();
      openFirstTab();
      $(window).on('resize', createSecondColumn);

      // Remove duplicate Event dates in Event listing
      function removeDuplicateDates() {
        $('.field--type-daterange > .field__item', context).once('removeDuplicateDates').each(function () {
          let firstTime = $(this).find('time');
          let secondTime = $(this).find('time + time');
          if (firstTime.text().substring(0, 10) === secondTime.text().substring(0, 10)) {
            let fieldTrim = $.trim($(this).text());
            let substringStart = fieldTrim.substring(0, 20);
            let substringEndTime = fieldTrim.substring(fieldTrim.length, fieldTrim.length - 8);
            $(this).html('<time>' + substringStart + ' - ' + substringEndTime + '</time>');
          }
        });
      }
      removeDuplicateDates();

    }
  };
  var debounceHeadersDecoration = Drupal.debounce(function () {
    let re = new RegExp('[\.\+]', 'gi');
    let h1s = document.querySelectorAll(drupalSettings.evc_selectors.split(',').map((item) => item.trim()))
    for (var i = 0; i < h1s.length; i++) {
      h1s.item(i).innerHTML = h1s.item(i).innerHTML.replace(re, '<span class="text-primary">$&</span>');
    }
  }, 250);
  window.addEventListener('load', debounceHeadersDecoration);

})(jQuery, Drupal, drupalSettings);
