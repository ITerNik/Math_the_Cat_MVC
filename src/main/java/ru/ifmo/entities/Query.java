package ru.ifmo.entities;

import jakarta.enterprise.context.RequestScoped;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.ifmo.models.QueryDataAccess;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@NoArgsConstructor
@Named
@SessionScoped
public class Query implements Serializable {
    private double x, y, r;
    private long speed;
    private boolean status;
    @Inject
    private QueryDataAccess dataAccess;
    private LocalDateTime date;
    private double[] labels = {
            -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2
    };
    private boolean[] checkBoxes = new boolean[labels.length];

    private static final DateTimeFormatter format = DateTimeFormatter.ofPattern("HH:mm:ss");
    public Query(double x, double y, double r, boolean status, long speed) {
        new Query(x, y, r, status, speed, LocalDateTime.now());
    }
    public Query(double x, double y, double r, boolean status, long speed, LocalDateTime date) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.status = status;
        this.speed = speed;
        this.date = date;
    }
    public String getTime() {
        return date.format(format);
    }

    public int getSize() {
        return labels.length;
    }

    public void save() {
        dataAccess.save(this);
    }
}
