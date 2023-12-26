<%@ page import="ru.ifmo.entities.Query" %>
<%@ page import="ru.ifmo.models.ImageStorage" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Math the Cat</title>
    <link rel="stylesheet/less" type="text/css" href="${pageContext.request.contextPath}/styles.less" />
    <link id="contextPathHolder" data-contextPath="${pageContext.request.contextPath}"/>
    <meta http-equiv='content-type' content='text/html;charset=utf-8' />
    <script src="${pageContext.request.contextPath}/ts/less.js" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/ts/list-toggling.js" defer></script>
</head>
<body>
    <header>
        <div class="container">
            <%@ include file="../components/top-menu.jsp" %>
            <div class="page-cover bg-blue">
                <div class="side-page-title page-title">
                    <h1>История запросов</h1>
                </div>
                <img src="${pageContext.request.contextPath}/assets/laptop_cat_full_width_low_res.jpg" alt="page-cover">
                <div class="image-shading"></div>
            </div>
        </div>
    </header>
    <div class="main history-page-layout">
        <div class="container">
            <div class="new-result">
                <h3 class="result-title">Новый запрос:</h3>
                <table class="result-table">
                    <%@ include file="../components/area-result.jsp" %>
                </table>
            </div>
            <a href="${pageContext.request.contextPath}/math" class="back-home-image">
                <img src="${pageContext.request.contextPath}/assets/Dreaming_cat_want_home.png"/>
            </a>
            <h2 class="list-title">Прошлое, которого не вернуть:</h2>
            <ul class="result-list">
                <% if (history == null || history.isEmpty()) { %>
                <li><h4>Oстались только пустота и тлен...</h4></li>
                <% } else {
                    ImageStorage storage = ImageStorage.getInstance();
                    for (int i = 0; i < history.size(); ++i) {
                        Query query = history.get(i); %>
                <li>
                    <div class="toggle-header">
                        <h3>Попытка №<%= i + 1 %></h3>
                    </div>
                    <div class="hidden toggle-body">
                        <div>
                            <p>Координата X: <%= query.getX() %></p>
                            <p>Координата Y: <%= query.getY() %></p>
                            <p>Координата R: <%= query.getR() %></p>
                            <p>Статус: <%= query.isStatus() ? "Попал": "Мимо" %></p>
                            <p>Время отправки: <%= query.getTime() %></p>
                            <p>Время работы: <%= query.getSpeed()%> мс</p>
                        </div>
                        <img src="<%=storage.getImage(i)%>" alt="area-image"/>
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