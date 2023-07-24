<?php get_header(); ?>
<div class="main page">
  <div>
    <img class="banniere" src= <?php echo get_template_directory_uri() . "/assets/images/Header.png"?> alt="Bannière du site">
  </div>
  <?php    
      if (have_posts()):
          while (have_posts()) : the_post();
            the_content();
          endwhile;
      endif;
  ?>
</div>
<?php get_footer(); ?>
