(function ($, Drupal, window, document) {

  Drupal.behaviors.evcSlickConfig = {
    attach: function (context, settings) {

      $('.field--name-field-stories').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        dots: true,
        fade: true
      });

    }
  };

}(jQuery, Drupal, this, this.document));
