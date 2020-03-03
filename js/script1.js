 $(function () {
		// jQuery UI Draggable
		$(".product li").draggable({
		
			// возвращает товар обратно на свое место после перетаскивания
			revert:true,
		
			// как только начинается перетаскивание мы делаем прозрачными остальные объекты
			// добавляем класс CSS
			drag:function () {
				$(this).addClass("active");
				$(this).closest(".product").addClass("active");
			},
		
			// удаляем CSS класс после перетаскивания
			stop:function () {
				$(this).removeClass("active").closest(".product").removeClass("active");
			}
		});

        // jQuery Ui Droppable
		$(".basket").droppable({
		
			// CSS класс для корзины, срабатывает в момент начала перетаскивания товара
			activeClass:"active",
		
			// CSS класс для корзины при появлении товара в области корзины
			hoverClass:"hover",
		
			// Определим режим сбрасывания. Сбросить товар можно при приближении к корзине
			tolerance:"touch",
			drop:function (event, ui) {
		
				var basket = $(this),
						move = ui.draggable,
						itemId = basket.find("ul li[data-id='" + move.attr("data-id") + "']");
		
				// Если такой товар уже есть в корзине то добавляем +1 к количеству
				if (itemId.html() != null) {
					itemId.find("input").val(parseInt(itemId.find("input").val()) + 1);
				}
				else {
					// Иначе добавляем товар в корзину (функция ниже)
					addBasket(basket, move);
		
					// И добавляем количество
					move.find("input").val(parseInt(move.find("input").val()) + 1);
				}
			}
		});

        // Эта функция добавляет новый элемент списка в корзину
        function addBasket(basket, move) {
			basket.find("ul").append('<li data-id="' + move.attr("data-id") + '">'
					+ '<span class="name">' + move.find("h3").html() + '</span>'
					+ '<input class="count" value="1" type="text">'
					+ '<button class="delete">&#10005;</button>');
		}


        // Функция для удаления товара из списка 
        $(".basket ul li button.delete").on("click", function () {
			$(this).closest("li").remove();
		});

    });