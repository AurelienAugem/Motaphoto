<?php $categories = get_terms('categorie');?>
<?php $formats = get_terms('format'); ?>
<div class="taxonomies">
    <div class="btn-filters">
        <div id="filtre-categorie" name="categorie">
            <p id="btn-categorie" class="titre-filtre">Catégorie</p>
            <ul id="menu-categorie" class="show-filter filter-hide">
                <?php foreach ($categories as $categorie) : ?>
                    <li value="<?php echo $categorie->name; ?>">
                        <a><?php echo $categorie->name; ?></a>
                    </li>
                <?php endforeach; ?>
            </ul> 
        </div>
    </div>
    <div class="btn-filters">
        <div id="filtre-format" name="format">
            <p id="btn-format" class="titre-filtre">Format</p>
            <ul id="menu-format" class="show-filter filter-hide">
                <?php foreach ($formats as $format) : ?>
                    <li value="<?php echo $format->name; ?>">
                        <a><?php echo $format->name; ?></a>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    </div>  
</div>
<div>
    <div class="btn-filters">
        <div id="filtre-date" name="tri">
            <p id="btn-tri" class="titre-filtre">Trier par...</p>
            <ul id="menu-tri" class="show-filter filter-hide">
                <li><a>plus anciennes aux plus récentes</a></li>
                <li><a>plus récentes aux plus anciennes</a></li>
            </ul>
        </div>
    </div>
</div>    