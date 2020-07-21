window.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('.main');
    const preloader = document.getElementById('preloader');
    main.style.display = 'none';
    preloader.style.display = 'block';
    const getData = () => fetch('./db_cities.json');

    getData()
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Status: not 200');
            } else {
                return response.json();
            }
        })
        .then(data => {
            cityApp(data);
            main.style.display = '';
            preloader.style.display = 'none';
        })
        .catch(error => {
            console.error(error);
            preloader.textContent = 'Произошла ошибка';
        });

    const cityApp = (data) => {
        const input = document.getElementById('select-cities');
        const defaultList = document.querySelector('.dropdown-lists__list--default');
        const selectList = document.querySelector('.dropdown-lists__list--select');
        const autoCompleteList = document.querySelector('.dropdown-lists__list--autocomplete');
        const button = document.querySelector('.button');
        const closeButton = document.querySelector('.close-button');

        const createDropList = () => {
            const elem = document.createElement('div');
            elem.classList.add('dropdown-lists__col');
            return elem;
        };

        const getDefaultListData = () => {
            const countries = [];

            for (const item of data.RU) {
                const block = [];
                block.push({
                    'country': item.country,
                    'count': item.count
                });

                item.cities.sort((a, b) => {
                    return b.count - a.count;
                });

                for (let i = 0; i < 3; i++) {
                    block.push({
                        'city': item.cities[i].name,
                        'count': item.cities[i].count
                    });
                }

                countries.push(block);
            }

            return countries;
        };

        const getSelectListData = country => {
            let countryInfo;
            
            for (const item of data.RU) {
                if (item.country === country) {
                    countryInfo = item;
                }
            }

            return countryInfo;
        };

        const getautoCompleteListData = input => {
            input = input.toLowerCase();
            const matches = [];
            
            for (const item of data.RU) {
                const countryMatch = item.country.substring(0, (input.length));
                const countryMatchLower = countryMatch.toLowerCase();
                
                if (input === countryMatchLower) {
                    matches.push({country: `<i>${countryMatch}</i>` + item.country.substring(input.length), count: item.count});
                }

                for (let i = 0; i < item.cities.length; i++) {
                    const cityMatch = item.cities[i].name.substring(0, (input.length));
                    const cityMatchLower = cityMatch.toLowerCase();

                    if (input === cityMatchLower) {
                        matches.push({city: `<b>${cityMatch}</b>` + item.cities[i].name.substring(input.length), countryName: item.country});
                    }
                }
            }

            return matches;
        };

        const slideLeftAnimation = elem => {
            let requestId;
            let position = 100;
            elem.style.display = 'block';

            const animation = () => {
                if (position > 0) {
                    position -= 5;
                    elem.style.transform = `translateX(${position}%)`;
                    requestId = requestAnimationFrame(animation);
                } else {
                    cancelAnimationFrame(requestId);
                }
            };
            requestId = animation();
        };

        input.addEventListener('click', () => {
            const dropList = createDropList();
            const dropListData = getDefaultListData();
            
            if (!input.value) {
                button.setAttribute('href', '#');
                button.classList.add('disabled');
            }

            if (selectList.style.display === 'block') {
                return;
            }

            defaultList.innerHTML = '';
            autoCompleteList.innerHTML = '';
            defaultList.append(dropList);

            for (const arr of dropListData) {
                const block = document.createElement('div');
                block.classList.add('dropdown-lists__countryBlock');
                dropList.append(block);

                const country = arr[0];
                block.insertAdjacentHTML('beforeend', `
                    <div class="dropdown-lists__total-line">
                        <div class="dropdown-lists__country">${country.country}</div>
                        <div class="dropdown-lists__count">${country.count}</div>
                    </div>
                `);

                for (let i = 1; i < arr.length; i++) {
                    const city = arr[i];
                    
                    dropList.insertAdjacentHTML('beforeend', `
                        <div class="dropdown-lists__line">
                            <div class="dropdown-lists__city dropdown-lists__city--ip">${city.city}</div>
                            <div class="dropdown-lists__count">${city.count}</div>
                        </div>
                    `);
                }
            }

            defaultList.style.display = 'block';
        });

        input.addEventListener('input', (e) => {
            const value = input.value.trim();
            
            if (value !== '') {
                const matches = getautoCompleteListData(value);
                const dropList = createDropList();
                autoCompleteList.innerHTML = '';
                autoCompleteList.append(dropList);
            
                matches.forEach(item => {
                    if (item.country) {
                        const block = document.createElement('div');
                        block.classList.add('dropdown-lists__countryBlock');
                        dropList.append(block);

                        block.insertAdjacentHTML('beforeend', `
                            <div class="dropdown-lists__total-line">
                                <div class="dropdown-lists__country">${item.country}</div>
                                <div class="dropdown-lists__count">${item.count}</div>
                            </div>
                        `);
                    }

                    if (item.city) {
                        dropList.insertAdjacentHTML('beforeend', `
                        <div class="dropdown-lists__line">
                            <div class="dropdown-lists__city">${item.city}</div>
                            <div class="dropdown-lists__count">${item.countryName}</div>
                        </div>
                    `);
                    }
                });

                if (!matches.length) {
                    dropList.insertAdjacentHTML('beforeend', `
                        <div class="dropdown-lists__line--nothing-found">
                            Ничего не найдено
                        </div>
                    `);
                }
                
                defaultList.style.display = 'none';
                selectList.style.display = 'none';
                autoCompleteList.style.display = 'block';
                closeButton.style.display = 'block';
            } else {
                defaultList.style.display = 'block';
                autoCompleteList.style.display = 'none';
                closeButton.style.display = 'none';
            }
        });

        input.addEventListener('blur', () => {
            input.value = '';
            button.setAttribute('href', '#');
            button.classList.add('disabled');
            setTimeout(() => {
                autoCompleteList.style.display = 'none';
            }, 500);
        });

        defaultList.addEventListener('click', (e) => {
            const countryElem = e.target.matches('.dropdown-lists__total-line') ? e.target :
            e.target.closest('.dropdown-lists__total-line');
            
            if (countryElem) {
                const countryValue = countryElem.querySelector('.dropdown-lists__country').textContent;
                const dropList = createDropList();
                const dropListData = getSelectListData(countryValue);
        
                selectList.innerHTML = '';
                selectList.append(dropList);
                button.setAttribute('href', '#');
                button.classList.add('disabled');

                const block = document.createElement('div');
                block.classList.add('dropdown-lists__countryBlock');
                dropList.append(block);

                block.insertAdjacentHTML('beforeend', `
                    <div class="dropdown-lists__total-line">
                        <div class="dropdown-lists__country">${dropListData.country}</div>
                        <div class="dropdown-lists__count">${dropListData.count}</div>
                    </div>
                `);

                const cities = dropListData.cities;

                for (let i = 0; i < cities.length; i++) {
                    const city = cities[i];
                    
                    dropList.insertAdjacentHTML('beforeend', `
                        <div class="dropdown-lists__line">
                            <div class="dropdown-lists__city dropdown-lists__city--ip">${city.name}</div>
                            <div class="dropdown-lists__count">${city.count}</div>
                        </div>
                    `);
                }

                defaultList.style.display = 'none';
                slideLeftAnimation(selectList);
            }
        });

        selectList.addEventListener('click', (e) => {
            const countryElem = e.target.matches('.dropdown-lists__total-line') ? e.target :
            e.target.closest('.dropdown-lists__total-line');

            if (countryElem) {
                selectList.style.display = 'none';
                slideLeftAnimation(defaultList);
                button.setAttribute('href', '#');
                button.classList.add('disabled');
            }
        });

        autoCompleteList.addEventListener('click', (e) => {
            const countryElem = e.target.matches('.dropdown-lists__total-line') ? e.target :
            e.target.closest('.dropdown-lists__total-line');
            
            if (countryElem) {
                const countryValue = countryElem.querySelector('.dropdown-lists__country').textContent;
                const dropList = createDropList();
                const dropListData = getSelectListData(countryValue);
        
                selectList.innerHTML = '';
                selectList.append(dropList);

                const block = document.createElement('div');
                block.classList.add('dropdown-lists__countryBlock');
                dropList.append(block);

                block.insertAdjacentHTML('beforeend', `
                    <div class="dropdown-lists__total-line">
                        <div class="dropdown-lists__country">${dropListData.country}</div>
                        <div class="dropdown-lists__count">${dropListData.count}</div>
                    </div>
                `);

                const cities = dropListData.cities;

                for (let i = 0; i < cities.length; i++) {
                    const city = cities[i];
                    
                    dropList.insertAdjacentHTML('beforeend', `
                        <div class="dropdown-lists__line">
                            <div class="dropdown-lists__city dropdown-lists__city--ip">${city.name}</div>
                            <div class="dropdown-lists__count">${city.count}</div>
                        </div>
                    `);
                }

                defaultList.style.display = 'none';
                selectList.style.display = 'block';
            }
            autoCompleteList.style.display = 'none';
        });

        document.body.addEventListener('click', (e) => {
            const target = e.target.matches('.dropdown-lists__total-line') ||
            e.target.matches('.dropdown-lists__line') ? e.target :
            e.target.closest('.dropdown-lists__total-line') ||
            e.target.closest('.dropdown-lists__line');

            if (target) {
                const value = target.querySelector('.dropdown-lists__country') ?
                target.querySelector('.dropdown-lists__country').textContent :
                target.querySelector('.dropdown-lists__city').textContent;

                for (const item of data.RU) {
                    for (const city of item.cities) {
                        if (value === city.name) {
                            button.setAttribute('href', city.link);
                            button.classList.remove('disabled');
                        }
                    }
                }
                
                input.value = value;
                closeButton.style.display = 'block';
            }
        });

        closeButton.addEventListener('click', () => {
            input.value = '';
            defaultList.style.display = 'none';
            selectList.style.display = 'none';
            autoCompleteList.style.display = 'none';
            closeButton.style.display = 'none';
            button.setAttribute('href', '#');
            button.classList.add('disabled');
        });
    };
});
