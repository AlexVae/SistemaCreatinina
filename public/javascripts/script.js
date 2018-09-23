$(document).ready(function(){
    
    
    $('.show-menu').on('click', function(){
        
        $('.content-menu').slideToggle();
    })
    
    $(window).resize(function(){
        
        if($(window).height() < 900){
            $('.content-menu').css("overflow-y","scroll");
        }else{
            $('.content-menu').css("overflow-y","hidden");
        }

        if($(window).width() > 983){
            $('.content-menu').show();
			$('.prueba').hide();
        }else{
            $('.content-menu').hide();
			$('.prueba').show();
        }
        
    })
    
})

if($(window).height() < 900){
            $('.content-menu').css("overflow-y","scroll");
        }else{
            $('.content-menu').css("overflow-y","hidden");
        }
