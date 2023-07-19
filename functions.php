<?php
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