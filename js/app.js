'use strict';
$(document).ready(function() {

    function Img(img) {
      this.image_url = img.image_url;
      this.title = img.title;
      this.description = img.description;
      this.keyword = img.keyword;
      this.horns = img.horns;

    }
    Img.prototype.render = function() {
      let $imgClone = $("#img-template").clone();
      $imgClone.find("h2").text(this.title);
      $imgClone.find("h2").attr("id","itemh2");
      $imgClone.find("img").attr("src", this.image_url);
      $imgClone.find("img").attr("class",this.keyword);
      $imgClone.find("img").attr("id", "itemimg");
      $imgClone.find("img").attr("alt",this.title);
      $imgClone.find("p").text(this.description);
      $imgClone.find("p").attr("id","itemp");
      $imgClone.removeAttr("id");
      $imgClone.attr("class", this.keyword);
      
      $("main").append($imgClone);
     

    };
    Img.prototype.menu = function(){
        if ($(`Option[value="${this.keyword}"]`).length == 0){
        $('select[name="dropdown"]').append(`<option value="${this.keyword}">${this.keyword} </option>`); 
        }
    };
    const renderMenu = () => {

           $('select').change(function(){
               $( "main section " ).each(function() {        
               
                
                if ($(this).attr("class") === $("select").val()){
                    $(this).show();
                    console.log($(this));}

                if ($(this).attr("class") !== $("select").val()){
                    $(this).hide();
                    
                    console.log($(this));}
               
               }
               )
            }
           )
        };


    const readJson = () => {
      $.ajax("data/page-1.json", { method: "GET", dataType: "JSON" }).then(data => {
        data.forEach(ItemsArr => {
          let img = new Img(ItemsArr);
          img.render();
          img.menu();

        });
      });
    };
      
       readJson();
       renderMenu();
    

  });


  
  /*
    {
      "image_url": "http://3.bp.blogspot.com/_DBYF1AdFaHw/TE-f0cDQ24I/AAAAAAAACZg/l-FdTZ6M7z8/s1600/Unicorn_and_Narwhal_by_dinglehopper.jpg",
      "title": "UniWhal",
      "description": "A unicorn and a narwhal nuzzling their horns",
      "keyword": "narwhal",
      "horns": 1
    },
  */
  