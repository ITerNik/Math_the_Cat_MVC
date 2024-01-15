package ru.ifmo.entities;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CoordinateRowMapper {
    public static void convertCoordinates(ResultSet rs, Query query) throws SQLException {
        List<Double> y = new ArrayList<>(), x = new ArrayList<>();

        while (rs.next()) {
            y.add(rs.getDouble("y"));
            x.add(rs.getDouble("x"));
        }

        query.setX(x);
        query.setY(y);
    }
}
