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

//Chargement du script gérant la partie responsive
function motaphoto_responsive_script(){
    wp_enqueue_script(
        'responsive_script',
        get_template_directory_uri() . '/js/responsive.js',
        array(),
        1.0,
        true
    );
}
add_action('wp_enqueue_scripts', 'motaphoto_responsive_script');

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

//Transmettre des<variables php vers le script ajax
    //Nombre total de photos et leur id
    wp_enqueue_scripts('ajax', get_template_directory_uri() . '/js/ajax.js', array('jquery'));

    $args = array(
        'post_type' => 'photo_mota',
        'post_per-page' => -1,
    );

    $query = new wp_query($args);
    $nbPhotos = $query->found_posts;
    $photoIDs = get_the_ID();

    wp_reset_postdata();

    $dataNbPhotos = 'let totalPhotos = ' . wp_json_encode($nbPhotos) . ';';
    wp_add_inline_script('ajax', $dataNbPhotos);

    $dataIDs = 'let photoIDs = ' . wp_json_encode($photoIDs) . ';';
    wp_add_inline_script('ajax', $dataIDs);

    //Premier ID de photo
    $args = array(
        'post_type' => 'photo_mota',
        'post_per-page' => 1,
        'orderby' => 'date',
        'order' => 'DESC',
    );

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $firstID = get_the_ID();
        }

        wp_reset_postdata(); 
    }

    $dataFirstID = 'let firstID = ' . wp_json_encode($firstID) . ';';
    wp_add_inline_script('ajax', $dataFirstID);

    //Dernier ID de photo
    $args = array(
        'post_type' => 'photo_mota',
        'post_per-page' => 1,
        'orderby' => 'date',
        'order' => 'ASC',
    );

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $lastID = get_the_ID();
        }

        wp_reset_postdata(); 
    }

    $dataLastID = 'let lastID = ' . wp_json_encode($lastID) . ';';
    wp_add_inline_script('ajax', $dataLastID);

//Requête AJAX <<charger plus>>
function motaphoto_load_more(){
   
    $page = $_POST['paged'];
    $categorie = $_POST['category'];
    $format = $_POST['format'];
    $orderDate = $_POST['orderDate'];


        $args = array(
            'post_type' => 'photo_mota',
            'posts_per_page' => 12,
            'orderby' => 'date',
            'order' => 'DESC',
            'paged' => $page,
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

//Requête AJAX Toutes les photos d'une catégorie
function motaphoto_all_photos(){

    $categorie = $_POST['category'];
    $id = $_POST['id'];

    $args = array(
        'post_type' => 'photo_mota',
        'posts_per_page' => -1,
        'tax_query' => array(
            array(
                'taxonomy' => 'categorie',
                'field' => 'slug',
                'terms' => $categorie,
            ),
            
        ),
        'post__not_in' => array($id),
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
add_action('wp_ajax_motaphoto_all_photos', 'motaphoto_all_photos');
add_action('wp_ajax_nopriv_motaphoto_all_photos', 'motaphoto_all_photos');

//AJAX Thumbnail
function motaphoto_thumbnail(){
    $page = $_POST['page'];
    $ids = array($_POST['id']);

    $args = array(
        'post_type' => 'photo_mota',
        'posts_per_page' => 1,
        'orderby' => 'date',
        'order' => 'DESC',
        'paged' => $page,
        'post__not_in' => $ids,
        );

    $ajaxQuery =  new wp_query($args);

    $result = '';
    
    if($ajaxQuery->have_posts()){ while($ajaxQuery->have_posts()) : 
        $ajaxQuery->the_post();
        
        $result .= get_template_part('templates/photo_slider');
    
        endwhile; 
    } else {
        $result = '';
    }
    echo $result;
    exit;    

}
add_action('wp_ajax_motaphoto_thumbnail', 'motaphoto_thumbnail');
add_action('wp_ajax_nopriv_motaphoto_thumbnail', 'motaphoto_thumbnail');

//AJAX Lightbox slider
function motaphoto_lightbox(){
    $page = $_POST['page'];

    $args = array(
        'post_type' => 'photo_mota',
        'posts_per_page' => 1,
        'orderby' => 'date',
        'order' => 'DESC',
        'paged' => $page,
        
    );

    $ajaxQuery =  new wp_query($args);

    $result = array();
    
    if($ajaxQuery->have_posts()){ while($ajaxQuery->have_posts()) : 
        $ajaxQuery->the_post();

        $ref = get_post_meta(get_the_ID(),'reference', true);
        $cat = get_the_terms($post->ID,'categorie')[0]->name;
        
        $result[] = array(
            'ref' => $ref,
            'cat' => $cat,
            'content' => get_the_content(),
        );
    
        endwhile; 
    } else {
        $result = '';
    }

    $jsonResult = wp_json_encode($result);

    echo $jsonResult;
    exit;   
}
add_action('wp_ajax_motaphoto_lightbox', 'motaphoto_lightbox');
add_action('wp_ajax_nopriv_motaphoto_lightbox', 'motaphoto_lightbox');

//AJAX Filtres
//Filtre global

function motaphoto_global_filter(){

    $categorie = $_POST['category'];
    $format = $_POST['format'];
    $orderDate = $_POST['orderDate'];

    $args = array();

    //Tous les paramètres
    if(isset($categorie) && isset($format) && isset($orderDate)){
        $args = array(
            'post_type' => 'photo_mota',
            'posts_per_page' => 12,
            'orderby' => 'date',
            'order' => $orderDate,
            'relation' => 'AND',
            'tax_query' => array(
                array(
                    'taxonomy' => 'categorie',
                    'field' => 'slug',
                    'terms' => $categorie,
                ),
                array(
                    'taxonomy' => 'format',
                    'field' => 'slug',
                    'terms' => $format,
                ),
            ),
        );
    }
    //Par catégorie
    if(isset($categorie) && !isset($format) && !isset($orderDate)){
        $args = array(
            'post_type' => 'photo_mota',
            'posts_per_page' => 12,
            'tax_query' => array(
                array(
                    'taxonomy' => 'categorie',
                    'field' => 'slug',
                    'terms' => $categorie,
                ),
                
            ),
        );
    }
    //Par format
    if(!isset($categorie) && isset($format) && !isset($orderDate)){
        $args = array(
            'post_type' => 'photo_mota',
            'posts_per_page' => 12,
            'tax_query' => array(
                array(
                    'taxonomy' => 'format',
                    'field' => 'slug',
                    'terms' => $format,
                ),
            ),
        );
    }
    //Par date
    if(!isset($categorie) && !isset($format) && isset($orderDate)){
        $args = array(
            'post_type' => 'photo_mota',
            'posts_per_page' => 12,
            'orderby' => 'date',
            'order' => $orderDate,
        );
    }
    //Par catégorie et format
    if (isset($categorie) && isset($format) && !isset($orderDate)) {
        $args = array(
            'post_type' => 'photo_mota',
            'posts_per_page' => 12,
            'relation' => 'AND',
            'tax_query' => array(
                array(
                    'taxonomy' => 'categorie',
                    'field' => 'slug',
                    'terms' => $categorie,
                ),
                array(
                    'taxonomy' => 'format',
                    'field' => 'slug',
                    'terms' => $format,
                ),
            ),
        );
    }
    //Par format et date
    if (!isset($categorie) && isset($format) && isset($orderDate)) {
        $args = array(
            'post_type' => 'photo_mota',
            'posts_per_page' => 12,
            'orderby' => 'date',
            'order' => $orderDate,
            'relation' => 'AND',
            'tax_query' => array(
                array(
                    'taxonomy' => 'format',
                    'field' => 'slug',
                    'terms' => $format,
                ),
            ),
        );
    }
    //Par catégorie et date
    if (isset($categorie) && !isset($format) && isset($orderDate)) {
        $args = array(
            'post_type' => 'photo_mota',
            'posts_per_page' => 12,
            'orderby' => 'date',
            'order' => $orderDate,
            'relation' => 'AND',
            'tax_query' => array(
                array(
                    'taxonomy' => 'categorie',
                    'field' => 'slug',
                    'terms' => $categorie,
                ),
            ),
        );
    }


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
add_action('wp_ajax_motaphoto_global_filter', 'motaphoto_global_filter');
add_action('wp_ajax_nopriv_motaphoto_global_filter', 'motaphoto_global_filter');

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

