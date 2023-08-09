(function ($) {
    $(document).ready(function () {

        //Ajax charger plus de photos dans la galerie
        let btnLoadMore = $('#mota-load-more');
        let ajaxUrl = btnLoadMore.attr('data-ajaxurl');
        let currentPage = 1;

        btnLoadMore.on('click', function () {
            currentPage++;
            $.ajax({
                type: 'POST',
                url: ajaxUrl,
                dataType: 'html',
                data: {
                    action: 'motaphoto_load_more',
                    paged: currentPage,
                },
                success: function (res) {
                $('.gallery').append(res);
                }
            });
        });

        // ------------------------ Ajax gestion des filtres ------------------------------- //

        let categorieFiltre = $('#btn-categorie');
        let formatFiltre = $('#btn-format');
        let dateFiltre = $('#btn-tri');

        let categorie = $('.photo-categorie');
        let format = $('.photo-format');
        let date = $('.photo-date');
        //Catégorie
        categorie.each(function() {

            let select = $(this).parent();
            select.on('click',function(){

                let cat = $(this).find('.photo-categorie');
                let siblings = $(this).siblings().find('.photo-categorie');
                let listeFiltres = select.parent();
                let finDeListe = listeFiltres.find('li').last();
                finDeListe.css("border-radius", "0 0 8px 8px");
                let menu = $(this).parent();
                let bordure = menu.parent().parent();

                if(cat.hasClass("active")){
                    
                    $(this).css("background-color", "white");
                    cat.css("color", "#313144");
                    categorieFiltre.text("Catégorie");
                    cat.removeClass('active');

                } else {

                    menu.addClass('filter-hide');
                    bordure.css("border-color", "#215aff");
                    $(this).css("background-color", "#E00000");
                    cat.css("color", "white");
                    categorieFiltre.text(cat.attr('id'));
                    cat.addClass('active');
                    $(this).siblings().css("background-color", "white");
                    siblings.removeClass('active');
                    siblings.css("color", "#313144");
                    console.log('Galerie filtrée par la catégorie: ' + cat.text());

                    $.ajax({
                        type: 'POST',
                        url: ajaxUrl,
                        dataType: 'html',
                        data: {
                            action: 'motaphoto_category_filter',
                            category: cat.data('slug'),
                        },
                        success: function(res) {
                            $('.gallery').html(res);
                        }
                    });
                }
            });
        });
        //Format
        format.each(function() {

            let select = $(this).parent();
            select.on('click',function(){

                let form = $(this).find('.photo-format');
                let siblings = $(this).siblings().find('.photo-format');
                let listeFiltres = select.parent();
                let finDeListe = listeFiltres.find('li').last();
                finDeListe.css("border-radius", "0 0 8px 8px");
                let menu = $(this).parent();
                let bordure = menu.parent().parent();

                if(form.hasClass("active")){

                    $(this).css("background-color", "white");
                    form.css("color", "#313144");
                    formatFiltre.text("Format");
                    form.removeClass('active');

                } else {

                    menu.addClass('filter-hide');
                    bordure.css("border-color", "#215aff");
                    $(this).css("background-color", "#E00000");
                    form.css("color", "white");
                    formatFiltre.text(form.attr('id'));
                    form.addClass('active');
                    $(this).siblings().css("background-color", "white");
                    siblings.removeClass('active');
                    siblings.css("color", "#313144");
                    console.log('Galerie filtrée par le format: ' + form.text());

                    $.ajax({
                        type: 'POST',
                        url: ajaxUrl,
                        dataType: 'html',
                        data: {
                            action: 'motaphoto_format_filter',
                            category: form.data('slug'),
                        },
                        success: function(res) {
                            $('.gallery').html(res);
                        }
                    });

                }
                
            });
        });
        //Date
        date.each(function() {
            let select = $(this).parent();
            select.on('click',function(){

                let date = $(this).find('.photo-date');
                let siblings = $(this).siblings().find('.photo-date');
                let listeFiltres = select.parent();
                let finDeListe = listeFiltres.find('li').last();
                finDeListe.css("border-radius", "0 0 8px 8px");
                let menu = $(this).parent();
                let bordure = menu.parent().parent();

                if(date.hasClass("active")){

                    $(this).css("background-color", "white");
                    date.css("color", "#313144");
                    dateFiltre.text("Trier par...");
                    date.removeClass('active');

                } else {

                    menu.addClass('filter-hide');
                    bordure.css("border-color", "#215aff");
                    $(this).css("background-color", "#E00000");
                    date.css("color", "white");
                    dateFiltre.text(date.text());
                    date.addClass('active');
                    $(this).siblings().css("background-color", "white");
                    siblings.removeClass('active');
                    siblings.css("color", "#313144");
                    if(date.data('id') == "old-photo"){
                        console.log('Galerie filtrée dans l\'ordre chronolique croissant');
                    }else if (date.data('id') == "new-photo") {
                        console.log('Galerie filtrée dans l\'ordre chronolique décroissant');
                    }

                    $.ajax({
                        type: 'POST',
                        url: ajaxUrl,
                        dataType: 'html',
                        data: {
                            action: 'motaphoto_date_filter',
                            category: date.data('id'),
                        },
                        success: function(res) {
                            $('.gallery').html(res);
                        }
                    });

                }

                
            });
        });


    });
  })(jQuery);