<link rel="stylesheet" type="text/css" href="/css/ErrorList.css">
<div class="error-list">
    <?php foreach($errorList as $error): ?>
    <div>
        <?=$error?>
    </div>
    <?php endforeach; ?>
</div>