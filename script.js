window.addEventListener('DOMContentLoaded', () => {

    const createCard = ({ name, realName, citizenship, species, gender, birthDay,
        deathDay, status, actors, photo, movies }) => {
        const container = document.getElementById('container');
        const card = `
        <div class="card">
            <img class="card-img" src="./${photo}" alt="${name}" onerror="this.src ='./dbimage/no-photo.jpg'">
            <h2 class="name">${name}</h2>
            <p class="description">
                <div class="real-name ${realName}"><strong>Настоящее имя:</strong> ${realName}</div>
                <div class="citizenship ${citizenship}"><strong>Гражданство:</strong> ${citizenship}</div>
                <div class="species ${species}"><strong>Раса:</strong> ${species}</div>
                <div class="gender ${gender}"><strong>Пол:</strong> ${gender}</div>
                <div class="birth-date ${birthDay}"><strong>Дата рождения:</strong> ${birthDay}</div>
                <div class="birth-date ${deathDay}"><strong>Дата смерти:</strong> ${deathDay}</div>
                <div class="status ${status}"><strong>Статус:</strong> ${status}</div>
                <div class="actors ${actors}"><strong>Актеры:</strong> ${actors}</div>
                <div class="movies ${movies}"><strong>Появления в кино:</strong> ${movies}</div>
            </p>
        </div>
        `;

        container.insertAdjacentHTML('beforeend', card);

        const noDataElems = container.querySelectorAll('.undefined');
        noDataElems.forEach(elem => elem.remove());
    };

    const renderCards = data => {
        const container = document.getElementById('container');
        container.innerHTML = '';
        if (data.length === 0) container.innerHTML = '<h2>Не найдено соответствий</h2>';
        data.forEach(item => {
            const {
                name,
                realName,
                citizenship,
                species,
                gender,
                birthDay,
                deathDay,
                status,
                arctors,
                photo
            } = item;

            createCard(item);
        });
    };

    const handleData = data => {
        data.forEach(item => {
            item.gender = (item.gender === 'male') ? 'мужской' : 'женский';
            item.species = (item.species === 'human') ? 'человек' : item.species;
            item.citizenship = (item.citizenship === 'American') ? 'США' :
                (item.citizenship === 'British') ? 'Великобритания' :
                    (item.citizenship === 'Soviet') ? 'СССР' : item.citizenship;
            item.status = (item.status === 'deceased') ? 'мертв' :
                (item.status === 'alive') ? 'жив' : 'неизвестен';
            if (item.movies) item.movies = item.movies.join();
        });

        renderCards(data);
    };

    const getData = filter => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status === 200) {
                let data = JSON.parse(xhr.response);

                if (!filter) {
                    handleData(data);
                    return;
                }

                if (filter.gender && filter.gender !== 'any') {
                    data = data.filter(item => item.gender === filter.gender);
                }

                if (filter.status && filter.status !== 'any') {
                    data = data.filter(item => item.status === filter.status);
                }

                if (filter.species && filter.species === 'human') {
                    data = data.filter(item => item.species === filter.species);
                } else if (filter.species && filter.species === 'other') {
                    data = data.filter(item => item.species !== 'human');
                }

                if (filter.citizenship && filter.citizenship !== 'other' && filter.citizenship !== 'any') {
                    data = data.filter(item => item.citizenship === filter.citizenship);
                } else if (filter.citizenship && filter.citizenship === 'other') {
                    data = data.filter(item => item.citizenship !== 'American' &&
                        item.citizenship !== 'Soviet' && item.citizenship !== 'British');
                }

                handleData(data);
            } else {
                throw new Error(`Ошибка ${xhr.status}!`);
            }
        });
        xhr.open('GET', './dbHeroes.json');
        xhr.setRequestHeader('Content-Type', 'application/JSON');
        xhr.send();
    };

    const filterData = () => {
        const filterElem = document.getElementById('filter');
        const filter = {};

        const filterByGender = value => {
            filter.gender = value;
            getData(filter);
        };

        const filterByStatus = value => {
            filter.status = value;
            getData(filter);
        };

        const filterByRace = value => {
            filter.species = value;
            getData(filter);
        };

        const filterByCitizenship = value => {
            filter.citizenship = value;
            getData(filter);
        };

        filterElem.addEventListener('input', event => {
            const target = event.target;
            if (target.matches('[name="choose-gender"]')) filterByGender(target.value);
            if (target.matches('[name="choose-status"]')) filterByStatus(target.value);
            if (target.matches('[name="choose-race"]')) filterByRace(target.value);
            if (target.matches('[name="choose-citizenship"]')) filterByCitizenship(target.value);
        });
    };

    getData();
    filterData();
});
