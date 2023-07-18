<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head() ?>
</head>

<body>
    <header>
        <div class="display-header">
            <img class="logo" src= <?php echo get_template_directory_uri() . '/assets/images/logo.png'; ?> alt="Logo du site Motaphoto">
            <?php wp_nav_menu(array('theme_location' => 'main'));?>
        </div>
    </header>
    <main>