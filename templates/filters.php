<?php $categories = get_terms('categorie');?>
<?php $formats = get_terms('format'); ?>
<div class="taxonomies">
    <form class="cat-list">
        <select class="photo-filters" name="categorie">
            <?php foreach ($categories as $categorie) : ?>
                <option value="<?php echo $categorie->name; ?>">
                    <?php echo $categorie->name; ?>
                </option>
            <?php endforeach; ?> 
        </select> 
    </form>
    <form class="form-list">
        <select class="photo-filters" name="format">
            <?php foreach ($formats as $format) : ?>
                <option value="<?php echo $format->name; ?>">
                    <?php echo $format->name; ?>
                </option>
            <?php endforeach; ?>
        </select>
    </form>  
</div>
<div>
    <form class="filter">
        <select class="photo-filters" name="trie">
            <option>
                plus anciennes aux plus récentes
            </option>
            <option>
                plus récentes aux plus anciennes
            </option>
        </select>
    </form>
</div>    