$(document).ready(() => {
  getDataToTable()

  const ip = 'https://urlthis.herokuapp.com'
  $("#btn-submit-url").click(() => {
    let url = $('#input-url').val()
    // send the url to the server if is valid
    if (validateURL(url)) {
        sendURL(url)
    }
  })

  // copy url on copy button
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
      // changes the text in the input to the generated url
        document.querySelector('#output-url').parentNode.MaterialTextfield.change(ip +'/' + data.url.key)
        $("#output-link").attr('href',ip +'/' + data.url.key)
        $("#output-link").text(ip +'/' + data.url.key)
         var successful = document.execCommand('copy');
         successful && showSnackBar()
        //  adds a row of the generated url
         $('.mdl-data-table > tbody:last-child').append('<tr> <td class="mdl-data-table__cell--non-numeric">' + '<a href=' + data.url.path + ' >' + data.url.path + '</a> </td> <td class="mdl-data-table__cell--non-numeric">' + '<a href=' + ip + '/'+  data.url.key  + ' >' + ip + '/'+ data.url.key + '</a> </td> <td>' + data.url.clicks + '</td> </tr>')

    }
    else {
      alert('server error')
    }
  }
)}

// GET the data from the server and fill the table with it
function getDataToTable(){
  $.get(ip + '/all',
  (data,status) =>{
    if (status === 'success') {
      let urls = data.urls
      for (var i = 0; i < urls.length; i++) {
        $('.mdl-data-table > tbody:last-child').append('<tr> <td class="mdl-data-table__cell--non-numeric">' + '<a href=' + urls[i].path + ' >' + urls[i].path + '</a> </td> <td class="mdl-data-table__cell--non-numeric">' + '<a href=' + ip + '/'+  urls[i].key  + ' >' + ip + '/'+ urls[i].key + '</a> </td> <td>' + urls[i].clicks + '</td> </tr>')
      }
    }
    else
    alert('server error')
  }
)
}

// copies text and shows snackbar
function copyText(){
  var clip = new Clipboard('#btn-copy-url')
  showSnackBar()
}
// displays a snackbar after text is copied
function showSnackBar(){
  var notification = document.querySelector('.mdl-js-snackbar');
  notification.MaterialSnackbar.showSnackbar(
    {
      message: 'URL was Copied'
    }
);
}
})
