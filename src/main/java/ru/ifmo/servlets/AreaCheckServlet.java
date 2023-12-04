package ru.ifmo.servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import ru.ifmo.entities.Query;

import java.io.IOException;
import java.util.ArrayList;

public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        long start = System.currentTimeMillis();
        double x = Double.parseDouble(req.getParameter("x_coordinate"));
        double y = Double.parseDouble(req.getParameter("y_coordinate"));
        int r = Integer.parseInt(req.getParameter("r_coordinate"));

        HttpSession session = req.getSession();
        ArrayList<Query> history = (ArrayList<Query>) req.getSession().getAttribute("history");
        if (history == null) {
            session.setAttribute("history", new ArrayList<Query>());
            history = (ArrayList<Query>) req.getSession().getAttribute("history");
        }
        boolean flag = checkPoint(x, y, r);
        Query query = new Query(x, y, r, flag, System.currentTimeMillis() - start);
        history.add(query);
            /*writer.println("<tr>" +
                                "<th>X</th> <th>Y</th> <th>R</th> <th>Статус</th> <th>Время</th> <th>Скорость</th>" +
                            "</tr>");
            writer.println("<tr>" +
                    String.format("<td id=\"x_val\">%s</td> <td id=\"y_val\">%s</td> <td id=\"r_val\">%s</td>" +
                                "<td><span id=\"status_val\" class=\"%s\">%s</span></td><td id=\"time_val\">%s:%s</td>" +
                                "<td><span id=\"speed_val\">%s</span>мс</td>", x, y, r, (flag ? "success" : "fail"),
                                (flag ? "Попал" : "Мимо"), current.getHour(), current.getMinute(), System.currentTimeMillis() - start) +
                            "</tr>");*/
//        resp.sendRedirect("/graph.jsp");
        req.getRequestDispatcher("/area-result.jsp").forward(req, resp);
    }

    private boolean checkPoint(double x, double y, double r) {
        if (x > 0) {
            if (y < 0 && y > r) {
                return y >= x - r;
            } else {
                return false;
            }
        } else {
            if (y > 0 && y < r) {
                return x * x + y * y <= r * r;
            } else if (y < 0 && y > r) {
                return 2 * x >= -r;
            } else {
                return false;
            }
        }
    }
}
