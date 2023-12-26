package ru.ifmo.models;

import java.util.ArrayList;

public class ImageStorage {
    private static final ImageStorage instance = new ImageStorage();

    private final ArrayList<String> images = new ArrayList<>();
    private ImageStorage() {}

    public static ImageStorage getInstance() {
        return instance;
    }

    public void addImage(String dataURL) {
        images.add(dataURL);
    }

    public String getImage(int index) {
        if (index >= 0 && index < images.size()) return images.get(index);
        return null;
    }
}
