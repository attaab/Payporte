  $(document).ready(function(){
    
    /*Ajax post for adding item requests*/
      $('#main-form').on('submit', function(){
    
          var item = $('#write');
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
    /*End of Ajax post for adding item requests*/

        /*Ajax delete request for todo tasks*/
      $('.delete').on('click', function(){
          var item = $(this).parent().attr('href'),
              id = item.slice(6);

          console.log("id for todo task " + id);
          //     stringLength = $(this).parent().text().length -1;
          // newItem = $(this).parent().text().slice(0, stringLength).replace(/ /g, "-")/*slicing out the appended X and replacing all spaces with hypens*/;

          $.ajax({
            type: 'DELETE',
            url: '/todo/' + id,
            success: function(data){
              //do something with the data via front-end framework
              location.reload();
            }
          });
      });
      /*End of Ajax delete request for todo tasks*/

        /*Ajax delete request for done tasks*/

        $('.delete_done').on('click', function(){
          var id = $(this).parent().attr('href');
              console.log("id for done task " + id);

          $.ajax({
            type: 'DELETE',
            url: '/done/' + id,
            success: function(data){
              //do something with the data via front-end framework
              location.reload();
            }
          });
      }); 
      /*End of Ajax delete request for done tasks*/

      /*creating function that allows x to be visible when it is hovered for done tasks*/
      // var delete_done = document.getElementsByClassName('delete_done');
      $('.done-tasks').on('mouseover', function () {
        $(this).children().addClass('show')
      });
      $('.done-tasks').on('mouseout', function () {
        $(this).children().removeClass('show')
     });
      /*End of creating function that allows x to be visible when it is hovered*/
      
        /*making the items draggable*/
        $('.drag').draggable({
          helper: 'clone',
          over: () => {
              console.log('hey its draggable');
          }
        });
        /*End of making the items draggable*/

        /*funcion for making the done arean droppable*/
        $('.drop').droppable({
          accept: '.drag',
          drop: (ev, ui) => {
              console.log('item dropped');
              var droppedItem = $(ui.draggable).clone(),
                 heldText = droppedItem.text().slice(0, droppedItem.text().length-1),/*this extracts the text in the dragged element*/
                  todo = {item: heldText};
                  
              console.log(heldText);

              /*using AJAX to send the text to Done tasks database*/
              $.ajax({
                type: 'POST',
                url: '/done',
                data: todo,
                success: function(data){
                  //do something with the data via front-end framework
                  location.reload();
                }
              });
    
          return false;
              /*End of using AJAX to send the text to Done tasks database*/
          }
        })
        /*End of funcion for making the done arean droppable*/
    
    });
    