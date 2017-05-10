$(document).ready(() => {
  const ip = 'https://urlthis.herokuapp.com'
  $("#btn-submit-url").click(() => {
    let url = $('#input-url').val()
    if (validateURL(url)) {
        sendURL(url)
    }
  })

  $("#btn-copy-url").click(() => {
    if($("#output-url").val())
    copyText()
    else
    alert('Output field is empty')
  })
  // validate the input url and returns whether there is an error
  function validateURL(url){
    var pattern = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
 if(!pattern.test(url)) {
   alert("Please enter a valid URL.");
   return false;
 } else {
   return true;
  }
}

function sendURL(url){
  // POST the url and get the id
  $.post(ip+ '/api',
  {
    "path": url,
  },
  (data,status) =>{
    if (status === 'success') {
        document.querySelector('#output-url').parentNode.MaterialTextfield.change(ip +'/' + data.url.key)
        $("#output-link").attr('href',ip +'/' + data.url.key)
        $("#output-link").text(ip +'/' + data.url.key)
         var successful = document.execCommand('copy');
         successful && showSnackBar()

    }
    else {
      alert('server error')
    }
    console.log('data',data);
    console.log('status',status);
  }
)}

// copies text and shows snackbar
function copyText(){
  var clip = new Clipboard('#btn-copy-url')
  showSnackBar()
}

function showSnackBar(){
  var notification = document.querySelector('.mdl-js-snackbar');
  notification.MaterialSnackbar.showSnackbar(
    {
      message: 'URL was Copied'
    }
);
}
})
