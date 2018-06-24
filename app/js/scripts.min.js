const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+-?/=_()*&^%$#@!';
const ID_LENGTH = 10;
const generate = () => {
  let rtn = '';
  for (let i = 0; i < ID_LENGTH; i++) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
}
//------------------------//

//-----VARIBLE
const shoppingBox = document.querySelector('.js-shoppingBox');
const shoppingBtn = document.querySelector('.js-shoppingBtn');
const getShopBtnClose = shoppingBox.querySelector('.js-shoppingView');
const goodsList = document.querySelector('.js-goodsList');
const shoppingWrap = document.querySelector('.shopping_wrap');
const goodsClear = document.querySelector('.js-goodsClear');
const shoppingPrice = document.querySelector('.js-shoppingNum');
const numberGoods = document.querySelector('.js-numberGoods');
const popupBtnBuy = document.querySelector('.js-popup');
const popupBuy = document.querySelector('.js-buyPopup');
const popupBtnExit = document.querySelector('.buyPopup_exit');

//-----LISTENERS
addEvent()
function addEvent() {
	shoppingBtn.addEventListener('click', shoppingView);
	getShopBtnClose.addEventListener('click', shoppingClose);
	goodsList.addEventListener('click',goodCart );
	shoppingWrap.addEventListener('click', removeProd);
	goodsClear.addEventListener('click', goodsAllClear);
	popupBtnBuy.addEventListener('click', handlerBtnBuy);
	popupBtnExit.addEventListener('click', handlerBtnExitPopup);
	document.addEventListener("DOMContentLoaded", getReadyLocalStorage);
};



//-----function listeners
function shoppingView() {
	shoppingBox.classList.toggle('isActive');
};
function shoppingClose() {
	shoppingBox.classList.toggle('isActive');
};
///////APP
function goodCart(e) {
	if(e.target.classList.contains('js-btnBuy')) {
		const shopCart = e.target.parentElement.parentElement;
		let btn = e.target.parentElement.lastElementChild;
		btn.setAttribute('data-id', generate());
		getGoodInfo(shopCart);
	};
};

//Получение Информации с Карточки товара
function getGoodInfo(cartInfo) {
	const goodData = {
		id: cartInfo.querySelector('button').getAttribute('data-id'),
		img: cartInfo.querySelector('img').src,
		title: cartInfo.querySelector('h4').textContent,
		price: cartInfo.querySelector('p').textContent,
	};
	addToCart(goodData);
};

//Добовляем товар в корзину
function addToCart(data) {
	const item = document.createElement('div');
	item.className = 'shopping_item';
	item.innerHTML = `
		<img src="${data.img}" width="100" alt="${data.title}">
		<div class="shopping_item_cont">
			<h5>${data.title}</h5>
			<p>${data.price}</p>
		</div>
		<button class="js-removeProd" data-id="${data.id}">&times;</button>
	`;
	shoppingWrap.appendChild(item);

	//Добавляем товар в локалСтораже
	saveLocalStorage(data);
	//Количество товаров в корзине
	getLocalNumberProd();
};
//Запись ЛОКАЛ СТОРАЖ
function saveLocalStorage(data) {
	let prod = getLocalStorage();
	prod.push(data);
  localStorage.setItem('goods', JSON.stringify(prod))
}
//Проверка ЛОКАЛ СТОРАЖ
function getLocalStorage() {
	let goods;
  if(localStorage.getItem('goods') === null) {
    goods = [];
  } else {
    goods = JSON.parse(localStorage.getItem('goods'))
  }
  return goods;
}


//Удаляем товар из корзины по крестику
function removeProd(e) {
	let prod;
	let prodsID;
	if(e.target.classList.contains('js-removeProd')) {
		e.target.parentElement.remove();
		prod = e.target.parentElement;
		prodsID = prod.querySelector('button').getAttribute('data-id')
	}
	removeLocalStorage(prodsID);

	//Количество товаров в корзине
	getLocalNumberProd();
}
//Удаляем товар из корзины по крестику(LOCAL STORAGE)
function removeLocalStorage(id) {
	let goods = getLocalStorage();
	goods.forEach((el, i) => {
    if(el.id === id) {
      goods.splice(i, 1);
    }
  });
	localStorage.setItem('goods', JSON.stringify(goods));

}


//Удаляем товарЫ из корзины по кнопке
function goodsAllClear() {
	while(shoppingWrap.firstElementChild) {
		shoppingWrap.removeChild(shoppingWrap.firstElementChild)
	}
	clearLocalStorege();
}
//Удаляем товарЫ из корзины по кнопке(LOCAL STORAGE)
function clearLocalStorege() {
	localStorage.clear()
	
	//Количество товаров в корзине
	numberGoods.textContent = 0;
	numberGoods.style.display = 'none';
}


//отрисовываем данные из ЛОКАЛ-СТОРАЖА
function getReadyLocalStorage() {
	let goods = getLocalStorage();
	goods.forEach(data => {
		const item = document.createElement('div');
		item.className = 'shopping_item';
		item.innerHTML = `
			<img src="${data.img}" width="100" alt="${data.title}">
			<div class="shopping_item_cont">
				<h5>${data.title}</h5>
				<p>${data.price}</p>
			</div>
			<button class="js-removeProd" data-id="${data.id}">&times;</button>
		`;
		shoppingWrap.appendChild(item);
	});

	//Количество товаров в корзине
	getLocalNumberProd()
}

//Количество товаров в корзине
function theNumberProducts() {
	let goods = localStorage.getItem('goods');
	let arr = JSON.parse(goods)
	numberGoods.textContent = arr.length;
};
//Количество товаров в корзине(ПРОВЕРКА)
function getLocalNumberProd() {
	let NumberProducts = localStorage.getItem('goods');
	if(NumberProducts === null || JSON.parse(NumberProducts).length === 0) {
		numberGoods.style.display = 'none';
	}
	else {
		numberGoods.style.display = 'block';
		theNumberProducts();
	}
}

//Попап покупки
function handlerBtnBuy() {
	popupBuy.classList.toggle('is-Active');
	shoppingBox.classList.toggle('isActive');



}
function handlerBtnExitPopup() {
	popupBuy.classList.toggle('is-Active');
}