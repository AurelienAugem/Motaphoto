
    <div class="card">
      <div class="image-card">
      <?php if (wp_is_mobile()) : ?>

        <a href="<?php echo get_permalink();?>">
          <?php the_content(); ?>
        </a>

      <?php else : ?>  
        <?php the_content(); ?>
        <div class="card-overlay">
          <span class="fullscreen"></span>
          <a class="photo-link" href="<?php echo get_permalink();?>"></a>
          <div class="photo-info">
            <p class="text-tax"><?php echo get_post_meta(get_the_ID(),'reference', true); ?></p>
            <p class="text-tax"><?php echo get_the_terms($post->ID,'categorie')[0]->name; ?></p>
          </div>
        </div>
      <?php endif; ?>  
      </div>
    </div>
    <div class="photo-lightbox">
      <div class="display-close">
        <div class="close">
          <span class="barre barre-1"></span>
          <span class="barre barre-2"></span>
        </div>
      </div>
      <div class="photo-full">
        <div class="photo-show">
          <a class="left-arrow arrow arrow-loc"
            data-id="<?php echo $post->ID ?>" 
            data-ajaxurl="<?php echo admin_url( 'admin-ajax.php' ); ?>">
              <span class="arrow-style">&#x27F5;</span>  Précédente
          </a>
          <div class="photo-content">
            <?php the_content(); ?>
          </div>
          <a class="right-arrow arrow arrow-loc"
            data-id="<?php echo $post->ID ?>" 
            data-ajaxurl="<?php echo admin_url( 'admin-ajax.php' ); ?>">
              Suivante <span class="arrow-style">&#x27F6;</span>
          </a>
        </div>
        <div class="photo-info">
          <p class="text-tax photo-ref"><?php echo get_post_meta(get_the_ID(),'reference', true); ?></p>
          <p class="text-tax photo-cat"><?php echo get_the_terms($post->ID,'categorie')[0]->name; ?></p>
        </div>
      </div>
    </div>

