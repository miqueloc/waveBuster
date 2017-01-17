function getData () {

  var ss = SpreadsheetApp.getActiveSheet();
  var lastRow = ss.getLastRow()+1;

  var response = UrlFetchApp.fetch("http://magicseaweed.com/api/yourKeyToTheAPI/forecast/?spot_id=3535&units=eu");
  var json = response.getContentText();
  var data = JSON.parse(json);

  var waves = (data[1].swell.components.primary.height);
  var frequency = (data[1].swell.components.primary.period)
  var wind = (data[1].swell.components.primary.compassDirection);
  var rawtime = parseInt(data[1].timestamp);

  // Time stamp
  function convertTimestamp() {
    var d = new Date(rawtime * 1000),	// Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
          dd = ('0' + d.getDate(+1)).slice(-2),			// Add leading 0.
            hh = d.getHours(),
              h = hh,
                min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
                  ampm = 'AM',
                    time;

    if (hh > 12) {
      h = hh - 12;
      ampm = 'PM';
    } else if (hh === 12) {
      h = 12;
      ampm = 'PM';
    } else if (hh == 0) {
      h = 12;
    }

    // ie: 2013-02-18, 8:35 AM
    time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

    return time;
  }
  ss.getRange(lastRow, 1).setValue(convertTimestamp());
  ss.getRange(lastRow, 2).setValue(waves);
  ss.getRange(lastRow, 3).setValue(frequency);
  ss.getRange(lastRow, 4).setValue(wind);
}

if (getData(false)) {
  ss.getRange(lastRow, 1).setValue("No Data");
}
