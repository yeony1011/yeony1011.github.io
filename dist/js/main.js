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

    //portfolio hover
    $(".grid-item").on("mouseover keyup", function(){
        $(this).find(".overBox").css("display", "block");
    });
    $(".grid-item").on("mouseout", function(){
        $(this).find(".overBox").css("display", "none");
    });

    //portfolio 해당팝업 열기
    $(".overBox a").on("click keydown", function(){
        var allCnt = $(".grid-item").length;
        var number = $(this).parent().parent().index();
        var nowNum = allCnt - number;
        modalOpen("port"+nowNum);
        return false;
    });

    //모달 닫기
    $(".blockui").bind("click", function(){
        modalClose();
        $(".pop").hide();
        $(".gnb").removeClass("on");
    });
});
