<%@ page import="ru.ifmo.entities.Query" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Math the Cat</title>
    <link rel="stylesheet/less" type="text/css" href="${pageContext.request.contextPath}/static/styles.less" />
    <meta http-equiv='content-type' content='text/html;charset=utf-8' />
    <script src="${pageContext.request.contextPath}/static/ts/less.js" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/static/ts/list-toggling.js" defer></script>
</head>
<body>
    <header>
        <div class="container">
            <%@ include file="../components/top-menu.jsp" %>
            <div class="page-cover bg-blue">
                <div class="side-page-title page-title">
                    <h1>История запросов</h1>
                </div>
                <img src="${pageContext.request.contextPath}/static/assets/laptop_cat_full_width_low_res.jpg" alt="page-cover">
                <div class="image-shading" />
            </div>
        </div>
    </header>
    <div class="main history-page-layout">
        <div class="container">
            <div class="new-result">
                <h3 class="result-title">Новый запрос:</h3>
                <table class="result-table">
                    <jsp:include page="${pageContext.request.contextPath}/components/area-result.jsp" />
                </table>
            </div>
            <a href="/math" class="back-home-image">
                <img src="${pageContext.request.contextPath}/static/assets/table_cat_transparent.png"/>
            </a>
            <h2 class="list-title">Прошлое, которого не вернуть:</h2>
            <ul class="result-list">
                <% List<Query> history = (List<Query>) session.getAttribute("history"); %>
                <% if (history == null || history.isEmpty()) { %>
                <li><h4>Oстались только пустота и тлен...</h4></li>
                <% } else {
                    for (int i = 0; i < history.size(); ++i) {
                        Query query = history.get(i); %>
                <li>
                    <div class="toggle-header">
                        <h3>Попытка №<% out.print(i + 1); %></h3>
                    </div>
                    <div class="hidden toggle-body">
                        <p>Координата X: <% out.print(query.getX()); %></p>
                        <p>Координата Y: <% out.print(query.getY()); %></p>
                        <p>Координата R: <% out.print(query.getR()); %></p>
                        <p>Статус: <% out.print(query.isStatus() ? "Попал": "Мимо"); %></p>
                        <p>Время отправки: <% out.print(query.getTime()); %></p>
                        <p>Время работы: <% out.print(query.getSpeed()); %> мс</p>
                    </div>
                </li>
                <% }
                } %>
            </ul>
        </div>
    </div>
    <footer class="bg-dark">
        <div class="container">
            <div class="license">
                <h2>Math the Cat</h2>
                © 2023 Терехин Никита | Все права защищены
            </div>
        </div>
    </footer>
</body>
</html>