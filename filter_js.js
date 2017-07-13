jQuery(document).ready(function($){
    var defaults = {
        form: $('#filter'),
        ajax_timeout: false,
        delay_beforesend: 1000
    };

    // Собираем данные для запроса
    var data_form = {
        action: 'myfilter',
        query: '',
        nonce: wpcfajax.nonce
    };

    // Сброс данных или переход к начальной странице
    function resetForm() {
       window.location = location.protocol + '//' + location.hostname
    }

    $(defaults.form).find('input[type="reset"]').click(function(){
        resetForm();
    });

    // Отправляем запрос
    function sendForm(data_form) {

        $.ajax({
            url: wpcfajax.url,
            data: data_form, // form data
            type: 'POST', // POST
            beforeSend:function(xhr){
                $('.but').text('Загрузка...');
            },
            success:function(data){
                $('.but').text('');
                $('#response').html(data);
            }
        });

    };

    function activatForm() {

        // Получаем с формы данные и преобразуем их в массив
        var str          = $(defaults.form).serialize(),
            str_array    = str.split('&');

        // Проверяем на пустоту параметров
        if (str.length == 0) {
            resetForm();
        } else {
            // Разбираем полученый массив и соеденяем дублирующися параметры
            var result = {};
            str_array.forEach(function(item){
                var pair = item.split('=');
                if(!result.hasOwnProperty(pair[0])){
                    result[pair[0]] = pair[1]
                } else {
                    result[pair[0]] += ','+ pair[1] // Разделяем значения дублирующих параметров
                }
            });

            // Преобразуем полученый результат в строку URL и декодируем закодированые символы
            var url = '?' + decodeURIComponent($.param(result));

            // Изменяем адресную строку браузера
            history.pushState({}, '', url);

            // Запускаем функцию Ajax запроса
            data_form.query = location.search.slice(1);
            sendForm(data_form);
        }

    };

    // Вешаем событие на popstate которое срабатывает при нажатии back/forward в браузере
    $(window).on('popstate', function(e) {
        if(location.search != '') {
            data_form.query = location.search.slice(1);
            sendForm(data_form);
        } else {
            resetForm();
        }
    });

    // При перезагрузки страницы или если параметры заданы вручную
    // проверяем адресную строку на наличеие GET запроса
    if(location.search != '') {
        data_form.query = location.search.slice(1);
        sendForm(data_form);
    } else {

    }

    // При изменении формы запускаем обработку данных
    $(defaults.form).find('select, input').change(function(){

        // Сбрасываем метод submit
        $(defaults.form).closest('form').submit(function(e) {
            e.preventDefault();
        });

        // Таймаут выполнения
        if(defaults.ajax_timeout) clearTimeout(defaults.ajax_timeout);
        defaults.ajax_timeout = setTimeout(activatForm, defaults.delay_beforesend)
    });

    // При клике на кнопку отправить
    $(defaults.form).find('input[type="submit"]').click(function(){

        // Сбрасываем метод submit
        $(defaults.form).closest('form').submit(function(e) {
            e.preventDefault();
        });

        // Таймаут выполнения
        if(defaults.ajax_timeout) clearTimeout(defaults.ajax_timeout);
        defaults.ajax_timeout = setTimeout(activatForm, defaults.delay_beforesend)
    });


});