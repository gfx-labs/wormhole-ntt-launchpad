// Load JSON text from server hosted file and return JSON parsed object
function loadJSON(filePath) {
  // Load json file;
  var json = loadTextFileAjaxSync(filePath, 'application/json')
  // Parse json
  return JSON.parse(json)
}

// Load text with Ajax synchronously: takes path to file and optional MIME type
function loadTextFileAjaxSync(filePath, mimeType) {
  var xmlhttp = new XMLHttpRequest()
  xmlhttp.open('GET', filePath, false)
  if (mimeType != null) {
    if (xmlhttp.overrideMimeType) {
      xmlhttp.overrideMimeType(mimeType)
    }
  }
  xmlhttp.send()
  if (xmlhttp.status == 200 && xmlhttp.readyState == 4) {
    return xmlhttp.responseText
  } else {
    // TODO Throw exception
    return null
  }
}

let ofacList = {}

let ofacListUrl = 'https://cdn.oku.trade/ofac.json'
if (window.ConfigJsStaticOptions) {
  if (window.ConfigJsStaticOptions.OfacListUrl) {
    if (window.ConfigJsStaticOptions.OfacListUrl.url) {
      ofacListUrl = window.ConfigJsStaticOptions.OfacListUrl.url
    }
  }
}

ofacList = loadJSON(ofacListUrl)

window.OkuOfacList = ofacList
