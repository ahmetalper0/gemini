function gemini() {
    var api_url = document.querySelector('.api-url').value;
    var prompt = document.querySelector('.prompt').value;
    var slider_element = document.querySelector('.slider');
    var request_number = slider_element.value;
    var results_container = document.querySelector('.result-container');

    results_container.innerHTML = '';

    if (api_url == '') {
        var div = document.createElement('div');
        div.classList.add('result');
        div.innerHTML = 'Lütfen bir API URL girin.';
        results_container.appendChild(div);
    } else {
        if (api_url.endsWith('/')) {
            api_url = api_url.slice(0, -1);
        }

        localStorage.setItem('api_url', api_url);

        var url = `${api_url}/api/gemini?request_number=${request_number}&prompt=${prompt}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                for (var i = 0; i < data['response'].length; i++) {
                    var div = document.createElement('div');
                    div.classList.add('result');
                    div.innerHTML = markdown_to_html(data['response'][i]['response']);
                    results_container.appendChild(div);
                }
            })
            .catch(error => {
                var div = document.createElement('div');
                div.classList.add('result');
                div.innerHTML = error;
                results_container.appendChild(div);
            });
    }
}

function markdown_to_html(markdown) {
    var converter = new showdown.Converter();
    var html = converter.makeHtml(markdown);
    return html;
}

var button_element = document.querySelector('.prompt-button');
button_element.addEventListener('click', gemini);
document.querySelector('.api-url').value = localStorage.getItem('api_url');

var slider_element = document.querySelector('.slider');
var slider_value_element = document.querySelector('.slider-value');

slider_value_element.innerHTML = `Kaç adet cevap oluşturmak istiyorsunuz : ${slider_element.value}`;

slider_element.oninput = function() {
    slider_value_element.innerHTML = `Kaç adet cevap oluşturmak istiyorsunuz : ${this.value}`;
};