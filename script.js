document.addEventListener('DOMContentLoaded', () => {
    const url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
    const key = 'trnsl.1.1.20190704T212630Z.c409bb9604ae7251.df09dbd89372575b02298ed0970f8e45c749648b';

    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const select = document.getElementById('choose');
    const button = document.getElementById('button');

    const translate = () => {
        let text = input.value.trim();
        const lang = select.value;

        if (!text) {
            input.style.outline = '1px solid red';
            setTimeout(() => {
                input.style.outline = '';
            }, 150);
            return;
        }

        text = encodeURI(text);

        const response = fetch(url + '?lang=' + lang + '&key=' + key + '&text=' + text, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Host': 'translate.yandex.net'
            },
            body: text
        });

        return response;
    };

    button.addEventListener('click', () => {
        try {
            translate()
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('Status: not 200');
                    } else {
                        return response.json();
                    }
                })
                .then(data => output.value = data.text)
                .catch(error => {
                    console.error(error);
                    output.style.outline = '1px solid red';
                    output.value = 'Произошла ошибка';
                    setTimeout(() => {
                        output.style.outline = '';
                        output.value = '';
                    }, 1000);
                });
        } catch (error) {
            console.error('Произошла ошибка: ' + error.message);
        }
    });
});
