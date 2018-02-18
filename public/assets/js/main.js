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

        /*Ajax delete request for todo tasks*/
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
      /*End of Ajax delete request for todo tasks*/

        /*Ajax delete request for todo tasks*/

        $('.delete_done').on('click', function(){
          var item = $(this).parent().text().replace(/ /g, "-"),
              stringLength = $(this).parent().text().length -1;
              newItem = $(this).parent().text().slice(0, stringLength).replace(/ /g, "-")/*slicing out the appended X and replacing all spaces with hypens*/;

          $.ajax({
            type: 'DELETE',
            url: '/done/' + newItem,
            success: function(data){
              //do something with the data via front-end framework
              location.reload();
            }
          });
      });
      /*End of Ajax delete request for todo tasks*/

      /*creating function that allows x to be visible when it is hovered for done tasks*/
      // var delete_done = document.getElementsByClassName('delete_done');
      $('.done-tasks').on('mouseover', function () {
        $(this).children().addClass('show')
      });
      $('.done-tasks').on('mouseout', function () {
        $(this).children().removeClass('show')
     });
      /*End of creating function that allows x to be visible when it is hovered*/
      
      
    
    });
    