
<?php get_header(); ?>
<div class="main single">
  <?php if (have_posts()) : ?>
    <?php while (have_posts()) : the_post(); ?>
      <div class="post">
        <div class="post-desc">
          <h2 class="post-title"><?php the_title(); ?></h2>
          <p class="post-info">Référence : <?php echo get_post_meta(get_the_ID(),'reference', true) ?></p>
          <p class="post-info">Catégorie : <?php the_terms($post->ID,'categorie'); ?></p>
          <p class="post-info">Format : <?php the_terms($post->ID,'format'); ?></p>
          <p class="post-info">Type : <?php echo get_post_meta(get_the_ID(),'type', true) ?></p>
          <p class="post-info">Année : <?php the_date('Y'); ?></p>
          <div class="post-border"></div>
        </div>
        <div class="post-content">
          <?php the_content(); ?>
        </div>
      </div>
    <?php endwhile; ?>
  <?php endif; ?>
</div>
<?php get_footer(); ?>