
<?php get_header(); ?>
<div class="main single">
  <?php if (have_posts()) : ?>
    <?php while (have_posts()) : the_post(); ?>
      <div class="post">
        <div class="post-desc">
          <h2 class="post-title"><?php the_title(); ?></h2>
          <p class="post-info">Référence : <span id="reference"> <?php echo get_post_meta(get_the_ID(),'reference', true) ?></span></p>
          <p class="post-info">Catégorie : <?php the_terms($post->ID,'categorie'); ?></p>
          <p class="post-info">Format : <?php the_terms($post->ID,'format'); ?></p>
          <p class="post-info">Type : <?php echo get_post_meta(get_the_ID(),'type', true) ?></p>
          <p class="post-info">Année : <?php the_date('Y'); ?></p>
          <div class="post-border"></div>
          <div class="post-footer">
            <p>Cette Photo vous intéresse ?</p>
            <input class="post-contact" type="submit" value="Contact">
          </div>
        </div>
        <div class="post-content">
          <?php the_content(); ?>
          <div class="slider">
            <div class="slider-thumbnail">
              <a class="card-thumbnail" href=""></a>
            </div> 
            <div class="slider-nav">
              <a class="left-arrow arrow" href="">
                <img src="<?php echo get_template_directory_uri() . "./assets/images/left.png"?>">
              </a>
              <a class="right-arrow arrow" href="">
                <img src="<?php echo get_template_directory_uri() . "./assets/images/right.png"?>">
              </a>
            </div>
        </div>
        </div>
      </div>
      <div class="border"></div>
    <?php endwhile; ?>
  <?php endif; ?>
</div>
<?php get_footer(); ?>