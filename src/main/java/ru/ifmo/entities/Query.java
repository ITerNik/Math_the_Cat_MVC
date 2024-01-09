package ru.ifmo.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Query implements Serializable {
    private int id;
    private double x, y, r;
    private long speed;
    private boolean status;
    private LocalDateTime date;

    public Query(double x, double y, double r, boolean status, long speed) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.status = status;
        this.speed = speed;
        this.date = LocalDateTime.now();
    }
}
