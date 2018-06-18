window.onload = () => {
	
}
let prices = [];
//-----VARIBLE
const shoppingBox = document.querySelector('.js-shoppingBox');
const shoppingBtn = document.querySelector('.js-shoppingBtn');
const getShopBtnClose = shoppingBox.querySelector('.js-shoppingView');
const goodsList = document.querySelector('.js-goodsList');
const shoppingWrap = document.querySelector('.shopping_wrap');
const goodsClear = document.querySelector('.js-goodsClear');
const shoppingPrice = document.querySelector('.js-shoppingNum');


//-----LISTENERS
addEvent()
function addEvent() {
	shoppingBtn.addEventListener('click', shoppingView);
	getShopBtnClose.addEventListener('click', shoppingClose);
	goodsList.addEventListener('click',goodCart );
	shoppingWrap.addEventListener('click', removeProd);
	goodsClear.addEventListener('click', goodsAllClear);
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

	//Добавляем Цену Товара
	setTotalPrice(data);

	//Добавляем товар в локалСтораже
	saveLocalStorage(data)
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
	removeLocalStoragePrice(prod);
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
//--------------TOTAL PRICE
function removeLocalStoragePrice(prod) {
	let total = localStorage.getItem('total');
	let getItemPrice = prod.querySelector('.shopping_item_cont p').textContent;
	let itemPrice = getItemPrice.substr(0, getItemPrice.length - 3);
	let totals = Number(total) - Number(itemPrice);
	localStorage.setItem('total', JSON.stringify(totals));
	shoppingPrice.innerHTML = `${totals}`;
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
	
	//--------------TOTAL PRICE
	prices = [];
	shoppingPrice.innerHTML = 0;
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

	//--------------TOTAL PRICE
	if(localStorage.getItem('total') === null) {
		shoppingPrice.innerHTML = 0;
	} 
	else {
		let totalLocal = localStorage.getItem('total');	
		prices.push(+totalLocal)
		
		shoppingPrice.innerHTML = `${prices.join()}`;
	}
	//--------------TOTAL PRICE

}


//Добовляем всю цену 
function setTotalPrice(data) {
	let price = Number(data.price.split('грн')[0]);
	prices.push(price);
	let total = prices.reduce((sum, cur) => sum + cur);

	//-----------------TOTAL PRICE
	shoppingPrice.innerHTML = `${total}`;
	localStorage.setItem('total', JSON.stringify(total));
}