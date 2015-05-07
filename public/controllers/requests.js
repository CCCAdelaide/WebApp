
var baseURL = "http://146.118.97.29:5984/test_db/_design/adelaideview/_list/adelaideshow/";
//feelings

JSONTest = function() {
    console.log('JSONTest()');
    var resultDiv = $("#resultDivContainer");

    $.ajax({
        url: baseURL+"feelings",
        type: "GET",
        success: function (result) {
            switch (result) {
                //case true:
                  //  processResponse(result);
                  //  break;
                default:
                    resultDiv.html(result);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
        }
    });
};
