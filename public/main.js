function htmlDecode(input){
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

ready(function() {
  var editors = document.querySelectorAll('.code');
  for (var i = 0; i < editors.length; i++) {
    CodeMirror(editors[i], {
      value: htmlDecode(editors[i].querySelector('pre').innerHTML),
      mode: 'jsx',
      lineNumbers: true,
      readOnly: editors[i].getAttribute('data-readonly') != null,
      theme: 'react',
    });
    editors[i].querySelector('pre').remove();
  }
});
