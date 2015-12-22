//        Show off page stuff 
(function () {
    $('.step-one .number-box button').click(function () {
        $('.step-one, .step-two, .step-three').stop().animate({
            left: "-=1980" // -1960
        }, 1000);
    });

    $('.step-two .number-box button').click(function () {
        $('.step-one, .step-two, .step-three').stop().animate({
            top: "-=1980", // -1960
            left: "+=1500" // -460
        }, 1500);
    });

    $('.step-three .number-box button').click(function () {
        $('.step-one, .step-two, .step-three').stop().animate({
            top: "+=1980", // 20
            left: "+=480" // 20
        }, 1500);
    });
})();