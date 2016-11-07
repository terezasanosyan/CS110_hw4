const clearList=function()
      {
        $("#todoList").html("");
      }
      const appendButton=function(data)
      {
        data.items.forEach(function (todoItem)
         {
              
               let li_item=$("<li >"+todoItem.message+
               '<input type="checkbox" id='+todoItem.id+
               ' onclick=updateTodo(this.id)> </input>'+' <button id='+
               todoItem.id+' onclick=deleteTodo(this.id)>Delete</button>'
               +"</li>");


               li_item.find("input").prop("checked",todoItem.completed);
               $("#todoList").append(li_item);
        });

      }
      //This requests the todo items on page load
      const drawList=function()
      {
        clearList();
        $.ajax(
        {
        url: "/todos",
        type: "get",
        dataType: "JSON", //We expect JSON as response
        data: { "default-post":"Loading the page" }, //sent to the server
        contentType: "utf-8",
        success: function(data)// calls the function, with the response data
        {
          appendButton(data);
        },
          error: function(e)
          {
            console.log("not good");
            alert("not good");
          }});
        };
drawList();
      const updateTodo=function(todoItem)
      {
        $.ajax({
              url         : "/todos/" + todoItem,
              type        : 'put',
              success     : function() {
                drawList();
              }
              });
      };

        const deleteTodo =function(itemID)
        {
            $.ajax({
                url     : "/todos/" + itemID,
                type    : 'delete',
                success : function(data) {
                  drawList();
                },
                error   : function(data) {
                    alert('Error deleting');
                }
            });
        };


      $("#addBtn").on("click",function()
      {

        const val = $('#addTodoTxt').val();
        if(val=="")return;
        $('#addTodoTxt').val(''); // clear the textbox

        $.ajax({
            url         : "/todos",
            type        : 'post',
            dataType    : 'json',
            data        : JSON.stringify({
                message   : val,
                completed : false
            }),
            contentType : "application/json; charset=utf-8",
            success     : function(data) {
              drawList();
                // refresh the list (re-run the search query)
            },
            error       : function(data) {
                alert('Error creating ');
            }
        });
      });

      //Search for the todo items on click
    $("#searchBtn").on("click",function(e)
    {

          $.ajax(
            {
            url: "/todos",
            type: "get",
            dataType: "JSON",
            data: { "searchtext":$("#searchTxt").val() },
            contentType: "application/x-www-form-urlencoded;utf-8",
            success: function(recieved_data)
            {
              clearList();
              appendButton(recieved_data);
            },
              error: function(e)
              {

                alert("not good");
              }

           });
    });