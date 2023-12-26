<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%@ page import="ru.ifmo.entities.Query" %>
<%@ page import="java.util.List" %>

<% List<Query> history = (List<Query>)session.getAttribute("history"); %>
<% if (history == null || history.isEmpty()) { %>
  <td><em>Здесь пока пусто...</em></td>
<% } else {
  Query last = history.get(history.size() - 1); %>
  <tr>
    <th>X</th> <th>Y</th> <th>R</th> <th>Статус</th> <th>Время</th> <th>Скорость</th>
  </tr>
  <tr>
    <td><%= last.getX() %></td><td><%= last.getY() %></td>
    <td><%= last.getR() %></td><td><%= last.isStatus() ? "Попал" : "Мимо" %></td>
    <td><%= last.getTime() %></td><td><%= last.getSpeed() %> мс</td>
  </tr>
<% } %>
