package ru.ifmo.entities;

import jakarta.enterprise.context.RequestScoped;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Named
@SessionScoped
public class Query implements Serializable {
    private double x, y, r;
    private long speed;
    private boolean status;
    private LocalDateTime date;

    private static final DateTimeFormatter format = DateTimeFormatter.ofPattern("HH:mm:ss");
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
