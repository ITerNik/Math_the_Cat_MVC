package ru.ifmo.models;

import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import lombok.Data;
import org.omnifaces.util.Ajax;
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
    private double[] inputs;

    @PostConstruct
    private void fillBoxes() {
        labels = new double[] {-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2};
        checkBoxes = new boolean[labels.length];
        inputs = new double[labels.length];
    }

    public int getSize() {
        return labels.length;
    }

    public void save() {
        long start = System.currentTimeMillis();
        boolean flag = false;
        for (int i = 0; i < checkBoxes.length; ++i) {
            if (checkBoxes[i] && checkPoint(labels[i], inputs[i], r)) {
                flag = true;
                break;
            }
        }
        dataAccess.save(new Query(x, y, r, flag, System.currentTimeMillis() - start));
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

    public void clearBoxes() {
        checkBoxes = new boolean[labels.length];
        Ajax.update("math-form");
    }
}
