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
  <?php if(is_front_page()): ?>
    <section class="main-gallery">
      <div class="filters">
        <?php get_template_part('templates/filters'); ?>
      </div>
      <div class="gallery">
      <?php 
                $args = array(
                  'post_type' => 'photo_mota',
                  'posts_per_page' => 12,
                  'orderby' => 'date',
                  'order' => 'DESC',
                  'paged' => 1,
                );
                $query = new wp_query($args);
                if($query->have_posts()) : while($query->have_posts()) : 
                  $query->the_post();
          ?>     
          <?php get_template_part('templates/photo_block');?>
          <?php   
            endwhile; endif;
            wp_reset_postdata();
          ?>
      </div>
      <input type="submit" id="mota-load-more" class="mota-btn load-more" value="Charger plus" novalidate 
      data-ajaxurl="<?php echo admin_url( 'admin-ajax.php' ); ?>" >
    </section>
   <?php endif; ?>
</div>
<?php get_footer(); ?>
