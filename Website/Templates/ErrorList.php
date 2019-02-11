<link rel="stylesheet" type="text/css" href="/css/ErrorList.css">
<script>
    function dismissError(error) {
        hide(error);
    }
</script>
<div class="error-list">
    <?php
        if ($errorList != null && is_a($errorList, 'ErrorList')) {
            foreach($errorList->GetErrors() as $error): 
    ?>
        
                <div class="error">
                    <div>
                        <?=$error?>
                    </div>
                    <div class="dismiss-error" onclick="dismissError(this.parentElement)">
                        &times;
                    </div>
                </div>
    <?php
            endforeach; 
        }
    ?>
</div>