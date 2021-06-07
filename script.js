//UTCをミリ秒に(1000倍する)
function utcToJST(utcTime) {
    return utcTime * 1000;
}


    var API_KEY = 'cae9dcba5d310759d2441ac671cca0d7';
    var defaultCity = 'Tokyo';
    var AAA = 'KKK'+defaultCity + API_KEY;
    

//天気情報を取得
function getData() {

//  var url = 'https://api.openweathermap.org/data/2.5/forecast?q='+defaultCity +',jp&units=metric&APPID=' + API_KEY;

    const status = document.getElementById('status');

    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/forecast?q='+defaultCity +',jp&units=metric&APPID=' + API_KEY,
        dataType: 'json',
        type: 'GET',
        data: {
            lang: 'ja'
        }
    })
    .done(function(data) {
        // console.log(data);
        

        // 天気予報データ
        data.list.forEach(function(forecast, index) {
            const dateTime = new Date(utcToJST(forecast.dt));
            const month = dateTime.getMonth() + 1;
            const date = dateTime.getDate();
            const hours = dateTime.getHours();
            const min = String(dateTime.getMinutes()).padStart(2, '0');
            const temperature = Math.round(forecast.main.temp);
            const description = forecast.weather[0].description;
            const iconPath = 'https://openweathermap.org/img/w/' + forecast.weather[0].icon + '.png';

            console.log('日時：' + `${month}/${date} ${hours}:${min}`);
            console.log('気温：' + temperature);
            console.log('天気：' + description);
            console.log('アイコンのパス：' + iconPath);

                        // 現在の天気とそれ以外で出力を変える
                        if(index === 0) {
                            const currentWeather = `
                            <div class="icon"><img src="${iconPath}"></div>
                            <div class="info">
                                <p>
                                    <span class="description">現在の天気 ： ${description}</span>
                                    <span class="temp">${temperature}</span>°C
                                </p>
                            </div>`;
                            $('#weather').html(currentWeather);
                            $('#city').text(defaultCity);

                            
                            
                        } else {
                            const threeWeather = `
                            <tr>
                                <td class="info">
                                    ${month}月${date}日 ${hours}:${min}
                                </td>
                                <td class="icon"><img src="${iconPath}"></td>
                                <td><span class="description">${description}</span></td>
                                <td><span class="temp">${temperature}°C</span></td>
                            </tr>`;
                            $('#forecast').append(threeWeather);
                        }

        });
    
    })

    
    .fail(function(data){
        console.log('天気情報の取得に失敗しました。');
        status.innerHTML = '天気情報の取得に失敗しました。';
        
    })


}
//ローディング画像を消す
$(window).on('load', function(){
    $('#loading').fadeOut();
  });

getData();




