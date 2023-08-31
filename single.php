
<?php get_header(); ?>
<div class="main single">
  <?php if (have_posts()) : ?>
    <?php while (have_posts()) : the_post(); ?>
      <?php
        //Récupérer la catégorie, le format, la référence et le type de la photo 
        $reference = get_post_meta(get_the_ID(),'reference', true);
        $type = get_post_meta(get_the_ID(),'type', true);
        $cat = get_the_terms($post->ID,'categorie');
        $form = get_the_terms($post->ID,'format');
        $categorie = motaphoto_taxo($cat);
        $format = motaphoto_taxo($form);
      ?>
      <section class="post">
        <div class="post-desc">
          <h2 class="post-title"><?php the_title(); ?></h2>
          <p class="post-info">Référence : <span id="reference"> <?php echo $reference; ?></span></p>
          <p class="post-info">Catégorie : <?php echo $categorie; ?></p>
          <p class="post-info">Format : <?php echo $format; ?></p>
          <p class="post-info">Type : <?php echo $type; ?></p>
          <p class="post-info desc-year">Année : <?php the_date('Y'); ?></p>
          <div class="post-border"></div>
        </div>
        <div class="post-content">
          <?php the_content(); ?>
        </div>
        <div class="post-footer">
          <div class="pf-contact">
            <p>Cette Photo vous intéresse ?</p>
            <input class="post-contact mota-btn" type="submit" value="Contact">
          </div>
          <div class="slider">
            <div class="slider-thumbnail">
                <?php 
                    $currentPostID = get_the_ID();

                    $args = array(
                        'post_type' => 'photo_mota',
                        'paged'=>1,
                        'posts_per_page' => 1,
                        'orderby' => 'date',
                        'order' => 'DESC',
                        'post__not_in' => array($currentPostID),
                        );
                    $query = new wp_query($args);
                    if($query->have_posts()) : while($query->have_posts()) : 
                        $query->the_post();
                ?>
                <?php get_template_part('templates/photo_slider'); ?>
                <?php 
                        endwhile; 
                    else: 
                        echo '<p>' . "Aucune photo similaire trouvée" . '</p>';
                    endif;
                    wp_reset_postdata();
                ?>
            </div> 
            <div class="slider-nav">
                <a class="left-arrow arrow"  
                  data-id="<?php echo $post->ID ?>" 
                  data-ajaxurl="<?php echo admin_url( 'admin-ajax.php' ); ?>">
                    <img src="<?php echo get_template_directory_uri() . "./assets/images/left.png"?>">
                </a>
                <a class="right-arrow arrow" 
                  data-id="<?php echo $post->ID ?>" 
                  data-ajaxurl="<?php echo admin_url( 'admin-ajax.php' ); ?>">
                    <img src="<?php echo get_template_directory_uri() . "./assets/images/right.png"?>">
                </a>
            </div>
          </div>
        </div> 
      </section>
      <div class="border"></div>
      <section class="single-gallery">
        <h3>Vous aimerez aussi</h3>
        <div class="single-photo-block">
          <?php 
              //Variable contenant la catégorie de la photo afficher
              $postId = get_the_ID();
              $postCat = wp_get_post_terms($postId,'categorie');
              //Récupérer les éléments de la même catégorie
                $args = array(
                  'post_type' => 'photo_mota',
                  'posts_per_page' => 2,
                  'tax_query' => array(
                    array(
                      'taxonomy' => 'categorie',
                      'field' => 'slug',
                      'terms' => array($postCat[0]->slug),
                    ),
                  ),
                  'post__not_in' => array($postId),
                );
                $query = new wp_query($args);
                if($query->have_posts()) : while($query->have_posts()) : 
                  $query->the_post();
          ?>     
          <?php
                get_template_part('templates/photo_block');
           ?>
          <?php   
              endwhile; 
            else: 
              echo '<p>' . "Aucune photo similaire trouvée" . '</p>';
            endif;
            wp_reset_postdata();
          ?>
        </div>
        <input 
          class="show-all mota-btn same-cat" 
          data-slug="<?php echo $cat[0]->slug ?>" 
          data-ajaxurl="<?php echo admin_url( 'admin-ajax.php' ); ?>"
          data-id ="<?php echo $post->ID ?>" 
          type="submit" 
          value="Toutes les photos"
        >
      </section>
    <?php endwhile; ?>
  <?php endif; ?>
</div>
<?php get_footer(); ?>