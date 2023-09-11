(function ($) {
    $(document).ready(function () {
        // ------------------------ Ajax gestion des filtres ------------------------------- //
        let btnLoadMore = $('#mota-load-more');
        let ajaxUrl = btnLoadMore.attr('data-ajaxurl');

        let categorie = $('.photo-categorie');
        let format = $('.photo-format');
        let date = $('.photo-date');

        let select = $('.photo-categorie, .photo-format, .photo-date').parent();

        select.on('click', function() {
            let filtre = $(this).children();

            if (filtre.hasClass('active')) {
                
                let selectedCategory = $('.photo-categorie.active').data('slug');
                let selectedFormat = $('.photo-format.active').data('slug');
                let selectedDate = $('.photo-date.active').data('slug');

                let queryData = {
                    action: 'motaphoto_global_filter',
                };

                if (selectedCategory) {
                    queryData.category = selectedCategory;
                }

                if (selectedFormat) {
                    queryData.format = selectedFormat;
                }

                if (selectedDate) {
                    queryData.orderDate = selectedDate;
                }

                $.ajax({
                    type: 'POST',
                    url: ajaxUrl,
                    dataType: 'html',
                    data: queryData,
                    success: function(res) {
                        $('.gallery').html(res);
                        fullscreenLightbox();
                    }
                });
            }      
        });

        //Ajax charger plus de photos dans la galerie
        
        let currentPage = 1;

        btnLoadMore.on('click', function (e) {
            e.preventDefault();

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
            fullscreenLightbox();
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
        let sliderPage = 1;
        let cardThumbnail = $('.card-thumbnail');
        let arrow = $('.slider-nav .arrow');
        
        arrow.on('click', function(){
            let currentArrow = $(this);
            let ajaxUrl = currentArrow.attr('data-ajaxurl');
            cardThumbnail.empty();

            if (currentArrow.hasClass('left-arrow')) {
                sliderPage--;

                if (sliderPage < 1) {
                    sliderPage = totalPhotos - 1;
                    currentArrow.data('id', lastID);
                }
               
                $.ajax({
                    type: 'POST',
                    url: ajaxUrl,
                    dataType: 'html',
                    data: {
                        action: 'motaphoto_thumbnail',
                        page: sliderPage,
                        id: currentArrow.data('id'),
                    },
                    success: function(res){
                        cardThumbnail.html(res);
                    }
    
                });
            }else if (currentArrow.hasClass('right-arrow')) {
                sliderPage++;

                if (sliderPage > totalPhotos - 1) {
                    sliderPage = 1;
                    currentArrow.data('id', firstID);
                }

                $.ajax({
                    type: 'POST',
                    url: ajaxUrlCat,
                    dataType: 'html',
                    data: {
                        action: 'motaphoto_thumbnail',
                        page: sliderPage,
                        id: currentArrow.data('id'),
                    },
                    success: function(res){
                        cardThumbnail.html(res);
                    }
                });
            }

        });

        //Slider lightbox des photos de la galerie 
        let photo = $('.photo-content');
        let galleryArrow = $('.photo-show .arrow');

        galleryArrow.on('click', function(){
            let currentArrow = $(this);
            let currentID = currentArrow.data('id');
            let ajaxUrl = currentArrow.attr('data-ajaxurl');
            photo.empty();

            if (currentArrow.hasClass('left-arrow')) {
                sliderPage--;

                if (sliderPage < 1) {
                    sliderPage = totalPhotos - 1;
                    currentArrow.data('id', lastID);
                }

                $.ajax({
                    type: 'POST',
                    url: ajaxUrl,
                    dataType: 'html',
                    data: {
                        action: 'motaphoto_lightbox',
                        page: sliderPage,
                        id: currentID,
                    },
                    success: function(res){
                        photo.html(res);
                    }
    
                });

            } else if (currentArrow.hasClass('right-arrow')) {
                sliderPage++;

                if (sliderPage > totalPhotos - 1) {
                    sliderPage = 1;
                    currentArrow.data('id', firstID);
                }

                $.ajax({
                    type: 'POST',
                    url: ajaxUrl,
                    dataType: 'html',
                    data: {
                        action: 'motaphoto_lightbox',
                        page: sliderPage,
                        id: currentID,
                    },
                    success: function(res){
                        photo.html(res);
                    }
    
                });
            }
        });

        
    });
  })(jQuery);