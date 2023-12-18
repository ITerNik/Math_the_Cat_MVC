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
        double x = Double.parseDouble(req.getParameter("x"));
        double y = Double.parseDouble(req.getParameter("y"));
        int r = Integer.parseInt(req.getParameter("r"));

        HttpSession session = req.getSession();
        ArrayList<Query> history = (ArrayList<Query>) session.getAttribute("history");
        if (history == null) {
            session.setAttribute("history", new ArrayList<Query>());
            history = (ArrayList<Query>) session.getAttribute("history");
        }
        boolean flag = checkPoint(x, y, r);
        Query query = new Query(x, y, r, flag, System.currentTimeMillis() - start);
        history.add(query);
        resp.sendRedirect("/history");
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
