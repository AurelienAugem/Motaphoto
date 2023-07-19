    </main>
    <footer>
        <div class="display-footer">
            <div class="border"></div>
            <?php wp_nav_menu(array('theme_location' => 'footer'));?>
        </div>
        <?php get_template_part('templates/contact');?>
    </footer>
    <?php wp_footer() ?>
</body>
</html>