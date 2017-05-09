$(document).ready(() => {
  $("#btn-submit-url").click(() => {
    let url = $('#input-url').val()
    // if(validate(url) => then continue else show errors)
    // alert(url)
    sendURL(url)
  })

})

function sendURL(url){
  // let data =
  // console.log('data',data);
  $.ajax('http://localhost:3000/api',
  {
    type:'post',
    contentType: 'application/json',
    dataType: 'application/json',
    data: JSON.stringify({"path": "dasdasdasdas"}),
    success: (data) =>{
      $('#output-url').text(data.url._id)
      console.log('success! ' + data);
    },
    error: (error) =>{
      console.log('error',error);
        $('#output-url').text(JSON.parse(error).url._id)
    }

  }
)

}
