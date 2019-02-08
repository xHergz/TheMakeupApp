<link rel="stylesheet" type="text/css" href="/css/ErrorList.css">
<div class="error-list">
    <?php
        if ($errorList != null && is_a($errorList, 'ErrorList')) {
            foreach($errorList->GetErrors() as $error): 
    ?>
        
                <div>
                    <?=$error?>
                </div>
    <?php
            endforeach; 
        }
    ?>
</div>