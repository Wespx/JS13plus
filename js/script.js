//присваеваем в переменную filterByType функцию, принимающую значение type (тип данных)
//и values - неограниченное количество аргументов-данных, собирающихся в массив
//функция возвращает новый массив, содержащий данные, тип которых соответствует значению type
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	//присваеваем в переменную hideAllResponseBlocks функцию
	hideAllResponseBlocks = () => {
		//присваеваем в переменную responseBlocksArray массив, полученный из nodeList DOM-элементов с селектором div.dialog__response-block (все сообщения о результатах)
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		//задаем каждому элементу responseBlocksArray свойство display: none (скрываем все сообщения о результатах)
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	//присваеваем в переменную showResponseBlock функцию с параметрами blockSelector, msgText, spanSelector
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		 //выполняем функцию hideAllResponseBlocks (скрываем все сообщения о результатах)
		hideAllResponseBlocks();
 		//DOM-элементу, переданному в аргументе blockSelector задаем свойство display: block (показываем его)
		document.querySelector(blockSelector).style.display = 'block';
		//если функции был передан аргумент spanSelector
		if (spanSelector) {
			//задаем DOM-элементу с селектором spanSelector текст, значение которого равно значению аргумента msgText 
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	//присваеваем в переменную showError принимающую сообщение об ошибке функцию, которая выполняет функцию showResponseBlock, 
	//передает ей селектор DOM-элемента (красный div), полученное сообщение об ошибке и селектор спана, в который это сообщение будет вставлено
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	//присваеваем в переменную showResults принимающую сообщение об ошибке функцию, которая выполняет функцию showResponseBlock, 
	//передает ей селектор DOM-элемента (зеленый div), полученное сообщение о результатах выполнения программы
	//и селектор спана, в который это сообщение будет вставлено
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

	//присваеваем в переменную showNoResult функцию showResponseBlock, передаем ей селектор DOM-элемента (div с текстом "Пока что нечего показать")
	//функция присваевает этому div свойство display: block, т.е. делает его видимым на странице
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), 

	//присваеваем в переменную tryFilterByType функцию с параметрами type (значение селекта), values (значение инпута)
	tryFilterByType = (type, values) => {
		//выполняется код в данном блоке. если в коде имеется ошибка, его выполнение на ней прекращается,
		//после чего выполняется код в блоке catch
		try {
			//присваеваем в переменную valuesArray метод eval, который принимает строку с вызовом функции
			//filterByType, принимающей аргументы type и values, а результат выполнения этой функции (массив)
			//преобразуется в строку, каждый элемент массива в строке разделяется запятой и пробелом
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			//объявляем переменную alertMsg, значение которой зависит от длины строки valuesArray
			const alertMsg = (valuesArray.length) ? //если длина valuesArray существует (не равна нулю)
				`Данные с типом ${type}: ${valuesArray}` : //тогда значение alertMsg будет равно этой строке (данные с типом type: значение valuesArray)
				`Отсутствуют данные типа ${type}`; //иначе, выдаем сообщение об отсутствии в значении инпута данных типа type
			showResults(alertMsg); //выполняем функцию showResults, передаем ей значение alertMsg
		//если в коде блока try имеется ошибка, выполняется код в данном блоке,
		//который принимает сообщение о возникшей в блоке try ошибке
		} catch (e) {
			showError(`Ошибка: ${e}`); //выполняется функция showError, которой передается строка с сообщением об ошибке
		}
	};

const filterButton = document.querySelector('#filter-btn'); //присваеваем в переменную filterButton DOM-элемент кнопку "фильтровать"

filterButton.addEventListener('click', e => { //навешиваем обработчик событий на кнопку "фильтровать"
	const typeInput = document.querySelector('#type'); //присваеваем в переменную typeInput DOM-элемент select "тип данных"
	const dataInput = document.querySelector('#data'); //присваеваем в переменную typeInput DOM-элемент input "данные"

	if (dataInput.value === '') { //если значение инпута "данные" - пустая строка
		dataInput.setCustomValidity('Поле не должно быть пустым!'); //устанавливаем текст об ошибке для обязательного инпута "данные", оно показывается пользователю
		showNoResults(); //выполняем функцию showNoResults
	} else { //иначе
		dataInput.setCustomValidity(''); //текст об ошибке равен пустой строке, ошибки ввода нет
		e.preventDefault(); //предотвращаем перезагрузку страницы в связи с отправкой формы
		//выполняем функцию tryFilterByType, передаем ей очищенные от пробельных символов сначала и в конце значения селекта и инпута
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});
