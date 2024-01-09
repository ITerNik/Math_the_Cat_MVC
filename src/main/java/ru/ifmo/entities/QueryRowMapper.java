package ru.ifmo.entities;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;

public class QueryRowMapper {
    public static Query convert(ResultSet rs) throws SQLException {
        return new Query(
                rs.getInt("id"),
                rs.getDouble("x"),
                rs.getDouble("y"),
                rs.getDouble("r"),
                rs.getLong("speed"),
                rs.getBoolean("status"),
                rs.getTimestamp("date").toLocalDateTime()
        );
    }
}
