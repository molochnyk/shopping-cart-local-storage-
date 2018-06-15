window.onload = () => {

	
}
//-----VARIBLE
const shoppingBox = document.querySelector('.js-shoppingBox');
const shoppingBtn = document.querySelector('.js-shoppingBtn');
const getShopBtnClose = shoppingBox.querySelector('.js-shoppingView');
const goodsList = document.querySelector('.js-goodsList');
const shoppingWrap = document.querySelector('.shopping_wrap');
const goodsClear = document.querySelector('.js-goodsClear');



//-----LISTENERS
addEvent()
function addEvent() {
	shoppingBtn.addEventListener('click', shoppingView);
	getShopBtnClose.addEventListener('click', shoppingClose);
	goodsList.addEventListener('click',goodCart );
	shoppingWrap.addEventListener('click', removeProd);
	goodsClear.addEventListener('click', goodsAllClear)
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
		price: cartInfo.querySelector('p').textContent
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
			<p>${data.price}грн</p>
		</div>
		<button class="js-removeProd" data-id="${data.id}">&times;</button>
	`;
	shoppingWrap.appendChild(item);
};

//Удаляем товар из картизны по крестику
function removeProd(e) {
	if(e.target.classList.contains('js-removeProd')) {
		e.target.parentElement.remove()
	}
}

//Удаляем товарЫ из картизны по кнопке
function goodsAllClear() {
	while(shoppingWrap.firstElementChild) {
		shoppingWrap.removeChild(shoppingWrap.firstElementChild)
	}
}