window.addEventListener('load', function() {
  getTrainList();
});

function getTrainList() {
  var url = 'https://covid19-japan-web-api.vercel.app/api/v1/statistics';
  fetch(url)
  .then(function (data) {
    return data.json(); // 読み込むデータをJSONに設定
  })
  .then(function (json) {
    for (var i = 0; i < json.length; i++) {
      var name_ja = json[i].name_ja;
      var total_count = json[i].total_count;

      var row = document.getElementById('train-list').insertRow();
      row.insertCell().textContent = i + 1;
      row.insertCell().textContent = name_ja;
      row.insertCell().textContent = total_count;
    }
  });
}