package ru.ifmo.servlets;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import ru.ifmo.models.ImageStorage;

import java.io.IOException;
public class ImageHandlerServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ImageStorage storage = ImageStorage.getInstance();
        storage.addImage(request.getParameter("image"));
    }
}
