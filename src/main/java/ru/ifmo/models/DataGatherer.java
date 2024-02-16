package ru.ifmo.models;

import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.SessionScoped;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import lombok.Data;
import org.primefaces.PrimeFaces;
import ru.ifmo.entities.Query;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    private boolean correctInput;

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
        correctInput = false;
        boolean flag = false;
        List<Double> x = new ArrayList<>();
        List<Double> y = new ArrayList<>();
        for (int i = 0; i < checkBoxes.length; ++i) {
            if (checkBoxes[i]) {
                if (checkPoint(labels[i], inputs[i], r)) flag = true;
                x.add(labels[i]);
                y.add(inputs[i]);
            }
        }
        if (x.isEmpty() || y.isEmpty()) {
            correctInput = true;
            return;
        }
        dataAccess.save(new Query(0, r, y, x, System.currentTimeMillis() - start, flag, LocalDateTime.now()));
        clearChoice();
        PrimeFaces.current().executeScript("showSuccess()");
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


    public void clearChoice() {
        checkBoxes = new boolean[labels.length];
        inputs = new double[labels.length];
        r = 0;
        PrimeFaces.current().executeScript("clearPoints()");
    }
}
