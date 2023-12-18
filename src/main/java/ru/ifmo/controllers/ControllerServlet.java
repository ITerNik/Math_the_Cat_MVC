package ru.ifmo.controllers;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (req.getMethod().equals("GET") &&
                req.getParameter("r") != null &&
                !req.getParameter("y").isEmpty() &&
                !req.getParameter("x").isEmpty()) {
            req.getRequestDispatcher("/area").forward(req, resp);
        }
    }
}
