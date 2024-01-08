package ru.ifmo.models;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;
import ru.ifmo.entities.Query;
import ru.ifmo.entities.QueryRowMapper;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

@Named
@ApplicationScoped
public class QueryDataAccess {
    private Connection connection;

    @PostConstruct
    private void connect() {
        Properties prop = new Properties();
        try {
            FileInputStream fin = new FileInputStream("database.properties");
            prop.load(fin);

            connection = DriverManager.getConnection(prop.getProperty("url"),
                    prop.getProperty("user"), prop.getProperty("password"));

            fin.close();
        } catch (IOException | SQLException e) {
            e.printStackTrace();
        }
    }

    @PreDestroy
    private void disconnect() {
        try {
            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
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
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<Query> index() {
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
            e.printStackTrace();
        }
        return queries;
    }

}
