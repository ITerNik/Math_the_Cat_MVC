<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<nav class="top-menu bg-dark">
    <a href="${pageContext.request.contextPath}/home">Math the Cat</a>
    <ul class="main-menu">
        <li><a id="home" href="${pageContext.request.contextPath}/home">Главная</a></li>
        <li><a id="history" href="${pageContext.request.contextPath}/history">История</a></li>
        <li><a id="contacts" href="${pageContext.request.contextPath}/contacts">Контакты</a></li>
    </ul>
    <script>
        const active = document.getElementById(window.location.pathname.split("/").pop())
        if (active) active.classList.add('active')
    </script>
</nav>
