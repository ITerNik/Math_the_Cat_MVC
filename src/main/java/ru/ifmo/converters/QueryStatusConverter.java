package ru.ifmo.converters;

import jakarta.faces.component.UIComponent;
import jakarta.faces.context.FacesContext;
import jakarta.faces.convert.Converter;
import jakarta.faces.convert.ConverterException;
import jakarta.faces.convert.FacesConverter;

@FacesConverter("QueryStatus")
public class QueryStatusConverter implements Converter<Boolean> {
    @Override
    public Boolean getAsObject(FacesContext facesContext, UIComponent uiComponent, String s) throws ConverterException {
        return s.equals("Попал");
    }

    @Override
    public String getAsString(FacesContext facesContext, UIComponent uiComponent, Boolean aBoolean) throws ConverterException {
        return aBoolean ? "Попал" : "Мимо";
    }
}
