package ru.ifmo.models;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Named;
import lombok.NoArgsConstructor;
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
            if (fin == null) throw new RuntimeException("stream is null");
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
            PreparedStatement statement = connection.prepareStatement(
                    "INSERT INTO query (x, y, r, status, speed, date, image) VALUES (?, ?, ?, ?, ?, ?)"
            );

            statement.setDouble(1, query.getX());
            statement.setDouble(2, query.getY());
            statement.setDouble(3, query.getR());
            statement.setBoolean(4, query.isStatus());
            statement.setLong(5, query.getSpeed());
            statement.setString(6, "");

            statement.executeUpdate();
            statement.close();

            FacesContext.getCurrentInstance().getExternalContext().redirect("history.xhtml");
        } catch (SQLException | IOException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Query> getAll() {
        List<Query> queries = new ArrayList<>();
        try {
            Statement statement = connection.createStatement();

            ResultSet result = statement.executeQuery("SELECT * FROM query");
            while (result.next()) {
                queries.add(QueryRowMapper.convert(result));
            }

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

            statement.close();
        } catch (SQLException e) {
            return new Query();
        }
        return last;
    }

}
