
 function expand(chapter) {
    chapter.show();
    chapter.children('a').children('i').removeClass("fa fa-caret-right");
    chapter.children('a').children('i').addClass("fa fa-caret-down");
    if (chapter.parent().attr('class') != 'summary'
        && chapter.parent().attr('class') != 'book-summary'
      && chapter.length != 0
       ) {
         expand(chapter.parent());
       }
  }

 function toggle_list(obj) {
     $position = obj.children('i').attr('class');
     if ($position=="fa fa-caret-right"){
         obj.parent().children().slideDown(400);
         obj.children('i').removeClass("fa fa-caret-right");
         obj.children('i').addClass("fa fa-caret-down");
     }
     if ($position=="fa fa-caret-down"){
         obj.parent().children('ul.articles').slideUp(400);
         obj.children('i').removeClass("fa fa-caret-down");
         obj.children('i').addClass("fa fa-caret-right");
     }
     return false;
  }





require(["gitbook", "jQuery"], function(gitbook, $) {


    //$(document).ready(function(){ /*code here*/
  
  gitbook.events.bind("page.change", function() {  
    
    $('li.chapter').children('ul.articles').hide();
    $chapter = $('li.chapter.active');
    $children = $chapter.children('ul.articles');
    $parent = $chapter.parent();
    $siblings = $chapter.siblings().children('ul.articles');
      
    expand($chapter);

    if ($children.length > 0) {
      $children.show();
    }
    
    //-- DROP DOWN MENU ACTION --
    //Chris Morse, Mode Lab - 6/2015
    $chapters = $('ul.summary').children('li.chapter');
    $chapters.each(function(){
        $sub_chapters = $(this).children('ul.articles').children('li.chapter');
        $num_sub_chapters = $sub_chapters.length;
        if ($num_sub_chapters > 0) {
                $(this).children('a').before("<a href=\"\" onclick=\"toggle_list($(this));return false;\" style=\"padding:10px;float:left;margin-right:-10px\" class=\"dropdown_closed\"><i class=\"fa fa-caret-right\"></i></a>");
        }
        $sub_chapters.each(function(){
            $sub_sub_chapters = $(this).children('ul.articles').children('li.chapter');
            $num_sub_sub_chapters = $sub_sub_chapters.length;
            if ($num_sub_sub_chapters > 0) {
                //$(this).children('a').before("<a href=# class=\"dropdown_closed\" style=\"float:left\">&#10095;</style>");
                $(this).children('a').before("<a href=\"\" onclick=\"toggle_list($(this));return false;\" style=\"padding-left:5px;padding-right:5px;float:left;margin-left:auto;margin-right:auto\" class=\"dropdown_closed\"><i class=\"fa fa-caret-right\"></i></a>");
            } else {
                $(this).children('a').before("<a href=# style=\"padding-left:8px;padding-right:8px;float:left;margin-left:auto;margin-right:auto\"></a>");
            }
        })
    })
    if ($children.length > 0){
        $chapter.children('a').children('i').removeClass("fa fa-caret-right");
        $chapter.children('a').children('i').addClass("fa fa-caret-down");
    }
    //-- END DROP DOWN MENU ACTION--  
      
    //-- TESTING PARENTS CARET MODIFICATION
    $parents = $chapter.parents('li.chapter');
    $parents.each(function() {
        $(this).children('a').children('i').removeClass("fa fa-caret-right");
        $(this).children('a').children('i').addClass("fa fa-caret-down");
    })
      
    //-- END TEST
      
      
    //get data level to determin how many folders to go back to get to root
    $depth = $chapter.data('level').toString();
    $depth = $depth.replace(/\./g,"");
    $depth_num = $depth.length;
    //create string for going back folders
    $folder_string = "../";
    for (i=1; i<$depth_num; i++){
        $folder_string = $folder_string + "../";
    }
      
    //Goto link location
    h = window.location.hash;
    if (h) {
        location.hash=window.location.hash;
    }
    
    
    //Add mode lab logo to top of side bar, and copyright to bottom of side bar
    $s = $('div.book-summary');
    $s.prepend("<div class=\"logo\"><a href=\"http://modelab.is\" target=\"_blank\"><img class=\"logo\" src=\"" + $folder_string + "modelab_logo.png\"></a></div>");
      
    $t = $('ul.summary');
     
    $t.append("<div class=\"ebook-link\" style=\"padding-left:15px;padding-top:20px\">Download PDF and Ebook versions at: <a href=\"http://modelab.is/grasshopper-primer/\" target=\"_blank\">modelab.is/grasshopper-primer<\a><\div><br>");
       $t.append("<div class=\"ebook-link\" style=\"padding-left:15px;padding-top:0px\">Language:<br><a href=\"http://grasshopperprimer.com/en/index.html\">EN</a> &nbsp &nbsp <a href=\"http://grasshopperprimer.com/es/index.html\">ES</a> <\div><br>");  
    $t.append("<div style=\"padding-left:15px;\">Copyright &copy; Mode Lab 2015</div>");
    $t.append("<div style=\"padding-left:15px;padding-top:5px;font-size:0.85em;\">Published with GitBook</div>");
  });

});

 