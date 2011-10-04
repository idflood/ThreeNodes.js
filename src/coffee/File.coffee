#some refs
# http://www.w3.org/TR/2011/WD-file-writer-api-20110419/#examples
# https://developer.mozilla.org/en/Using_files_from_web_applications
# http://stackoverflow.com/questions/5744064/html5-file-api-reading-in-an-xml-text-file-and-displaying-it-on-the-page
# http://stackoverflow.com/questions/1290321/convert-string-to-xml-document-in-javascript
# http://www.html5rocks.com/en/tutorials/file/dndfiles/

save_local_file = () ->
  bb = new BlobBuilder()
  console.log window
  bb.append("<app><nodes><node>Lorem ipsum 42</node></nodes></app>")
  fileSaver = saveAs(bb.getBlob("text/plain;charset=utf-8"), "nodes.xml")

load_local_file = () ->
  $("#main_file_input_open").click()
  
load_local_file_input_changed = (e) ->
  console.log "loading file"
  file = this.files[0]
  reader = new FileReader()
  reader.onload = (e) ->
    txt = e.target.result
    console.log txt
    loaded_data = $(txt)
    console.log loaded_data
  reader.readAsText(file, "UTF-8")
  