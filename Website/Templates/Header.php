<link rel="stylesheet" type="text/css" href="/css/Header.css">
<script>
    function openNavigation() {
        var openNavElement = document.getElementById("open-nav");
        var closeNavElement = document.getElementById("close-nav");
        var navigationElement = document.getElementById("navigation");
        hide(openNavElement);
        show(closeNavElement);
        show(navigationElement);
    }

    function closeNavigation() {
        var openNavElement = document.getElementById("open-nav");
        var closeNavElement = document.getElementById("close-nav");
        var navigationElement = document.getElementById("navigation");
        show(openNavElement);
        hide(closeNavElement);
        hide(navigationElement);
    }
</script>
<div class="header">
    <div class="header-main">
        <div class="site-title">
            <h1>The Makeup App</h1>
        </div>
        <div id="open-nav" onclick="openNavigation()">
            <div class="hamburger-line light-line"></div>
            <div class="hamburger-line medium-line"></div>
            <div class="hamburger-line dark-line"></div>
        </div>
        <div id="close-nav" onclick="closeNavigation()">
            &times;
        </div>
    </div>
    <div id="navigation">
        <div class="navigation-item">
            <a href="/login" class="navigation-link">Login</a>
        </div>
        <div class="navigation-item">
        <a href="/signup" class="navigation-link">Sign Up</a>
        </div>
    </div>
</div>