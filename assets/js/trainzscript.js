$(document).ready(function(){

    // initialize parallax effect (materialize)
    $(".parallax").parallax();

    // sticky-on-scroll navbar
    window.onscroll = function() {
        stickyHead();
    }
    var navbar = document.getElementById("stickyScroll");

    var sticky = navbar.offsetTop;
    console.log(sticky);
    
    
    function stickyHead() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.remove("navbar");
            navbar.classList.add("navbar-fixed");
            $(".header-placeholder").css({display: "block"});
        } else {
            navbar.classList.remove("navbar-fixed");
            navbar.classList.add("navbar");
            $(".header-placeholder").css({display: "none"});

        };

    };


});