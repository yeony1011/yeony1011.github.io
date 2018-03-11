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

/* 모달 공통 */
//모달 열기
var iHeight = $(window).height();
function modalOpen(mtarget){
  var _mtarget = $("." + mtarget );
  var popHeight = _mtarget.height() + 7;
  var marginTop = iHeight/2 - popHeight/2;
  var popTop2 = $(document).scrollTop() + marginTop;
  var _style = {
    display : "block"
  };

  $(".blockui").css(_style);
  _mtarget.css({
    "display" : "block",
    "top" : marginTop
  });

  blockWheel();
}

//모달 닫기
function modalClose(mtarget){
  var _mtarget	= $("." +mtarget);

  $(".blockui").css("display", "none");
  _mtarget.css("display", "none");

  playWheel();

  return false;
}

//스크롤 막기
function blockWheel(){
  jQuery(window).on("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll", function(e) {
    e.preventDefault();
    return;
  });

  jQuery(window).on("keydown.disableScroll", function(e) {
    var eventKeyArray = [32, 33, 34, 35, 36, 37, 38, 39, 40];
    for (var i = 0; i < eventKeyArray.length; i++) {
      if (e.keyCode === eventKeyArray [i]) {
        e.preventDefault();
        return;
      }
    }
  });
}

//스크롤 막기 해제
function playWheel(){
  jQuery(window).off(".disableScroll");
}