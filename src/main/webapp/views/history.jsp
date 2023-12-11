<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="ru.ifmo.entities.Query" %>
<%@ page import="java.util.List" %>
<!DOCTYPE html>
<html>
<head>
    <title>Math the Cat</title>
    <link rel="stylesheet" href="style.css">
    <script src="session.js" defer></script>
</head>
<body>
    <table class="frame_table">
        <thead class="background_image side_page">
            <tr>
                <ul class="nav_panel background_black">
                    <li>
                        <a href="../pages/index.jsp">Math the Cat</a>
                    </li>
                    <li>
                        <a href="history.jsp" class="active">История</a>
                    </li>
                    <li>
                        <a href="../pages/contacts.jsp">Контакты</a>
                    </li>
                    <li>
                        <a href="../pages/index.jsp">Главная</a>
                    </li>
                </ul>
            </tr>
            <tr>
                <td class="header">
                    <h1>История</h1>
                </td>
            </tr>
        </thead>
        <tbody class="main_content">
            <tr>
                <td>
                    <ul class="list-group" id="history-list">
                        <% List<Query> history = (List<Query>) session.getAttribute("history"); %>
                        <% if (history == null || history.isEmpty()) { %>
                            <p class="empty-list">Oстались только пустота и тлен...</p>
                        <% } else {
                            for (int i = 0; i < history.size(); ++i) {
                                Query query = history.get(i); %>
                            <li>
                                <div class="toggle-header">
                                    <span><span class="toggle-show">+</span>Попытка №<% out.print(i); %></span>
                                    <span class="btn-delete" data-index="<% out.print(i); %>">&times;</span>
                                </div>
                            </li>
                            <div class="hidden toggle-text">
                                <p>Координата X: <% out.print(query.getX()); %></p>
                                <p>Координата Y: <% out.print(query.getY()); %></p>
                                <p>Координата R: <% out.print(query.getR()); %></p>
                                <p>Статус: <% out.print(query.isStatus() ? "Попал": "Мимо"); %>}</p>
                                <p>Время отправки: <% out.print(query.getTime()); %></p>
                                <p>Время работы: <% out.print(query.getSpeed()); %> мс</p>
                            </div>
                            <% }
                            } %>
                   </ul>
               </td>
           </tr>
       </tbody>
       <tfoot class="footer">
        <tr>
            <td>© 2023 Терехин Никита | Все права защищены</td>
        </tr>
    </tfoot>
</table>
</body>
</html>