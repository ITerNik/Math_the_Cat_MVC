<%@ page import="ru.ifmo.entities.Query" %>
<%@ page import="java.util.List" %>

<% List<Query> history = (List<Query>)session.getAttribute("history"); %>
<% if (history == null || history.isEmpty()) { %>
  <td>Nothing yet</td>
<% } else {
  Query last = history.get(history.size() - 1); %>
  <tr>
    <th>X</th> <th>Y</th> <th>R</th> <th>Status</th> <th>Time</th> <th>Speed</th>
  </tr>
  <tr>
    <td><% out.print(last.getX()); %></td><td><% out.print(last.getY()); %></td>
    <td><% out.print(last.getR()); %></td><td><% out.print(last.isStatus()); %></td>
    <td><% out.print(last.getTime()); %></td><td><% out.print(last.getSpeed()); %></td>
  </tr>
<% } %>
