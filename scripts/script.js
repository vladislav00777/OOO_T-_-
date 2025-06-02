$(document).ready(function() {
    // ===========================
    // Обработка изменения класса header при скролле
    // ===========================
    function handleHeaderOnScroll() {
        const header = $('header');
        if (header.length === 0) return;
        if (window.scrollY > 50) {
            header.addClass('solid').removeClass('transparent');
        } else {
            header.removeClass('solid').addClass('transparent');
        }
    }
    $(window).on('scroll', handleHeaderOnScroll);
    handleHeaderOnScroll();

    // ===========================
    // Слайдер отзывов
    // ===========================
    let currentIndex = 0;
    const totalTestimonials = $('.testimonial').length; // Получаем количество отзывов
    function showTestimonial(index) {
        const $testimonials = $('.testimonials');
        const $dots = $('.dot');
        if ($testimonials.length === 0 || $dots.length === 0) return;

        const offset = -index * 100;
        $testimonials.css('transform', 'translateX(' + offset + '%)');
        $dots.each(function(i) {
            $(this).toggleClass('active', i === index);
        });
    }
    // Автоматическая смена отзывов
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalTestimonials; // Используем полученное количество
        showTestimonial(currentIndex);
    }, 5000);

    // ===========================
    // FAQ: раскрытие по клику
    // ===========================
    $('.faq-header').each(function() {
        $(this).on('click', () => {
            $(this).parent('.faq').toggleClass('open');
        });
    });

    // ===========================
    // Обновление активной ссылки навигации при скролле
    // ===========================
    function updateActiveLink() {
        const sections = [
            { id: 'hero', link: $('nav a[href="#hero"]') },
            { id: 'about', link: $('nav a[href="#about"]') },
            { id: 'services', link: $('nav a[href="#services"]') },
            { id: 'work-steps', link: $('nav a[href="#work-steps"]') },
            { id: 'testimonials', link: $('nav a[href="#testimonials"]') },
            { id: 'faq', link: $('nav a[href="#faq"]') },
            { id: 'contact', link: $('nav a[href="#contact"]') },
        ];

        const viewportMiddle = window.scrollY + window.innerHeight / 2;
        const tolerance = 300;
        let activeLink = null;

        sections.forEach(sectionInfo => {
            const section = document.getElementById(sectionInfo.id);
            if (section) {
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top + window.scrollY;
                const sectionHeight = section.offsetHeight;
                const sectionMiddle = sectionTop + sectionHeight / 2;
                if (Math.abs(sectionMiddle - viewportMiddle) <= tolerance) {
                    activeLink = sectionInfo.link;
                }
            }
        });

        $('nav a').removeClass('nav-active');
        if (activeLink) {
            activeLink.addClass('nav-active');
        }
    }
    $(window).on('scroll', updateActiveLink);
    $(window).on('load', updateActiveLink);

    // ===========================
    // Валидация формы
    // ===========================
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();

        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const phone = $('#phone').val().trim();
        const errorDiv = $('#error-message');

        errorDiv.hide().html('');

        const namePattern = /^[A-Za-zА-Яа-яЁё\s]{2,}$/;
        if (!namePattern.test(name)) {
            errorDiv.html('Пожалуйста, введите корректное имя (только буквы и пробелы, минимум 2 символа).').show();
            return;
        }

        const phoneDigits = phone.replace(/\D/g, '');
        const requiredDigits = 11;
        if (phoneDigits.length !== requiredDigits) {
            errorDiv.html(`Пожалуйста, введите правильный номер телефона с ${requiredDigits} цифрами.`).show();
            return;
        }

        if (!name || !email || !phone) {
            errorDiv.html('Пожалуйста, заполните все поля.').show();
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            errorDiv.html('Пожалуйста, введите корректный email.').show();
            return;
        }

        alert('Благодарим вас за обращение! Ваша заявка успешно отправлена.');
        // Здесь можно добавить AJAX для отправки данных на сервер
    });

    // ===========================
    // Анимация заголовка и подзаголовка
    // ===========================
    const title = "IT-УСЛУГИ ДЛЯ ВАШЕГО БИЗНЕСА";
    const subtitle = "Ваш надежный партнер в мире технологий";

    function typeWriter(text, element, delay) {
        let index = 0;
        function type() {
            if (index < text.length) {
                $(element).append(text.charAt(index));
                index++;
                setTimeout(type, delay);
            }
        }
        type();
    }

    typeWriter(title, '.animated-title', 100);
    setTimeout(() => {
        typeWriter(subtitle, '.animated-subtitle', 100);
    }, title.length * 100 + 500);

    // ===========================
    // Следование за мышью и вращение треугольника (отключим на мобильных)
    // ===========================
    const $triangle = $('#triangle');
    if ($triangle.length) {
        // Проверяем ширину экрана
        if ($(window).width() > 768) {
            $(document).on('mousemove', e => {
                $triangle.css({
                    left: e.pageX - 20 + 'px',
                    top: e.pageY - 35 + 'px'
                });
            });
            setInterval(() => {
                $triangle.css('transform', 'rotate(' + (Math.random() * 360) + 'deg)');
            }, 1000);
        } else {
            // Скрываем треугольник на мобильных, если он есть
            $triangle.hide();
        }
    }

    // ===========================
    // Общая функция проверки видимости элементов
    // ===========================
    function isElementInViewport(el) {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // ===========================
    // Проверка и добавление класса видимости для about-section
    // ===========================
    const aboutSection = document.querySelector('.about-section');
    function checkAboutVisibility() {
        if (aboutSection) {
            if (isElementInViewport(aboutSection)) {
                aboutSection.classList.add('visible');
            } else {
                 // Опционально: удалить класс при выходе из видимости
                 // aboutSection.classList.remove('visible');
            }
        }
    }
     if (aboutSection) {
        checkAboutVisibility();
        $(window).on('scroll', checkAboutVisibility);
     }


    // ===========================
    // Проверка карточек и этапов
    // ===========================
    function checkCardsVisibility() {
        const selectors = ['.service-card', '.stage'];
        selectors.forEach(sel => {
            $(sel).each(function(i) {
                if (isElementInViewport(this)) {
                    const $this = $(this);
                    // Добавляем задержку только если класс еще не добавлен
                    if (!$this.hasClass('visible')) {
                       setTimeout(() => {
                           $this.addClass('visible');
                       }, i * 300);
                    }
                } else {
                    // Опционально: удалить класс при выходе из видимости
                    // $(this).removeClass('visible');
                }
            });
        });
    }
    checkCardsVisibility();
    $(window).on('scroll', checkCardsVisibility);


    // ===========================
    // Тексты и фоны (промо)
    // ===========================
    const headings = ["15% СКИДКА ТОЛЬКО СЕЙЧАС", "25% СКИДКА НА ВТОРОЙ ЗАКАЗ", "БЕСПЛАТНАЯ ДИАГНОСТИКА"];
    const subheadings = ["Решайте проблемы вашей техники с нашей помощью.", "Не упустите отличные предложения!", "Ваш надежный партнер в мире технологий."];
    const backgroundsPromo = [
        "images/11.09.13.24.jpg",
        "images/19708db7c1aa18cd9fb288665ab099ac.jpg",
        "images/7a0f0f0a-105a-46e6-ad68-afcb4f3ca7f7.jpg"
    ];
    let promoIndex = 0;

    function changePromoText() {
        promoIndex = (promoIndex + 1) % headings.length;
        $('#promo-heading').fadeOut(400, function() {
            $(this).text(headings[promoIndex]).fadeIn(400);
        });
        $('#promo-subheading').fadeOut(400, function() {
            $(this).text(subheadings[promoIndex]).fadeIn(400);
        });
        $('.action-section').css('background-image', `url('${backgroundsPromo[promoIndex]}')`);
    }
    setInterval(changePromoText, 3000);

    // ===========================
    // Фон для hero
    // ===========================
    const heroBackgrounds = [
        "images/BrGZYOPZZUc.jpg",
        "images/original.jpeg",
        "images/tech-support-services_1246656-4425.jpg"
    ];
    let heroBgIndex = 0;
    setInterval(() => {
        heroBgIndex = (heroBgIndex + 1) % heroBackgrounds.length;
        $('#hero').css('background-image', `url('${heroBackgrounds[heroBgIndex]}')`);
    }, 5000);

    // ===========================
    // Обработка hover для карточек услуг
    // ===========================
    $('.service-card[data-alt-img]').each(function() {
        const $img = $(this).find('img');
        const altSrc = $(this).data('alt-img');
        // сохраняем оригинальный src
        $img.data('original-src', $img.attr('src'));
        $(this).hover(
            () => { $img.attr('src', altSrc); },
            () => { $img.attr('src', $img.data('original-src')); }
        );
    });

    // ===========================
    // Обработчик для бургер-меню
    // ===========================
    $('.burger-menu-btn').on('click', () => {
        $('.nav-container').toggleClass('open');
    });

    // Закрытие меню при клике на ссылку (для мобильных)
    $('.nav-container a').on('click', () => {
         if ($('.nav-container').hasClass('open')) {
             $('.nav-container').removeClass('open');
         }
    });

    // Добавьте функцию openStageDescription, если она используется в HTML
    // function openStageDescription(step) {
    //     // Ваша логика для открытия описания этапа
    //     console.log('Открыто описание для этапа:', step);
    // }
});