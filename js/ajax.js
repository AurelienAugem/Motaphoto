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

        //Ajax gestion des filtres
        let filtre = $('#btn-filters');
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

                let listeFiltres = select.parent();
                let finDeListe = listeFiltres.find('li').last();
                finDeListe.css("border-radius", "0 0 8px 8px");

                $(this).css("background-color", "#E00000");
                let text = $(this).find('.photo-categorie');
                text.css("color", "white");
                categorieFiltre.text(text.attr('id'));
                
                $.ajax({
                    type: 'POST',
                    url: ajaxUrl,
                    dataType: 'html',
                    data: {
                        action: 'motaphoto_category_filter',
                    },
                    success: function(res) {
                        $('.gallery').html(res);
                    }
                });
            });
        });
        //Format
        format.each(function() {

            let select = $(this).parent();
            select.on('click',function(){

                let listeFiltres = select.parent();
                let finDeListe = listeFiltres.find('li').last();
                finDeListe.css("border-radius", "0 0 8px 8px");

                $(this).css("background-color", "#E00000");
                let text = $(this).find('.photo-format');
                text.css("color", "white");
                formatFiltre.text(text.attr('id'));

                $.ajax({
                    type: 'POST',
                    url: ajaxUrl,
                    dataType: 'html',
                    data: {
                        action: 'motaphoto_format_filter',
                    },
                    success: function(res) {
                        $('.gallery').html(res);
                    }
                });
            });
        });
        //Date
        date.each(function() {
            let select = $(this).parent();
            select.on('click',function(){

                let listeFiltres = select.parent();
                let finDeListe = listeFiltres.find('li').last();
                finDeListe.css("border-radius", "0 0 8px 8px");

                $(this).css("background-color", "#E00000");
                let text = $(this).find('.photo-date');
                text.css("color", "white");
                dateFiltre.text(text.text());

                $.ajax({
                    type: 'POST',
                    url: ajaxUrl,
                    dataType: 'html',
                    data: {
                        action: 'motaphoto_date_filter',
                    },
                    success: function(res) {
                        $('.gallery').html(res);
                    }
                });
            });
        });


    });
  })(jQuery);