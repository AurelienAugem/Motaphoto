
    <div class="card">
     <div class="image-card">
      <?php       
          the_content(); 
        ?>
        <div class="card-overlay">
          <a class="fullscreen" href=""></a>
          <a class="photo-link" href="<?php echo get_permalink();?>"></a>
          <div class="photo-info">
            <p class="text-tax"><?php echo get_post_meta(get_the_ID(),'reference', true); ?></p>
            <p class="text-tax"><?php echo get_the_terms($post->ID,'categorie')[0]->name; ?></p>
          </div>
        </div>
      </div>
    </div>
