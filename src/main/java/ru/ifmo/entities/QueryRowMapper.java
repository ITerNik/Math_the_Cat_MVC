package ru.ifmo.entities;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;

public class QueryRowMapper {
    public static Query convert(ResultSet rs) throws SQLException {
        Query query = new Query();

        query.setId(rs.getInt("id"));
        query.setR(rs.getDouble("r"));
        query.setStatus(rs.getBoolean("status"));
        query.setSpeed(rs.getLong("speed"));
        query.setDate(rs.getTimestamp("date").toLocalDateTime());

        return query;
    }
}
