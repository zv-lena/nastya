let basket_list = document.querySelector(".basket"); //секция корзины
let basket = document.querySelector("div"); //корзина
let basketButton = document.querySelector("buttom"); //корзина кнопка
let product  = document.querySelectorAll(".product");
let total_items = 0; //общее кол-во
let total_price = 0; //общая цена
let none = true; //переменная для скрытия листа корзины

/*скрытие и показ листа корзины*/
basket.addEventListener('click', function(){
	
	if(none){
		$(basket_list).hide();
		$('.product').show();	
		none = false;
	} else {
		$(basket_list).show();
		$('.product').hide();
		none = true;

	}
});


$(function () {

		$(".product img").draggable({
			revert:true
		});
        
		$(basket).droppable({
			tolerance:"touch",//хотябы на 1px над корзиной
			drop:function (event, ui) {//когда продукт оставлен в корзине
				let basket = $(this),
				move = ui.draggable,
				price = $(move).attr('data-price');//цена товара
				itemId = $('.basket_list li[data-id="' + move.attr("data-id") + '"]');//ID товара
				


				/*Если такой товар уже есть в корзине то добавляем +1 к количеству*/
				if (itemId.html() != null) {
					itemId.find("input").val(parseInt(itemId.find("input").val()) + 1);
					total_price += parseFloat(price);
					let count = itemId.find("input").val();//цол-во товара
					price = parseFloat(price) * parseInt(count);
					++total_items;
					$(".priceValue").html(total_price);
					$(".countValue").html(total_items);
					itemId.find(".price").text(price);
					}
				else {
					addBasket(basket, move);
					move.find("input").val(parseInt(move.find("input").val()) + 1);
				}
			}
		});

		/*добавление товара в корзину*/
        function addBasket(basket, move) {
        	let price = $(move).attr('data-price');//цена товара
			$(".basket_list").append('<li data-id="' + move.attr("data-id") + '">'
					+ '<span class="name">' + move.attr("data-name")+ '</span>'
					+ '<span class="price">' + move.attr("data-price")+ '</span>'
					+ '<input class="count" value="1" type="text">'
					+ '<button class="delete">&#10005;</button>');
			total_price += parseFloat(price);
			++total_items;
			$(".priceValue").html(total_price);
			$(".countValue").html(total_items);

			 // Функция для удаления товара из списка 
        	$('.basket_list li[data-id="' + move.attr("data-id") + '"] .delete').click(function () { 
				$(this).closest("li").remove(); 
				let product = $(this).closest("li");
				$(".priceValue").html(parseFloat($(".priceValue").html()) - (product.find("input").val() * product.find(".price").html()));
				$(".countValue").html(parseFloat($(".countValue").html()) - product.find("input").val());
			});
		}
	


       

    });