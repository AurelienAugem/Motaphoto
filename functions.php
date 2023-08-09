<?php

/**
 * Proper ob_end_flush() for all levels
 *
 * This replaces the WordPress `wp_ob_end_flush_all()` function
 * with a replacement that doesn't cause PHP notices.
 */
remove_action( 'shutdown', 'wp_ob_end_flush_all', 1 );
add_action( 'shutdown', function() {
   while ( @ob_end_flush() );
} );

//Chargement du fichier CSS
function motaphoto_style(){
    wp_enqueue_style('style', get_stylesheet_directory_uri() . '/style.css');
}
add_action('wp_enqueue_scripts', 'motaphoto_style');

//Chargement du script Javascript
function motaphoto_script(){
    wp_enqueue_script(
        'script',
        get_template_directory_uri() . '/js/script.js',
        array(),
        1.0,
        true
    );
}
add_action('wp_enqueue_scripts', 'motaphoto_script');

//Import jQuery
function import_jquery(){
    wp_enqueue_script('jquery');
}
add_action('wp_enqueue_scripts', 'import_jquery');

//Chargement du script AJAX
function motaphoto_script_ajax(){
    wp_enqueue_script(
        'ajax',
        get_template_directory_uri() . '/js/ajax.js',
        array('jquery'),
        1.0,
        true
    );
}
add_action('wp_enqueue_scripts', 'motaphoto_script_ajax');

//Requête AJAX <<charger plus>>
function motaphoto_load_more(){

    $args = array(
        'post_type' => 'photo_mota',
        'posts_per_page' => 8,
        'orderby' => 'date',
        'order' => 'DESC',
        'paged' => $_POST['paged'],
      );

    $ajaxQuery =  new wp_query($args);

    $result = '';

    if($ajaxQuery->have_posts()){ while($ajaxQuery->have_posts()) : 
        $ajaxQuery->the_post();
    
        $result .= get_template_part('templates/photo_block');

        endwhile; 
    } else {
        $result = '';
    }
    echo $result;
    exit;
}
add_action('wp_ajax_motaphoto_load_more', 'motaphoto_load_more');
add_action('wp_ajax_nopriv_motaphoto_load_more', 'motaphoto_load_more');

//AJAX Filtres
//Filtrer par Catégories
function motaphoto_category_filter(){
    $categorie = $_POST['category'];

    $args = array(
        'post_type' => 'photo_mota',
        'posts_per_page' => 8,
        'tax_query' => array(
            array(
                'taxonomy' => 'categorie',
                'field' => 'slug',
                'terms' => $categorie,
            ),
        ),
    );

    $ajaxQuery =  new wp_query($args);

    $result = '';

    if($ajaxQuery->have_posts()){ while($ajaxQuery->have_posts()) : 
        $ajaxQuery->the_post();
    
        $result .= get_template_part('templates/photo_block');

        endwhile; 
    } else {
        $result = '';
    }
    echo $result;
    exit;
}
add_action('wp_ajax_motaphoto_category_filter', 'motaphoto_category_filter');
add_action('wp_ajax_nopriv_motaphoto_category_filter', 'motaphoto_category_filter');

//Filtrer par Formats
function motaphoto_format_filter(){
    $format = $_POST['category'];

    $args = array(
        'post_type' => 'photo_mota',
        'posts_per_page' => 8,
        'tax_query' => array(
            array(
                'taxonomy' => 'format',
                'field' => 'slug',
                'terms' => $format,
            ),
        ),
    );

    $ajaxQuery =  new wp_query($args);

    $result = '';

    if($ajaxQuery->have_posts()){ while($ajaxQuery->have_posts()) : 
        $ajaxQuery->the_post();
    
        $result .= get_template_part('templates/photo_block');

        endwhile; 
    } else {
        $result = '';
    }
    echo $result;
    exit;

}
add_action('wp_ajax_motaphoto_format_filter', 'motaphoto_format_filter');
add_action('wp_ajax_nopriv_motaphoto_format_filter', 'motaphoto_format_filter');

//Filtrer par dates
function motaphoto_date_filter(){
    $date = $_POST['category'];

    if($date == "old-photo"){
        $args = array(
            'post_type' => 'photo_mota',
            'posts_per_page' => 8,
            'orderby' => 'date',
            'order' => 'ASC',
        );
        $ajaxQuery =  new wp_query($args);

        $result = '';

        if($ajaxQuery->have_posts()){ while($ajaxQuery->have_posts()) : 
            $ajaxQuery->the_post();
    
            $result .= get_template_part('templates/photo_block');

            endwhile; 
        } else {
            $result = '';
        }
        echo $result;
        exit;

    }elseif ($date == "new-photo") {
        $args = array(
            'post_type' => 'photo_mota',
            'posts_per_page' => 8,
            'orderby' => 'date',
            'order' => 'DESC',
        );

        $ajaxQuery =  new wp_query($args);

        $result = '';

        if($ajaxQuery->have_posts()){ while($ajaxQuery->have_posts()) : 
            $ajaxQuery->the_post();
    
            $result .= get_template_part('templates/photo_block');

            endwhile; 
        } else {
            $result = '';
        }
        echo $result;
        exit;
    }
}
add_action('wp_ajax_motaphoto_date_filter', 'motaphoto_date_filter');
add_action('wp_ajax_nopriv_motaphoto_date_filter', 'motaphoto_date_filter');

//Enregistrement du menu d'en-tête et pied-de-page
function motaphoto_register_menus() {
    register_nav_menus(
        array(
            'main' => 'Header',
            'footer' => 'Footer'
        )
    );
}
add_action('after_setup_theme', 'motaphoto_register_menus');

//Ajout d'une <p> dans le pied-de-page
function motaphoto_footer_text($text, $menuFooter){
    if($menuFooter->theme_location == 'footer'){
        $p = '<li id="menu-item-27" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-27"><p>Tous droits réservés</p></li>';
        $text .= $p;
    }
    return $text;
}
add_filter('wp_nav_menu_items', 'motaphoto_footer_text', 10, 2);

//Récupérer la catégorie d'une photo
function motaphoto_taxo($args){
    foreach ($args as $arg) {
        $taxonomie = $arg->name;
    }return $taxonomie;
}

