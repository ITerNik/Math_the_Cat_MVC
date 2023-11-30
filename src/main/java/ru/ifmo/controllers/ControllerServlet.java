package ru.ifmo.controllers;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter pw = resp.getWriter();
        if (req.getMethod().equals("GET") &&
                req.getParameter("x_coordinate") != null &&
                !req.getParameter("y_coordinate").isEmpty() &&
                !req.getParameter("r_coordinate").isEmpty()) {
            req.getRequestDispatcher("/area").forward(req, resp);
        } else {
            resp.sendRedirect("/graph.jsp");
        }
    }
}
