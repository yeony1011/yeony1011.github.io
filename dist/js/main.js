$(document).ready(function(){
    //menu open-close
    $(".menu").on("click", function(){
        $("#menu").addClass("active");
    });
    $(".close").on("click", function(){
        $("#menu").removeClass("active");
    });

    //navigation
    $(".menuBox .menuLink").on({
        mouseenter : function(){
            var $this = $(this);
            var index = $this.closest(".menuBox").index();
            $(".menuCont p:eq("+index+")").addClass("hover");
        },
        mouseleave : function(){
            $(".menuCont p").removeClass("hover");
        },
        click : function(){
            var $this = $(this);
            var $dropDown = $this.next();
            if($dropDown.hasClass("dropDown") == true){
                if($dropDown.css("display") == "block"){
                    $dropDown.slideUp(200);
                }else{
                    $(".menuLink").next().slideUp(200);
                    $dropDown.slideDown(200);
                }
            }
        }
    });
});
