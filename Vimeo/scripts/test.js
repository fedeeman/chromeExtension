/*var username = "xfedor03@stud.fit.vutbr.cz";
var password = "audeliver";
$.ajax
  ({
    type: "GET",
    beforeSend: function (xhr) {
    xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
},
    url: "http://audeliver.com/api/user",
    dataType: 'json',
    async: false,
    //data: '{"username": "' + username + '", "password" : "' + password + '"}',
    success: function (){
    alert('Thanks for your comment!'); 
    },
    error: function(jqXHR,error, errorThrown) {  
        alert(username + password+jqXHR.status);
    }

});*/