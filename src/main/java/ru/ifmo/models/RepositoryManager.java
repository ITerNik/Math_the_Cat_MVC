package ru.ifmo.models;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;
import ru.ifmo.entities.Query;

import java.io.Serializable;
import java.util.ArrayList;

@Named
@ApplicationScoped
public class RepositoryManager implements Serializable {
    private final ArrayList<Query> queries = new ArrayList<>();
    {
        queries.add(new Query());
    }

    public void addQuery(Query query) {
        queries.add(query);
    }

    public ArrayList<Query> getQueries() {
        return queries;
    }

    public Query getLast() {
        if (queries.isEmpty()) return new Query();
        return queries.get(queries.size() - 1);
    }
}
