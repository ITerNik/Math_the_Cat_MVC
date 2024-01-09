package ru.ifmo.models;

import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import lombok.Data;
import ru.ifmo.entities.Query;

import java.io.Serializable;

@Named
@SessionScoped
@Data
public class DataGatherer implements Serializable {
    private double x, y, r;

    @Inject
    private QueryDataAccess dataAccess;

    private double[] labels;
    private boolean[] checkBoxes;

    @PostConstruct
    private void fillBoxes() {
        labels = new double[] {-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2};
        checkBoxes = new boolean[labels.length];
    }

    public int getSize() {
        return labels.length;
    }

    public void save() {
        long start = System.currentTimeMillis();
        dataAccess.save(new Query(x, y, r, checkPoint(x, y, r), System.currentTimeMillis() - start));
    }

    private boolean checkPoint(double x, double y, double r) {
        if (x > 0) {
            if (y > 0 && y < r) {
                return x < r;
            } else {
                return false;
            }
        } else {
            if (y < 0) {
                return x * x + y * y < r * r;
            } else {
                return 2 * y < 2 * x + r;
            }
        }
    }
}
