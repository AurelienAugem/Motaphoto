<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Motaphoto</title>
    <meta name="description" content="Site de la photographe professionnelle d'evenementiel Nathalie Mota"> 
    <?php wp_head() ?>
</head>

<body>
    <header>
        <div class="display-header">
            <img class="logo" src= <?php echo get_template_directory_uri() . '/assets/images/logo.png'; ?> alt="Logo du site Motaphoto">
            <button class="responsive-header menu-close">
                <span class="menu-line top-line"></span>
                <span class="menu-line middle-line"></span>
                <span class="menu-line bottom-line"></span>
            </button>
            <?php wp_nav_menu(array('theme_location' => 'main'));?>
        </div>
        <div class="responsive-menu">
            <?php wp_nav_menu(array('theme_location' => 'main'));?>
        </div>
    </header>
    <main>