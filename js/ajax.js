(function ($) {
    $(document).ready(function () {
        // ------------------------ Ajax gestion des filtres ------------------------------- //
        let btnLoadMore = $('#mota-load-more');
        let ajaxUrl = btnLoadMore.attr('data-ajaxurl');

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
                            fullscreenLightbox();
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
                            fullscreenLightbox();
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
                            fullscreenLightbox();
                        }
                    });
                    
                } 
            });
        });
        
        //Ajax charger plus de photos dans la galerie
        
        let currentPage = 1;

        btnLoadMore.on('click', function () {
            if (categorie.hasClass('active')) {
                currentPage++;
                $.ajax({
                    type: 'POST',
                    url: ajaxUrl,
                    dataType: 'html',
                    data: {
                        action: 'motaphoto_global_filter',
                        paged: currentPage,
                        categorie: categorie.data('slug'),
                    },
                    success: function (res) {
                    $('.gallery').append(res);
                    fullscreenLightbox();
                    }
                });
                
            }else if (format.hasClass('active')) {
                currentPage++;
                $.ajax({
                    type: 'POST',
                    url: ajaxUrl,
                    dataType: 'html',
                    data: {
                        action: 'motaphoto_global_filter',
                        paged: currentPage,
                        format: format.data('slug'),
                    },
                    success: function (res) {
                    $('.gallery').append(res);
                    fullscreenLightbox();
                    }
                });
                
            }else if (date.hasClass('active')) {
                currentPage++;
                $.ajax({
                    type: 'POST',
                    url: ajaxUrl,
                    dataType: 'html',
                    data: {
                        action: 'motaphoto_global_filter',
                        paged: currentPage,
                        orderDate: date.data('slug'),
                    },
                    success: function (res) {
                    $('.gallery').append(res);
                    fullscreenLightbox();
                    }
                });
                
            }else {
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
                    fullscreenLightbox();
                    }
                });
            }
            
        });

        //Toutes les photos de la même catégorie que celle dont les informations sont affichées
        let sameCat = $('.same-cat');
        let ajaxUrlCat = sameCat.attr('data-ajaxurl')

        sameCat.on('click', function(e) {
            let ajaxData = $(this);
            e.preventDefault();

            $('.single-photo-block').empty();
            
            $.ajax({
                type: 'POST',
                url: ajaxUrlCat,
                dataType: 'html',
                data: {
                    action: 'motaphoto_all_photos',
                    category: ajaxData.data('slug'),
                    id: ajaxData.data('id'),
                },
                success: function(res) {
                    $('.single-photo-block').html(res);
                    fullscreenLightbox();
                }
            });
        })

        //Slider de la page single
        //La variable totalPhotos est envoyé depuis le fichier functions.php
        let cardThumbnail = $('.card-thumbnail');
        let arrow = $('.slider-nav .arrow');
        
        arrow.on('click', function(){
            let currentArrow = $(this);
            let ajaxUrl = currentArrow.attr('data-ajaxurl');
            cardThumbnail.empty();

            if (currentArrow.hasClass('left-arrow')) {
                currentPage--;

                if (currentPage < 1) {
                    currentPage = totalPhotos - 1;
                    currentArrow.data('id', lastID);
                }
               
                $.ajax({
                    type: 'POST',
                    url: ajaxUrl,
                    dataType: 'html',
                    data: {
                        action: 'motaphoto_thumbnail',
                        page: currentPage,
                        id: currentArrow.data('id'),
                    },
                    success: function(res){
                        cardThumbnail.html(res);
                    }
    
                });
            }else if (currentArrow.hasClass('right-arrow')) {
                currentPage++;

                if (currentPage > totalPhotos - 1) {
                    currentPage = 1;
                    currentArrow.data('id', firstID);
                }

                $.ajax({
                    type: 'POST',
                    url: ajaxUrlCat,
                    dataType: 'html',
                    data: {
                        action: 'motaphoto_thumbnail',
                        page: currentPage,
                        id: currentArrow.data('id'),
                    },
                    success: function(res){
                        cardThumbnail.html(res);
                    }
                });
            }

        });
        
    });
  })(jQuery);