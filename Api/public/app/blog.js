(function(){

  $(document).ready(function(){
     $(".btn-primary").click(function(){
         console.log($(this));
         var textContent = $("#blogContent_"+this.id).val();
         var comment =$("#blogComment_"+this.id).val();
         console.log(textContent);
         var data = {
             id:this.id,
             blogContent:textContent,
             comment:comment
         };
         postDataToServer(data);
     })
  });
  var postDataToServer = function(data){
       $.ajax({
           url:"/updateBlog",
           method:"POST",
           data:data,
           success:function(req,res){
                console.log(res);
           },
           error:function(req,res){
               console.log(res);
           }
       })
  };


})();