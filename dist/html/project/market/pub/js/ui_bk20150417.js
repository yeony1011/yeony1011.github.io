$(document).ready(function(){
	
	/* nav */
	$("nav .link").on("click keyup", function(){
		$("nav .link").removeClass("selected");
		$(this).addClass("selected");
	});

    /* draggable */
    $(".imgbox").draggable();

    /* intro */
    // var btnBoxH = $(window).height() - $(".intro_wrap .img_box").height();
    // $(".intro_wrap .btn_box").css("height", btnBoxH);

    // if($(window).width() < "321" && $(window).height() < "481"){
    //     $(".intro_wrap .btn_box").css("position", "fixed");
    // }
});

/* 모달 공통 */
function modalOpen(mtarget){
    var _mtarget    = $("." + mtarget );
    var _style = {
        display : "block"
    };
    $(".block_modal").css(_style);
    _mtarget.css("display", "block");
    location.href ="#";
}

function modalClose(mtarget){
    var _mtarget    = $("." +mtarget);
    _mtarget.css("display", "none");
    $(".block_modal").css("display", "none");

    return false;
}