(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner(0);

  // Initiate the wowjs
  new WOW().init();

  // Header carousel
  $(".header-carousel").owlCarousel({
    animateOut: "fadeOut",
    items: 1,
    margin: 0,
    stagePadding: 0,
    autoplay: true,
    smartSpeed: 1000,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
  });

  // Service-carousel
  $(".service-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 2000,
    center: false,
    dots: false,
    loop: true,
    margin: 25,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 2,
      },
      1200: {
        items: 2,
      },
    },
  });

  // testimonial carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    center: false,
    dots: true,
    loop: true,
    margin: 25,
    nav: false,
    navText: [
      '<i class="fa fa-angle-right"></i>',
      '<i class="fa fa-angle-left"></i>',
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 1,
      },
      992: {
        items: 1,
      },
      1200: {
        items: 2,
      },
    },
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });


  // Submit Button
  $("#submit-form").submit((e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      e.stopPropagation();
      return;
    }

    // Show spinner and change button text
    let submitButton = $("#submit-button");
    submitButton.html(
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
    );

    let formData = $("#submit-form").serializeArray();

    // Convert serialized form data to a readable format
    let formattedMessage = "New contact form submission:\n\n";
    formData.forEach((field) => {
      formattedMessage += `${
        field.name.charAt(0).toUpperCase() + field.name.slice(1)
      }: ${decodeURIComponent(field.value)}\n`;
    });

    // Prepare the message for WhatsApp
    let message = encodeURIComponent(formattedMessage);

    // Send data via AJAX
    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbxdbs5-Zz1Vpr6zhjOIXD-cFi_QuOJmEFwZjuF8y6TFF01qFC75fB-ts3XLpJyuHfNc/exec",
      data: $("#submit-form").serialize(),
      method: "post",
      success: function (response) {
        // Open WhatsApp with the formatted message
        window.open(`https://wa.me/919852630553?text=${message}`, "_blank");
        alert("Form submitted successfully");
        window.location.reload();
        // window.location.href="https://google.com"
      },
      error: function (err) {
        alert("Something Error");
      },
    });
  });
})(jQuery);
