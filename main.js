
var interval;
function countDown() {
    $('button.start').attr('disabled', true);
    $('button.pause').attr('disabled', false);
    interval =setInterval(function(){
         var minutes = parseInt($('.minutes').text());
         var start_minutes = minutes;
         var seconds = parseInt($(".seconds").text());
         if ( minutes > 0 ) {
             if (seconds === 0) {
                 seconds = 60;
                 minutes--;
                 seconds--;
                 $('.minutes').text( minutes > 10 ? minutes : '0' + minutes);
                 $('.seconds').text( seconds > 10 ? seconds : '0' + seconds);
             } else {
                 seconds--;
                 $('.seconds').text( seconds > 10 ? seconds : '0' + seconds);
             }

         } else if ( seconds > 0) {
             seconds--;
             $('.seconds').text( seconds > 10 ? seconds : '0' + seconds);
         } else {
             document.getElementById("alarm").play();
             Swal.fire({
                 title: 'Good Job',
                 type: 'success',
                 confirmButtonColor: '#3085d6',
                 confirmButtonText: (start_minutes == 50) ? 'Take a break' : 'Back to work',
             }).then((result) => {
                 if (result.value) {
                     document.getElementById("alarm").pause();
                 }
             })
             clearTimeout(interval);
             $('button.start').attr('disabled', false);
             $('div.minutes').text((start_minutes == 50) ? '10' : '50');
             $('div.seconds').text('00');
         }
        }, 1000);
}

$('.pause').on('click', function(e){
      e.preventDefault();
      clearInterval(interval);
      $('button.start').attr('disabled', false);
      $('button.pause').attr('disabled', true);
});