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
        let categorie = $('.photo-categorie');
        let format = $('.photo-format');
        let date = $('.photo-date');

        //Catégorie
        categorie.each(function() {
            let select = $(this).parent();
            select.on('click', function() {
                let cat = $(this).find('.photo-categorie');
                
                if (cat.hasClass("active")) {

                    $.ajax({
                        type: 'POST',
                        url: ajaxUrl,
                        dataType: 'html',
                        data: {
                            action: 'motaphoto_global_filter',
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
            select.on('click', function() {
                let form = $(this).find('.photo-format');
                
                if (form.hasClass("active")) {

                    $.ajax({
                        type: 'POST',
                        url: ajaxUrl,
                        dataType: 'html',
                        data: {
                            action: 'motaphoto_global_filter',
                            format: form.data('slug'),
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
            select.on('click', function() {
                let date = $(this).find('.photo-date');
                
                if (date.hasClass("active")) {

                    $.ajax({
                        type: 'POST',
                        url: ajaxUrl,
                        dataType: 'html',
                        data: {
                            action: 'motaphoto_global_filter',
                            orderDate: date.data('slug'),
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