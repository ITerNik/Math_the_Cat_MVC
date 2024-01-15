package ru.ifmo.models;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Named;
import lombok.NoArgsConstructor;
import ru.ifmo.entities.CoordinateRowMapper;
import ru.ifmo.entities.Query;
import ru.ifmo.entities.QueryRowMapper;

import java.io.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

@Named
@ApplicationScoped
@NoArgsConstructor
public class QueryDataAccess implements Serializable {
    private Connection connection;

    @PostConstruct
    private void connect() {
        Properties prop = new Properties();
        try (InputStream fin = FacesContext.getCurrentInstance().getExternalContext().getResourceAsStream("/WEB-INF/database.properties")) {
            prop.load(fin);

            Class.forName("org.postgresql.Driver");

            connection = DriverManager.getConnection(
                    prop.getProperty("url"),
                    prop.getProperty("user"),
                    prop.getProperty("password")
            );
        } catch (SQLException | IOException | ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @PreDestroy
    private void disconnect() {
        try {
            connection.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void save(Query query) {
        try {
            PreparedStatement first = connection.prepareStatement(
                    "INSERT INTO query (r, status, speed, date, image) VALUES (?, ?, ?, ?, ?)",
                    Statement.RETURN_GENERATED_KEYS
            );

            first.setDouble(1, query.getR());
            first.setBoolean(2, query.isStatus());
            first.setLong(3, query.getSpeed());
            first.setTimestamp(4, Timestamp.valueOf(query.getDate()));
            first.setString(5, "");

            first.executeUpdate();
            ResultSet result = first.getGeneratedKeys();

            List<Double> x = query.getX();
            List<Double> y = query.getY();
            result.next();
            int id = result.getInt("id");
            result.close();
            first.close();

            PreparedStatement second = connection.prepareStatement("INSERT INTO coordinate (x, y, query_id) VALUES (?, ?, ?)");
            second.setDouble(3, id);

            for (int i = 0; i < x.size(); ++i) {
                second.setDouble(1, x.get(i));
                second.setDouble(2, y.get(i));
                second.addBatch();
            }

            second.executeBatch();

            second.close();

            // FacesContext.getCurrentInstance().getExternalContext().redirect("history.xhtml");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Query> getAll() {
        List<Query> queries = new ArrayList<>();
        try {
            Statement statement = connection.createStatement();

            ResultSet result = statement.executeQuery("SELECT * FROM query");

            PreparedStatement coordinates = connection.prepareStatement("SELECT * FROM coordinate WHERE query_id = ?");
            while (result.next()) {
                Query query = QueryRowMapper.convert(result);
                coordinates.setInt(1,query.getId());
                ResultSet rs = coordinates.executeQuery();

                CoordinateRowMapper.convertCoordinates(rs, query);
                queries.add(query);

                rs.close();
            }

            coordinates.close();
            result.close();
            statement.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return queries;
    }

    public Query getLast() {
        Query last = null;
        try {
            Statement statement = connection.createStatement();
            ResultSet result = statement.executeQuery("SELECT * FROM query ORDER BY date DESC LIMIT 1");

            result.next();
            last = QueryRowMapper.convert(result);

            PreparedStatement coordinates = connection.prepareStatement("SELECT  * FROM coordinate WHERE query_id = ?");
            coordinates.setInt(1, last.getId());
            ResultSet rs = coordinates.executeQuery();

            CoordinateRowMapper.convertCoordinates(rs, last);

            result.close();
            statement.close();
        } catch (SQLException | NullPointerException e) {
            return new Query();
        }
        return last;
    }

}
