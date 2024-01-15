package ru.ifmo.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Query implements Serializable {
    private int id;
    private double r;
    private List<Double> y = new ArrayList<>(),
            x = new ArrayList<>();
    private long speed;
    private boolean status;
    private LocalDateTime date;
}
