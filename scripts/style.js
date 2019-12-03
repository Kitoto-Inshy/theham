//Функція перемикання вкладок секції "Our services".
$('.our-servises-tab').click(function (event) {
    event.preventDefault();
    $(this).addClass('active')
        .siblings()
        .removeClass('active')
        .closest('.our-servises')
        .find('.tab')
        .removeClass('active')
        .eq($(this).index())
        .addClass('active');
});

//Функція додавання 12-ти малюнків за допомогою кнопки "Load more" в секції "Our amazing work".
$('.our-amazing-work .btn').click(function (event) {
    event.preventDefault();
    const $picsOff = $('.our-amazing-work-pics .our-amazing-work-img-wrap[data-status="off"]');
    const loaderBtn = $('.our-amazing-work .btn');
    const loader = createLoader();
    loaderBtn.before(loader);
    $('.our-amazing-work .btn').hide();
    setTimeout(() => {
        for (let i = 0; i < 12; i++) {
            $picsOff.eq(`${i}`).show(500).attr('data-status', 'on');
            loader.style.display = 'none';
            $('.our-amazing-work .btn').show();
            if ($picsOff.length <= 12) {
                $('.our-amazing-work .btn').remove();
            };
        };
    }, 2000);
});

//Вибір категорії малюнків в секції "Our amazing work".
$('.our-amazing-work-link').click(function (event) {
    event.preventDefault();
    $('.our-amazing-work-tab .our-amazing-work-link')
        .removeClass('active');
    $(this).addClass('active');
    let $showenPics = $('.our-amazing-work-img-wrap[data-status="on"]');
    let $dataType = event.currentTarget.dataset["type"];
    if ($dataType) {
        $showenPics.filter(`[data-type="${$dataType}"]`)
            .show()
            .siblings(`.our-amazing-work-img-wrap[data-type!="${($dataType)}"].our-amazing-work-img-wrap[data-status="on"]`)
            .hide();
            $('.our-amazing-work .btn').hide();

    } else {
        $showenPics.show();
        $('.our-amazing-work .btn').show();
    };
});

//Карусель в секції "What people say about theHam".
(function () {
    showInfo();
}());

$('.person-next-btn').click(function (event) {
    event.preventDefault();
    let $selectedPerson = $('.person-photo.focus');
    if ($selectedPerson.next().hasClass('slider-btn')) {
        $('.person-photo').first().addClass('focus').siblings().removeClass('focus');
    } else {
        $selectedPerson.next().addClass('focus').siblings().removeClass('focus');
    };
    showInfo();
});

$('.person-previous-btn').click(function (event) {
    event.preventDefault();
    let $selectedPerson = $('.person-photo.focus');
    if ($selectedPerson.prev().hasClass('slider-btn')) {
        $('.person-photo').last().addClass('focus').siblings().removeClass('focus');
    } else {
        $selectedPerson.prev().addClass('focus').siblings().removeClass('focus');
    };
    showInfo();
});

$('.person-photo').click(function (event) {
    $(this).addClass('focus').siblings().removeClass('focus');
    showInfo();
});

function showInfo() {
    $('.person-name').text(`${$('.focus').attr('data-name')}`);
    $('.person-position').text(`${$('.focus').attr('data-position')}`);
    $('.person-photo-big').attr('src', `${$('.focus').attr('src')}`);
    $('.person-opinion').filter(`[data-name="${$('.focus').attr('data-name')}"]`)
        .addClass('active').siblings().removeClass('active');
};

//Секція "Gallery of best images" на Masonry.
$('.gallery-itself').masonry({
    itemSelector: '.gallery-itself-item',
    columnWidth: 370,
    gutter: 20,
});

//Функція додавання малюнків за допомогою кнопки "Load more" 
//в секції "Gallery of best images".
$('.gallery-best-imgs .btn').click(function (event) {
    event.preventDefault();
    const loaderBtn = $('.gallery-best-imgs');
    const loader = createLoader();
    loaderBtn.append(loader);
    $('.gallery-best-imgs .btn').hide();
    setTimeout(function () {
        for (let i = 8; i <= 16; i++) {
            let elem = $(`<div class="gallery-itself-item" data-status="on">
            <img src="imgs/09_gallery_best_imgs/gbi_0${i}.png" alt="">
        </div>`);
            $('.gallery-itself').append('addItems', elem).masonry('appended', elem);
        };
        loader.style.display = 'none';
    }, 2000);
});

//Імітація завантаження малюнків з северу
function createLoader() {
    const loader = document.createElement('div');
    loader.innerHTML = `<section class="loader-btn">
    <div class="gooey">
        <span class="dot"></span>
        <div class="dots">
            <span class="dotet"></span>
            <span class="dotet"></span>
            <span class="dotet"></span>
        </div>
    </div>
    </section>`;
    return loader;
};