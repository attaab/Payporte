$(document).ready(function(){
  
  /*Ajax post requests*/
    $('form').on('submit', function(){
  
        var item = $('form input');
        var todo = {item: item.val()};
  
        $.ajax({
          type: 'POST',
          url: '/todo',
          data: todo,
          success: function(data){
            //do something with the data via front-end framework
            location.reload();
          }
        });
  
        return false;
  
    });
    /*End of Ajax POST requests*/

      /*Ajax delete request*/
    $('.delete').on('click', function(){
        var item = $(this).parent().text().replace(/ /g, "-"),
            stringLength = $(this).parent().text().length -1;
        newItem = $(this).parent().text().slice(0, stringLength).replace(/ /g, "-")/*slicing out the appended X and replacing all spaces with hypens*/;

        $.ajax({
          type: 'DELETE',
          url: '/todo/' + newItem,
          success: function(data){
            //do something with the data via front-end framework
             location.reload();
          }
        });
    });
    /*End of Ajax delete request*/
  
  });
  