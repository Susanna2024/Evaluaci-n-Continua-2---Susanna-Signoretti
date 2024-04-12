
function hide() { 
    document.getElementById("myP").style.visibility = "hidden"; 
  } 
  function hide2() { 
    document.getElementById("myP2").style.visibility = "hidden"; 
  }
  function hide3() { 
    document.getElementById("myP3").style.visibility = "hidden"; 
  } 
  function show() { 
   document.getElementById("myP").style.visibility = "visible"; 
  } 
  function show2() { 
   document.getElementById("myP2").style.visibility = "visible"; 
  } 

  function show3() { 
   document.getElementById("myP3").style.visibility = "visible"; 
  } 

    // video//


  $(document).ready(function() {

    // Gets the video src from the data-src on each button
    
    var $videoSrc;  
    $('.video-btn').click(function() {
        $videoSrc = $(this).data( "src" );
    });
    console.log($videoSrc);
    
      
      
    // when the modal is opened autoplay it  
    $('#myModal').on('shown.bs.modal', function (e) {
        
    // set the video src to autoplay 
    $("#video").attr('src',$videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    
    })
      
    
    
    // stop playing the youtube video when I close the modal
    $('#myModal').on('hide.bs.modal', function (e) {

//stoppit
      $("#video").attr('src',$videoSrc); 
    }) 
        

    });
    


    