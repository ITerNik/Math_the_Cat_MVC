package ru.ifmo.entities;

import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class Query {
    private double x, y;
    private int r;
    private long speed;
    private boolean status;
    private LocalDateTime date;

    private static final DateTimeFormatter format = DateTimeFormatter.ofPattern("HH:mm:ss");

    public Query() {}
    public Query(double x, double y, int r, boolean status, long speed) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.status = status;
        this.speed = speed;
        this.date = LocalDateTime.now();
    }
    public String getTime() {
        return date.format(format);
    }
}
