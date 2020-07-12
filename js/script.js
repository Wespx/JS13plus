const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks();
		document.querySelector(blockSelector).style.display = 'block';
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), 

	tryFilterByType = (type, values) => {
		try {
			values = values.split(',');
			for (let i = 0; i < values.length; i++) {
				
				values[i] = values[i].trim();
				const firstChar = values[i].charAt(0);
				const lastChar = values[i].charAt(values[i].length - 1);

				values[i] = (firstChar === '\'' && lastChar === '\'') ? 
					values[i] = values[i].substring(1, values[i].length - 1) :
					(parseFloat(values[i])) ? parseFloat(values[i]) :
					(values[i] === 'false') ? false :
					(values[i] === 'true') ? true :
					'';
			}

			values = values.filter(value => value !== '');

			const valuesArray = filterByType(type, ...values).join(", ");
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			showResults(alertMsg);
		} catch (e) {
			showError(`Ошибка: ${e}`);
		}
	};

const filterButton = document.querySelector('#filter-btn');

filterButton.addEventListener('click', e => {
	const typeInput = document.querySelector('#type');
	const dataInput = document.querySelector('#data');

	if (dataInput.value === '') {
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		showNoResults();
	} else {
		dataInput.setCustomValidity('');
		e.preventDefault();
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});
